'use client'

import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'
import { useEffect, useState } from 'react'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { token } = useAuthStore()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    if (!token) {
      router.push('/auth')
    } else {
      setIsCheckingAuth(false)
    }
  }, [token, router])

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    )
  }

  return <>{children}</>
}

export default AuthGuard
