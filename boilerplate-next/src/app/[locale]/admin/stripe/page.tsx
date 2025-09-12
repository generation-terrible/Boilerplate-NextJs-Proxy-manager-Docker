import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StripeStats } from '@/components/admin/stripe/StripeStats';
import { StripeRecentPayments } from '@/components/admin/stripe/StripeRecentPayments';
import { StripeQuickActions } from '@/components/admin/stripe/StripeQuickActions';

export default async function StripeDashboard() {
  const t = await getTranslations('StripeAdmin');
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('dashboardTitle')}
        </h1>
        <p className="text-gray-600 mt-1">
          {t('dashboardDescription')}
        </p>
      </div>

      {/* Stripe Stats */}
      <StripeStats />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('recentPayments.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <StripeRecentPayments />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('quickActions.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <StripeQuickActions />
            </CardContent>
          </Card>

          {/* Stripe Links */}
          <Card>
            <CardHeader>
              <CardTitle>{t('externalLinks.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a 
                href="https://dashboard.stripe.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span>{t('externalLinks.stripeDashboard')}</span>
                <span className="text-gray-400">↗</span>
              </a>
              <a 
                href="https://dashboard.stripe.com/test/payments" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span>{t('externalLinks.testPayments')}</span>
                <span className="text-gray-400">↗</span>
              </a>
              <a 
                href="https://dashboard.stripe.com/test/customers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span>{t('externalLinks.customers')}</span>
                <span className="text-gray-400">↗</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}