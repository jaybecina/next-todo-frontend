'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import AuthGuard from '@/components/auth/AuthGuard'
import useAuthStore from '@/store/authStore'
import useLogout from '@/hooks/useLogout'
import { jwtDecode } from 'jwt-decode'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore()
  const handleLogout = useLogout()

  useEffect(() => {
    const checkTokenValidity = () => {
      if (token) {
        try {
          const decodedToken: { exp: number } = jwtDecode(token)
          console.log('Decoded Token:', decodedToken)
          const currentTime = Math.floor(Date.now() / 1000)

          if (decodedToken.exp < currentTime) {
            handleLogout()
          }
        } catch (error) {
          console.error('Token decoding failed:', error)
          handleLogout()
        }
      }
    }

    checkTokenValidity()
  }, [token, handleLogout])

  return (
    <AuthGuard>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={true}
        storageKey="dashboard-theme"
      >
        <Navbar />
        <div className="flex">
          <div className="hidden md:block h-[100vh] w-[300px]">
            <Sidebar />
          </div>
          <div className="p-5 w-full md:max-w-[1140px]">{children}</div>
        </div>
        <Toaster />
      </ThemeProvider>
    </AuthGuard>
  )
}

export default MainLayout
