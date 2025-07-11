import { cookies } from 'next/headers'

import DashboardClient from '@/components/dashboard/DashboardClient'
import AuthGuard from '@/components/auth/AuthGuard'
import { getAllTodos } from '@/services/todoService'

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('authToken')?.value || ''

  console.log('Retrieved token:', token)

  if (!token) {
    console.error('No authentication token found')
    return (
      <AuthGuard>
        <DashboardClient
          totalTodos={0}
          completedTodos={0}
          pendingTodos={0}
          recentTodos={0}
        />
      </AuthGuard>
    )
  }

  try {
    const { todos } = await getAllTodos(token)
    console.log('API response todos:', todos)

    const totalTodos = todos.length
    const completedTodos = todos.filter((todo) => todo.completed).length
    const pendingTodos = todos.filter((todo) => !todo.completed).length
    const recentTodos = todos.filter((todo) => {
      const todoDate = new Date(todo.createdAt)
      const today = new Date()
      return todoDate.getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000 // Last 7 days
    }).length

    return (
      <AuthGuard>
        <DashboardClient
          totalTodos={totalTodos}
          completedTodos={completedTodos}
          pendingTodos={pendingTodos}
          recentTodos={recentTodos}
        />
      </AuthGuard>
    )
  } catch (error) {
    console.error('Error fetching todos:', error)
    return (
      <AuthGuard>
        <DashboardClient
          totalTodos={0}
          completedTodos={0}
          pendingTodos={0}
          recentTodos={0}
        />
      </AuthGuard>
    )
  }
}
