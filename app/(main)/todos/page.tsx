import TodosClient from '@/components/todos/TodosClient'
import { getAllTodos } from '@/services/todoService'
import { Todo } from '@/types/todoTypes'
import { cookies } from 'next/headers'

export default async function TodosPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('authToken')?.value || ''

  const todosResponse = await getAllTodos(token)

  const processedTodos = todosResponse?.todos?.map((todo: Todo) => ({
    ...todo,
    status: todo.completed ? 'Completed' : 'Pending',
    formattedCreatedAt: new Date(todo.createdAt).toLocaleDateString(),
  }))

  return <TodosClient data={processedTodos} />
}
