import axios from 'axios'
import useAuthStore from '@/store/authStore'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    })
    const { token, user } = response.data

    useAuthStore.getState().setToken(token)
    useAuthStore.getState().setUser(user)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data
    }

    console.error('Login failed:', error)
    return { message: 'An unexpected error occurred', details: '' }
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
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data
    }

    console.error('Registration failed:', error)
    return { message: 'An unexpected error occurred', details: '' }
  }
}

export const logout = async () => {
  try {
    const token = useAuthStore.getState().token
    if (!token) {
      throw new Error('No authentication token found')
    }

    await axios.post(
      `${API_URL}/api/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    useAuthStore.getState().clearToken()
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data
    }

    console.error('Logout failed:', error)
    return { message: 'An unexpected error occurred', details: '' }
  }
}
