import { auth } from "@/auth";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminRecentActivity } from "@/components/admin/AdminRecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {session?.user?.name || "Admin"}
        </p>
      </div>

      {/* Stats Overview */}
      <AdminStats />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminRecentActivity />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="font-medium">Manage Users</div>
                <div className="text-sm text-gray-600">View and edit users</div>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="font-medium">Stripe Dashboard</div>
                <div className="text-sm text-gray-600">
                  Payments & subscriptions
                </div>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="font-medium">View Analytics</div>
                <div className="text-sm text-gray-600">Usage statistics</div>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="font-medium">System Settings</div>
                <div className="text-sm text-gray-600">
                  Configure application
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
