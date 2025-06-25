import axios from 'axios'
import useAuthStore from '@/store/authStore'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    })
    const { token } = response.data
    useAuthStore.getState().setToken(token)
    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      name,
      email,
      password,
    })
    return response.data
  } catch (error) {
    console.error('Registration failed:', error)
    throw error
  }
}

export const logout = () => {
  useAuthStore.getState().clearToken()
}
