import { toast } from 'sonner'
import { useState } from 'react'

const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null)

  const handleError = (message: string, details?: string) => {
    const errorMessage = details ? `${message}: ${details}` : message
    toast.error(errorMessage)
    setError(errorMessage)
  }

  const handleUnexpectedError = (err: unknown) => {
    console.error('Unexpected error:', err)
    toast.error('An unexpected error occurred. Please try again.')
    setError('An unexpected error occurred. Please try again.')
  }

  return { error, handleError, handleUnexpectedError }
}

export default useErrorHandler
