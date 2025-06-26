'use client'

import { deleteTodo } from '@/services/todoService'
import useAuthStore from '@/store/authStore'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import CustomAlert from '@/components/ui/CustomAlert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DeleteTodoModal({
  id,
  onClose,
}: {
  id: string
  onClose: () => void
}) {
  const { token } = useAuthStore()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      setIsSubmitting(true)
      setError(null)

      if (!token) throw new Error('Token is required')
      await deleteTodo(id, token)

      toast.success('Todo deleted successfully')
      router.push('/todos')
      onClose()
    } catch (error) {
      const err = error as Error // Explicitly cast error to Error
      setError(err.message || 'Error deleting todo')
      toast.error('Failed to delete todo')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>
        </DialogHeader>
        {error && (
          <CustomAlert
            title="Error"
            description={error}
            variant="destructive"
          />
        )}
        <p>Are you sure you want to delete this todo?</p>
        <DialogFooter className="flex justify-end space-x-4">
          <Button
            onClick={handleDelete}
            disabled={isSubmitting}
            className="w-auto"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                Processing <Loader2 className="ml-2 animate-spin" />
              </span>
            ) : (
              'Confirm'
            )}
          </Button>
          <Button onClick={onClose} disabled={isSubmitting} className="w-auto">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
