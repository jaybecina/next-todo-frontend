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
import { updateTodo } from '@/services/todoService'
import { Todo } from '@/types/todoTypes'
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
import { useRouter, usePathname } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  completed: z.boolean(),
})

export default function UpdateTodoModal({
  todo,
  onClose,
}: {
  todo: Todo
  onClose: () => void
}) {
  const { token } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setError(null)

    try {
      if (!token) throw new Error('Token is required')
      await updateTodo(
        todo.id,
        data.title,
        data.description,
        data.completed,
        token
      )

      toast.success(`Todo updated successfully. Current Path: ${pathname}`)
      onClose()
      router.push(pathname)
    } catch (error) {
      const err = error as Error
      setError(err.message || 'Error updating todo')
      toast.error('Failed to update todo')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
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

            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completed</FormLabel>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
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
