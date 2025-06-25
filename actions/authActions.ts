'use server'

import { login, register } from '@/services/authService'
import { toast } from 'sonner'
import axios from 'axios'

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await login(email, password)
    console.log('Login successful:', response)
    return { success: true, message: 'Login successful' }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || 'An error occurred during login'
      toast.error(message)
      return { success: false, message }
    } else {
      console.error('Unexpected error:', error)
      const message = 'An unexpected error occurred'
      toast.error(message)
      return { success: false, message }
    }
  }
}

export const handleRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await register(name, email, password)
    console.log('Registration successful:', response)
    return { success: true, message: 'Registration successful' }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || 'An error occurred during registration'
      toast.error(message)
      return { success: false, message }
    } else {
      console.error('Unexpected error:', error)
      const message = 'An unexpected error occurred'
      toast.error(message)
      return { success: false, message }
    }
  }
}
