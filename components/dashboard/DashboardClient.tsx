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
        console.log('Fetching data for DashboardClient...')
        // Simulate data fetching
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log('Data fetched successfully:', {
          totalTodos,
          completedTodos,
          pendingTodos,
          recentTodos,
        })
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [totalTodos, completedTodos, pendingTodos, recentTodos])

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
