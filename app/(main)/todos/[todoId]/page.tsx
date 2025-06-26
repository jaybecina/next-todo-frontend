import TodoDetailsClient from '@/components/todos/TodoDetailsClient'
import { getTodoById } from '@/services/todoService'
import { cookies } from 'next/headers'
import { TodoResponse } from '@/types/todoTypes'

export default async function ShowTodo({
  params,
}: {
  params: { todoId: string }
}) {
  const cookieStore = cookies()
  const token = (await cookieStore).get('authToken')?.value || ''
  const todoData: TodoResponse = await getTodoById(params.todoId, token)

  return <TodoDetailsClient todo={todoData.todo} />
}
