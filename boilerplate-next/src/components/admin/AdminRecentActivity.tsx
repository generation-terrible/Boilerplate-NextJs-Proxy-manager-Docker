import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

// Mock data - À remplacer par de vraies données
const activities = [
  {
    id: 1,
    type: 'user_signup',
    description: 'New user registered',
    user: 'john.doe@example.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
    status: 'success'
  },
  {
    id: 2,
    type: 'payment',
    description: 'Payment received',
    user: 'jane.smith@example.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    status: 'success'
  },
  {
    id: 3,
    type: 'subscription',
    description: 'Subscription cancelled',
    user: 'bob.wilson@example.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    status: 'warning'
  },
  {
    id: 4,
    type: 'error',
    description: 'Payment failed',
    user: 'alice.brown@example.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    status: 'error'
  },
  {
    id: 5,
    type: 'user_login',
    description: 'User logged in',
    user: 'charlie.davis@example.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    status: 'success'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'user_signup':
      return '👤';
    case 'payment':
      return '💳';
    case 'subscription':
      return '📋';
    case 'error':
      return '⚠️';
    case 'user_login':
      return '🔐';
    default:
      return '📝';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'default';
    case 'warning':
      return 'secondary';
    case 'error':
      return 'destructive';
    default:
      return 'default';
  }
};

export function AdminRecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div 
          key={activity.id} 
          className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg"
        >
          <div className="text-2xl">{getActivityIcon(activity.type)}</div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-sm">{activity.description}</p>
              <Badge variant={getStatusColor(activity.status)}>
                {activity.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 truncate">{activity.user}</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
      
      <div className="text-center pt-4">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          View all activities →
        </button>
      </div>
    </div>
  );
}