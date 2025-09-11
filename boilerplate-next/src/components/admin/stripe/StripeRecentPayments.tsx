import { Suspense } from 'react';
import { StripeAdminService, AdminPayment } from '@/lib/stripe-admin';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

async function PaymentsContent() {
  const payments = await StripeAdminService.getRecentPayments(10);

  if (payments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No recent payments found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div 
          key={payment.id} 
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium">
                  {payment.currency} {payment.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  {payment.customerEmail || 'No email'}
                </p>
              </div>
            </div>
            {payment.description && (
              <p className="text-sm text-gray-500 mt-1">
                {payment.description}
              </p>
            )}
          </div>
          
          <div className="text-right">
            <Badge 
              variant={
                payment.status === 'succeeded' ? 'default' : 
                payment.status === 'pending' ? 'secondary' : 'destructive'
              }
            >
              {payment.status}
            </Badge>
            <p className="text-sm text-gray-500 mt-1">
              {formatDistanceToNow(new Date(payment.createdAt * 1000), { 
                addSuffix: true 
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PaymentsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
          </div>
          <div className="text-right">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-16 mb-2" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StripeRecentPayments() {
  return (
    <Suspense fallback={<PaymentsSkeleton />}>
      <PaymentsContent />
    </Suspense>
  );
}