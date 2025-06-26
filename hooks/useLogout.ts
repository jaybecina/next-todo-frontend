import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { logout } from '@/services/authService'
import Cookies from 'js-cookie'

const useLogout = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()

      // Remove the authToken cookie
      Cookies.remove('authToken')

      router.push('/auth')
    } catch (error) {
      console.error('Logout failed:', error)
      toast.error('An error occurred during logout.')
    }
  }

  return handleLogout
}

export default useLogout
