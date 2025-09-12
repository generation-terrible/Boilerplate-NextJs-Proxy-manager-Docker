import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StripeAdminService } from '@/lib/stripe-admin';
import { DollarSign, Users, CreditCard, TrendingDown } from 'lucide-react';

async function StatsContent() {
  const stats = await StripeAdminService.getStats();
  const t = await getTranslations('StripeAdmin.stats');

  const statCards = [
    {
      title: t('totalRevenue'),
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      title: t('monthlyRevenue'),
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+8.2%',
      changeType: 'positive' as const
    },
    {
      title: t('totalCustomers'),
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      change: '+23',
      changeType: 'positive' as const
    },
    {
      title: t('activeSubscriptions'),
      value: stats.totalSubscriptions.toLocaleString(),
      icon: CreditCard,
      change: '+5',
      changeType: 'positive' as const
    },
    {
      title: t('churnRate'),
      value: `${stats.churnRate}%`,
      icon: TrendingDown,
      change: '-0.8%',
      changeType: 'negative' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
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
              {stat.change} {t('fromLastMonth')}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="space-y-0 pb-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 bg-gray-200 rounded animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function StripeStats() {
  return (
    <Suspense fallback={<StatsSkeleton />}>
      <StatsContent />
    </Suspense>
  );
}