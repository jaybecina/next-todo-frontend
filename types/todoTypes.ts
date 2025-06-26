export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

export interface TodosResponse {
  todos: Todo[]
}

export interface TodoUpdate {
  title?: string
  description?: string
  completed?: boolean
}

export interface TodoCreate {
  title: string
  description: string
  completed?: boolean
}

export interface TodoResponse {
  todo: Todo
}
