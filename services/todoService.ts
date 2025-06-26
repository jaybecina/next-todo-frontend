import axios from 'axios'
import { Todo, TodosResponse } from '@/types/todoTypes'
import useAuthStore from '@/store/authStore'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token
  return {
    Authorization: `Bearer ${token}`,
  }
}

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

export const getTodoById = async (id: string): Promise<Todo> => {
  try {
    const response = await axios.get(`${API_URL}/api/todos/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error)
    throw error
  }
}
