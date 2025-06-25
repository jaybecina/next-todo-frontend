import { create } from 'zustand'

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
}

const useAuthStore = create<AuthState>(
  (set: (state: Partial<AuthState>) => void) => ({
    token: null,
    setToken: (token: string) => set({ token }),
    clearToken: () => set({ token: null }),
  })
)

export default useAuthStore
