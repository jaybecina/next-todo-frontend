import axios from 'axios'
import { Todo, TodosResponse, TodoResponse } from '@/types/todoTypes'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getAllTodos = async (token: string): Promise<TodosResponse> => {
  try {
    const response = await axios.get(`${API_URL}/api/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}

export const getTodoById = async (
  id: string,
  token: string
): Promise<TodoResponse> => {
  try {
    const response = await axios.get(`${API_URL}/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error)
    throw error
  }
}

export const createTodo = async (
  title: string,
  description: string,
  token: string
): Promise<Todo> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/todos`,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error creating todo:', error)
    throw error
  }
}

export const updateTodo = async (
  todoId: string,
  title: string,
  description: string,
  completed: boolean,
  token: string
): Promise<Todo> => {
  try {
    const response = await axios.put(
      `${API_URL}/api/todos/${todoId}`,
      {
        title,
        description,
        completed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(`Error updating todo with id ${todoId}:`, error)
    throw error
  }
}

export const deleteTodo = async (
  todoId: string,
  token: string
): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/api/todos/${todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(`Error deleting todo with id ${todoId}:`, error)
    throw error
  }
}
