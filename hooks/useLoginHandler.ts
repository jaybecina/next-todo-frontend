import { toast } from 'sonner'
import useAuthStore from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { LoginResponse } from '@/types/authTypes'

const useLoginHandler = () => {
  const router = useRouter()

  const handleSuccessfulLogin = (result: LoginResponse) => {
    useAuthStore.setState({
      token: result.token,
      user: result.user,
    })

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
    }

    console.log('Auth State after login:', useAuthStore.getState())
    toast.success(result.message || 'Login successful')
    toast.info('Redirecting to the homepage...')
    router.push('/')
  }

  return { handleSuccessfulLogin }
}

export default useLoginHandler
