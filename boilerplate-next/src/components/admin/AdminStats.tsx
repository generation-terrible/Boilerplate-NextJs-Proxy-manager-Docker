import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Activity, DollarSign } from 'lucide-react';

// Mock data - À remplacer par de vraies données
const stats = [
  {
    title: 'Total Users',
    value: '2,543',
    icon: Users,
    change: '+180 this month',
    changeType: 'positive' as const
  },
  {
    title: 'New Signups',
    value: '127',
    icon: UserPlus,
    change: '+23% from last month',
    changeType: 'positive' as const
  },
  {
    title: 'Active Users',
    value: '1,845',
    icon: Activity,
    change: '85% active rate',
    changeType: 'positive' as const
  },
  {
    title: 'Revenue',
    value: '$12,543',
    icon: DollarSign,
    change: '+15.3% this month',
    changeType: 'positive' as const
  }
];

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}