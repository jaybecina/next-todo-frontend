import { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface DashboardCardProps {
  title: string
  count: number
  icon: React.ReactElement<LucideIcon>
  isLoading?: boolean
}

const DashboardCard = ({
  title,
  count,
  icon,
  isLoading,
}: DashboardCardProps) => {
  return (
    <Card className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl shadow-sm">
      <CardContent className="p-0">
        <h3 className="text-xl text-center mb-4 font-semibold text-slate-600 dark:text-slate-200">
          {title}
        </h3>
        <div className="flex gap-4 justify-center items-center">
          {isLoading ? (
            <Skeleton className="w-16 h-16" />
          ) : (
            <div className="text-4xl">{icon}</div>
          )}
          {isLoading ? (
            <Skeleton className="w-16 h-8" />
          ) : (
            <h3 className="text-4xl font-bold text-slate-700 dark:text-slate-100">
              {count}
            </h3>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardCard
