'use client'

import React, { useState } from 'react'

import DashboardContent from './DashboardContent'

interface DashboardClientProps {
  totalTodos: number
  completedTodos: number
  pendingTodos: number
  recentTodos: number
}

const DashboardClient: React.FC<DashboardClientProps> = ({
  totalTodos,
  completedTodos,
  pendingTodos,
  recentTodos,
}) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <DashboardContent
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      pendingTodos={pendingTodos}
      recentTodos={recentTodos}
      isLoading={isLoading}
    />
  )
}

export default DashboardClient
