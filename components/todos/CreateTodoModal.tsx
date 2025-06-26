'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import CustomAlert from '@/components/ui/CustomAlert'
import { createTodo } from '@/services/todoService'
import useAuthStore from '@/store/authStore'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
})

export default function CreateTodoModal({ onClose }: { onClose: () => void }) {
  const { token } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setError(null)

    try {
      if (!token) throw new Error('Token is required')
      await createTodo(data.title, data.description, token)

      toast.success('Todo created successfully')
      onClose()
      router.push('/todos')
    } catch (error) {
      const err = error as Error
      setError(err.message || 'Error creating todo')
      toast.error('Failed to create todo')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
        </DialogHeader>
        {error && (
          <CustomAlert
            title="Error"
            description={error}
            variant="destructive"
          />
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end space-x-4">
              <Button type="submit" disabled={isSubmitting} className="w-auto">
                {isSubmitting ? (
                  <span className="flex items-center">
                    Processing <Loader2 className="ml-2 animate-spin" />
                  </span>
                ) : (
                  'Submit'
                )}
              </Button>
              <Button
                onClick={onClose}
                disabled={isSubmitting}
                className="w-auto"
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
