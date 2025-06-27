'use client'

import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import moment from 'moment'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getAllTodos } from '@/services/todoService'
import useAuthStore from '@/store/authStore'
import { Skeleton } from '@/components/ui/skeleton'

const availableFilters = [
  {
    value: 'completed',
    label: 'Completed Todos',
  },
  {
    value: 'pending',
    label: 'Pending Todos',
  },
  {
    value: 'total',
    label: 'Total Todos',
  },
]

interface MonthlyStats {
  name: string
  completed: number
  pending: number
  total: number
}

const AnalyticsChart = ({ isLoading }: { isLoading: boolean }) => {
  const [selection, setSelection] = useState('total')
  const [chartData, setChartData] = useState<MonthlyStats[]>([])
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    const fetchTodos = async () => {
      if (!token) {
        console.error('No authentication token found')
        return
      }

      try {
        const { todos } = await getAllTodos(token)

        const monthlyStats = todos.reduce<Record<string, MonthlyStats>>(
          (acc, todo) => {
            const date = new Date(todo.createdAt)
            const month = date.toLocaleString('default', { month: 'short' })
            const year = date.getFullYear()
            const key = `${month} ${year}`

            if (!acc[key]) {
              acc[key] = { name: key, completed: 0, pending: 0, total: 0 }
            }

            acc[key].total++
            if (todo.completed) {
              acc[key].completed++
            } else {
              acc[key].pending++
            }

            return acc
          },
          {}
        )

        const fallbackData = Array.from({ length: 3 }, (_, index) => {
          const date = moment().subtract(index, 'months')
          const key = date.format('MMM YYYY')
          return (
            monthlyStats[key] || {
              name: key,
              completed: 0,
              pending: 0,
              total: 0,
            }
          )
        }).reverse()

        const processedChartData = Object.values(monthlyStats)
        console.log('Processed chart data:', processedChartData)
        setChartData(fallbackData)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }

    fetchTodos()
  }, [token])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo Analytics For This Year</CardTitle>
        <CardDescription>Todo Status Per Month</CardDescription>
        <div className="w-full sm:w-auto">
          <Select onValueChange={setSelection} defaultValue="total">
            <SelectTrigger className="w-full max-w-xs h-10">
              <SelectValue placeholder="Select Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : chartData.length > 0 ? (
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: 'Number of Todos',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload || payload.length === 0) return null
                    const { name, completed, pending, total } =
                      payload[0].payload
                    return (
                      <div
                        style={{
                          backgroundColor: '#fff',
                          padding: '10px',
                          border: '1px solid #ccc',
                        }}
                      >
                        <p>
                          <strong>{name}</strong>
                        </p>
                        <p>Completed: {completed}</p>
                        <p>Pending: {pending}</p>
                        <p>Total: {total}</p>
                      </div>
                    )
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={selection}
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available for the selected metric.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default AnalyticsChart
