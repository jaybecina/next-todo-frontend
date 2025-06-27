'use client'

import { CheckCircle2, Clock, ListTodo, RotateCcw } from 'lucide-react'

import DashboardCard from '@/components/dashboard/DashboardCard'
import AnalyticsChart from '@/components/dashboard/AnalyticsChart'
import useAuthStore from '@/store/authStore'

const DashboardContent = ({
  totalTodos,
  completedTodos,
  pendingTodos,
  recentTodos,
  isLoading,
}: {
  totalTodos: number
  completedTodos: number
  pendingTodos: number
  recentTodos: number
  isLoading: boolean
}) => {
  const authStoreData = useAuthStore()
  console.log('Auth Store Data:', authStoreData)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-0 py-4">
        <DashboardCard
          title="Total Todos"
          count={totalTodos}
          icon={<ListTodo className="text-blue-500" size={72} />}
          isLoading={isLoading}
        />
        <DashboardCard
          title="Completed"
          count={completedTodos}
          icon={<CheckCircle2 className="text-green-500" size={72} />}
          isLoading={isLoading}
        />
        <DashboardCard
          title="Pending"
          count={pendingTodos}
          icon={<Clock className="text-yellow-500" size={72} />}
          isLoading={isLoading}
        />
        <DashboardCard
          title="Recent (7 days)"
          count={recentTodos}
          icon={<RotateCcw className="text-purple-500" size={72} />}
          isLoading={isLoading}
        />
      </div>
      <AnalyticsChart isLoading={isLoading} />
    </>
  )
}

export default DashboardContent
