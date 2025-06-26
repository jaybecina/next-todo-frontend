import { create } from 'zustand'

interface AuthState {
  token: string | null
  user: { id: string; email: string; name: string } | null // Added `name` property to user
  setToken: (token: string) => void
  setUser: (user: { id: string; email: string; name: string }) => void // Updated `setUser` to include `name`
  clearToken: () => void
}

const useAuthStore = create<AuthState>(
  (set: (state: Partial<AuthState>) => void) => ({
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null, // Retrieve token from localStorage only on client side
    user:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('user') || 'null')
        : null, // Retrieve user from localStorage only on client side
    setToken: (token: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token) // Persist token to localStorage
      }
      set({ token })
    },
    setUser: (user: { id: string; email: string; name: string }) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user)) // Persist user to localStorage
      }
      set({ user })
    },
    clearToken: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token') // Remove token from localStorage
        localStorage.removeItem('user') // Remove user from localStorage
      }
      set({ token: null, user: null })
    },
  })
)

export default useAuthStore
