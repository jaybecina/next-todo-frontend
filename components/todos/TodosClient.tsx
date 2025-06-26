'use client'

import React from 'react'
import BackButton from '@/components/BackButton'
import DataTable from '@/components/table/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { Todo } from '@/types/todoTypes'
import { Eye, Edit, Trash } from 'lucide-react'

interface TodosClientProps {
  data: Todo[]
}

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
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Eye
          className="cursor-pointer"
          onClick={() => console.log(`View action for ${row.original.id}`)}
        />
        <Edit
          className="cursor-pointer"
          onClick={() => console.log(`Edit action for ${row.original.id}`)}
        />
        <Trash
          className="cursor-pointer"
          onClick={() => console.log(`Delete action for ${row.original.id}`)}
        />
      </div>
    ),
  },
]

const TodosClient: React.FC<TodosClientProps> = ({ data }) => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <DataTable columns={columns} data={data} />
    </>
  )
}

export default TodosClient
