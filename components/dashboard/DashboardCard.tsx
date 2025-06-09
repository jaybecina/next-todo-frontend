import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
}

const DashboardCard = ({ title, count, icon }: DashboardCardProps) => {
  return (
    <Card className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl shadow-sm">
      <CardContent className="p-0">
        <h3 className="text-xl text-center mb-4 font-semibold text-slate-600 dark:text-slate-200">
          {title}
        </h3>
        <div className="flex gap-4 justify-center items-center">
          <div className="text-4xl">{icon}</div>
          <h3 className="text-4xl font-bold text-slate-700 dark:text-slate-100">
            {count}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
