import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StripeStats } from '@/components/admin/stripe/StripeStats';
import { StripeRecentPayments } from '@/components/admin/stripe/StripeRecentPayments';
import { StripeQuickActions } from '@/components/admin/stripe/StripeQuickActions';

export default function StripeDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Stripe Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Manage payments, subscriptions and customers
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
              <CardTitle>Recent Payments</CardTitle>
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <StripeQuickActions />
            </CardContent>
          </Card>

          {/* Stripe Links */}
          <Card>
            <CardHeader>
              <CardTitle>External Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a 
                href="https://dashboard.stripe.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span>Stripe Dashboard</span>
                <span className="text-gray-400">↗</span>
              </a>
              <a 
                href="https://dashboard.stripe.com/test/payments" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span>Test Payments</span>
                <span className="text-gray-400">↗</span>
              </a>
              <a 
                href="https://dashboard.stripe.com/test/customers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span>Customers</span>
                <span className="text-gray-400">↗</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}