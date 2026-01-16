import { Users, TrendingUp, FileText, Calendar, Target, Utensils } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Dashboard({ onNavigate }) {
  const stats = [
    {
      title: 'Active Clients',
      value: '24',
      change: '+3 this week',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Plans Generated',
      value: '156',
      change: '+12 this month',
      icon: FileText,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      title: 'Avg. Calories/Day',
      value: '2,245',
      change: 'Across all plans',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Success Rate',
      value: '94%',
      change: 'Client goal achievement',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ];

  const recentPlans = [
    {
      client: 'Sarah Johnson',
      goal: 'Muscle Gain',
      calories: 2800,
      date: '2 days ago',
      status: 'Active',
    },
    {
      client: 'Mike Chen',
      goal: 'Fat Loss',
      calories: 1800,
      date: '5 days ago',
      status: 'Active',
    },
    {
      client: 'Emma Davis',
      goal: 'Maintenance',
      calories: 2200,
      date: '1 week ago',
      status: 'Completed',
    },
    {
      client: 'James Wilson',
      goal: 'Muscle Gain',
      calories: 3000,
      date: '1 week ago',
      status: 'Active',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's your coaching overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-slate-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-slate-500">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8 border-none shadow-md">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for your coaching workflow</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button 
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            onClick={() => onNavigate('create')}
          >
            <Utensils className="w-4 h-4 mr-2" />
            Create New Meal Plan
          </Button>
          <Button variant="outline" onClick={() => onNavigate('clients')}>
            <Users className="w-4 h-4 mr-2" />
            View Clients
          </Button>
          <Button variant="outline" onClick={() => onNavigate('history')}>
            <Calendar className="w-4 h-4 mr-2" />
            Plan History
          </Button>
        </CardContent>
      </Card>

      {/* Recent Plans */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Recent Meal Plans</CardTitle>
          <CardDescription>Your latest client meal plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPlans.map((plan, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-150 cursor-pointer"
                onClick={() => onNavigate('demo')}
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{plan.client}</h4>
                  <p className="text-sm text-slate-600">
                    {plan.goal} • {plan.calories} cal/day
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">{plan.date}</span>
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      plan.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {plan.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
