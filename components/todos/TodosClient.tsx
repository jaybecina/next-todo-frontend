'use client'

import React, { useState } from 'react'
import BackButton from '@/components/BackButton'
import DataTable from '@/components/table/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { Todo } from '@/types/todoTypes'
import { Eye, Edit, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CreateTodoModal from './CreateTodoModal'
import UpdateTodoModal from './UpdateTodoModal'
import DeleteTodoModal from './DeleteTodoModal'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Plus } from 'lucide-react'

interface TodosClientProps {
  data: Todo[]
}

const TodosClient: React.FC<TodosClientProps> = ({ data }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const router = useRouter()

  const handleView = (id: string) => {
    router.push(`/todos/${id}`)
  }

  const handleCreate = () => {
    setShowCreateModal(true)
  }

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo)
    setShowUpdateModal(true)
  }

  const handleDelete = (todo: Todo) => {
    setSelectedTodo(todo)
    setShowDeleteModal(true)
  }

  const actionCell = ({ row }: { row: { original: Todo } }) => (
    <div className="flex space-x-2">
      <Eye
        className="cursor-pointer"
        onClick={() => handleView(row.original.id)}
      />
      <Edit
        className="cursor-pointer"
        onClick={() => handleEdit(row.original)}
      />
      <Trash
        className="cursor-pointer"
        onClick={() => handleDelete(row.original)}
      />
    </div>
  )

  const columns: ColumnDef<Todo>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'completed',
      header: 'Status',
      cell: ({ row }) => (row.original.completed ? 'Completed' : 'Pending'),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      header: 'Actions',
      cell: actionCell,
    },
  ]

  return (
    <>
      <BackButton text="Go Back" link="/" />
      <div className="mb-2">
        {' '}
        {/* Added margin-bottom for spacing */}
        <Tooltip>
          <TooltipTrigger>
            <Button onClick={handleCreate} className="p-2">
              <Plus className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Create Todo</TooltipContent>
        </Tooltip>
      </div>
      <DataTable columns={columns} data={data} />
      {showCreateModal && (
        <CreateTodoModal onClose={() => setShowCreateModal(false)} />
      )}
      {showUpdateModal && selectedTodo && (
        <UpdateTodoModal
          todo={selectedTodo}
          onClose={() => {
            setShowUpdateModal(false)
            setSelectedTodo(null)
          }}
        />
      )}
      {showDeleteModal && selectedTodo && (
        <DeleteTodoModal
          id={selectedTodo.id}
          onClose={() => {
            setShowDeleteModal(false)
            setSelectedTodo(null)
          }}
        />
      )}
    </>
  )
}

export default TodosClient
