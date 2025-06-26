'use client'

import React, { useState } from 'react'
import { Todo } from '@/types/todoTypes'
import BackButton from '@/components/BackButton'
import UpdateTodoModal from './UpdateTodoModal'
import DeleteTodoModal from './DeleteTodoModal'
import { Edit, Trash } from 'lucide-react'

interface TodoDetailsClientProps {
  todo: Todo
}

const TodoDetailsClient: React.FC<TodoDetailsClientProps> = ({ todo }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (!todo) return <p>Loading...</p>

  console.log('Todo Details:', todo)

  return (
    <div className="p-6 bg-white rounded-lg shadow-md relative">
      <div className="absolute top-6 left-6">
        <BackButton text="Back" link="/todos" />
      </div>
      <div className="absolute top-6 right-6 flex space-x-2">
        <Edit
          className="cursor-pointer text-blue-500"
          onClick={() => setShowUpdateModal(true)}
        />
        <Trash
          className="cursor-pointer text-red-500"
          onClick={() => setShowDeleteModal(true)}
        />
      </div>
      <h1 className="text-3xl font-bold mb-6 mt-12">{todo.title}</h1>
      <p className="text-gray-700 mb-4">{todo.description}</p>
      <p className="text-gray-500 mb-4">
        <strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}
      </p>
      <p className="text-gray-500 mb-4">
        <strong>Created At:</strong>{' '}
        {new Date(todo.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-500">
        <strong>Updated At:</strong>{' '}
        {new Date(todo.updatedAt).toLocaleDateString()}
      </p>

      {showUpdateModal && (
        <UpdateTodoModal
          todo={todo}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteTodoModal
          id={todo.id}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  )
}

export default TodoDetailsClient
