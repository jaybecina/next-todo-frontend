import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { logout } from '@/services/authService'

const useLogout = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/auth')
    } catch (error) {
      console.error('Logout failed:', error)
      toast.error('An error occurred during logout.')
    }
  }

  return handleLogout
}

export default useLogout
