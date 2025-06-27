'use client'

import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate data fetching
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

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
