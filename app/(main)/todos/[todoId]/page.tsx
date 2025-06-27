import { cookies } from 'next/headers'

import { getTodoById } from '@/services/todoService'
import TodoDetailsClient from '@/components/todos/TodoDetailsClient'
import { TodoResponse } from '@/types/todoTypes'

export default async function ShowTodo({
  params,
}: {
  params: Promise<{ todoId: string }>
}) {
  const resolvedParams = await params
  const cookieStore = cookies()
  const token = (await cookieStore).get('authToken')?.value || ''
  const todoData: TodoResponse = await getTodoById(resolvedParams.todoId, token)

  return <TodoDetailsClient todo={todoData.todo} />
}
