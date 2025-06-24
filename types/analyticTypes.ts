export interface AnalyticsItem {
  name: string;
  completed: number;
  pending: number;
  total: number;
}

export interface TodoAnalytics {
  monthlyStats: AnalyticsItem[];
  totalStats: {
    totalTodos: number;
    completedTodos: number;
    pendingTodos: number;
    completionRate: number;
  };
}

export interface MonthlyTodoStats {
  month: string;
  year: number;
  completedCount: number;
  pendingCount: number;
  totalCount: number;
}
