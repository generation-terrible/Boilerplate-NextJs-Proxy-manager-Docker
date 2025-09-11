'use client';

import Link from 'next/link';
import { ExternalLink, Users, CreditCard, BarChart3, Settings } from 'lucide-react';

const quickActions = [
  {
    title: 'View Customers',
    description: 'Manage customer accounts',
    href: '/admin/stripe/customers',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Subscriptions',
    description: 'Manage subscriptions',
    href: '/admin/stripe/subscriptions',
    icon: CreditCard,
    color: 'bg-green-500'
  },
  {
    title: 'Payment Reports',
    description: 'View payment analytics',
    href: '/admin/stripe/reports',
    icon: BarChart3,
    color: 'bg-purple-500'
  },
  {
    title: 'Webhook Settings',
    description: 'Configure webhooks',
    href: '/admin/stripe/webhooks',
    icon: Settings,
    color: 'bg-orange-500'
  }
];

export function StripeQuickActions() {
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
            alert('Create customer functionality coming soon!');
          }}
        >
          <div className="text-sm font-medium text-gray-600">
            + Create New Customer
          </div>
        </button>
      </div>
    </div>
  );
}