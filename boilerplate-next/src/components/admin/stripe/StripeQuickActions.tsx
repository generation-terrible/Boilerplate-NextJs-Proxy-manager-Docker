'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ExternalLink, Users, CreditCard, BarChart3, Settings } from 'lucide-react';

const getQuickActions = (t: any) => [
  {
    title: t('viewCustomers'),
    description: t('manageCustomers'),
    href: '/admin/stripe/customers',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: t('subscriptions'),
    description: t('manageSubscriptions'),
    href: '/admin/stripe/subscriptions',
    icon: CreditCard,
    color: 'bg-green-500'
  },
  {
    title: t('paymentReports'),
    description: t('viewAnalytics'),
    href: '/admin/stripe/reports',
    icon: BarChart3,
    color: 'bg-purple-500'
  },
  {
    title: t('webhookSettings'),
    description: t('configureWebhooks'),
    href: '/admin/stripe/webhooks',
    icon: Settings,
    color: 'bg-orange-500'
  }
];

export function StripeQuickActions() {
  const t = useTranslations('StripeAdmin.quickActions');
  const quickActions = getQuickActions(t);
  
  return (
    <div className="space-y-3">
      {quickActions.map((action, index) => (
        <Link 
          key={index}
          href={action.href}
          className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className={`p-2 rounded-lg ${action.color} text-white mr-3`}>
            <action.icon className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{action.title}</div>
            <div className="text-xs text-gray-600">{action.description}</div>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </Link>
      ))}
      
      {/* Action spéciale pour créer un customer */}
      <div className="pt-3 border-t border-gray-200">
        <button 
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-gray-400 transition-colors"
          onClick={() => {
            // TODO: Implement create customer modal
            alert(t('createCustomerSoon'));
          }}
        >
          <div className="text-sm font-medium text-gray-600">
            {t('createCustomer')}
          </div>
        </button>
      </div>
    </div>
  );
}