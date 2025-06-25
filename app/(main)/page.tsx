import DashboardContent from '@/components/dashboard/DashboardContent'
import { todos } from '@/data/todos'
import AuthGuard from '@/components/auth/AuthGuard'

export default function Home() {
  // Calculate todo statistics
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
      <DashboardContent
        totalTodos={totalTodos}
        completedTodos={completedTodos}
        pendingTodos={pendingTodos}
        recentTodos={recentTodos}
      />
    </AuthGuard>
  )
}
