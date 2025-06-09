import DashboardCard from "@/components/dashboard/DashboardCard";
import DataTable from "@/components/table/DataTable";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { CheckCircle2, Clock, ListTodo, RotateCcw } from "lucide-react";
import { todos } from "@/data/todos";

export default function Home() {
  // Calculate todo statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = todos.filter((todo) => !todo.completed).length;
  const recentTodos = todos.filter((todo) => {
    const todoDate = new Date(todo.createdAt);
    const today = new Date();
    return todoDate.getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000; // Last 7 days
  }).length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-0 py-4">
        <DashboardCard
          title="Total Todos"
          count={totalTodos}
          icon={<ListTodo className="text-blue-500" size={72} />}
        />
        <DashboardCard
          title="Completed"
          count={completedTodos}
          icon={<CheckCircle2 className="text-green-500" size={72} />}
        />
        <DashboardCard
          title="Pending"
          count={pendingTodos}
          icon={<Clock className="text-yellow-500" size={72} />}
        />
        <DashboardCard
          title="Recent (7 days)"
          count={recentTodos}
          icon={<RotateCcw className="text-purple-500" size={72} />}
        />
      </div>
      <AnalyticsChart />
      <DataTable title="Latest Todos" limit={5} />
    </>
  );
}
