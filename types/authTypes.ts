export interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  token: string
  user: User
  message?: string
}

export interface LoginErrorResponse {
  message: string
  details: string
}
