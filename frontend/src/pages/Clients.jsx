import { useState, useEffect } from 'react';
import { Search, Plus, Mail, Phone, Calendar, Target, TrendingUp, Filter, MoreVertical, User, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import api from '../services/api';

export function Clients({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddClientDialog, setShowAddClientDialog] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [addClientError, setAddClientError] = useState('');

  // Fetch clients data from the backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await api.get('/auth/users');
        
        // Filter only users with role 'user' (exclude coaches and admins)
        const users = response.data.filter(user => user.role === 'user');
        
        // Transform the data to match the component's expected format
        const transformedClients = users.map(user => {
          const nameParts = user.name ? user.name.split(' ') : ['User'];
          const initials = nameParts.length >= 2 
            ? `${nameParts[0][0]}${nameParts[1][0]}`
            : nameParts[0][0];
          
          return {
            id: user.id,
            name: user.name || 'Unknown',
            email: user.email,
            phone: user.phone || 'N/A',
            goal: user.goal || 'Not Set',
            status: user.is_active ? 'Active' : 'Inactive',
            joinDate: new Date(user.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }),
            currentWeight: user.weight ? `${user.weight} lbs` : 'N/A',
            targetWeight: 'N/A',
            progress: 50,
            activePlans: 0, // Will be calculated from meal plans
            totalCalories: 0,
            avatar: initials,
            avatarColor: getAvatarColor(user.id),
          };
        });
        
        setClientsData(transformedClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
        // Keep empty array on error
        setClientsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Helper function to get avatar color based on user ID
  const getAvatarColor = (id) => {
    const colors = [
      'bg-emerald-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-blue-500',
      'bg-purple-500',
      'bg-rose-500',
      'bg-indigo-500',
      'bg-cyan-500',
    ];
    return colors[id % colors.length];
  };

  const handleAddClient = async () => {
    setAddClientError('');
    
    // Validate required fields
    if (!newClientData.name || !newClientData.email) {
      setAddClientError('Name and email are required');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newClientData.email)) {
      setAddClientError('Please enter a valid email address');
      return;
    }
    
    try {
      // Create new user with role 'user'
      await api.post('/auth/register', {
        name: newClientData.name,
        email: newClientData.email,
        phone: newClientData.phone,
        password: 'TempPassword123!',
        role: 'user'
      });
      
      // Close dialog and reset form
      setShowAddClientDialog(false);
      setNewClientData({ name: '', email: '', phone: '' });
      
      // Refresh clients list
      const response = await api.get('/auth/users');
      const users = response.data.filter(user => user.role === 'user');
      const transformedClients = users.map(user => {
        const nameParts = user.name ? user.name.split(' ') : ['User'];
        const initials = nameParts.length >= 2 
          ? `${nameParts[0][0]}${nameParts[1][0]}`
          : nameParts[0][0];
        
        return {
          id: user.id,
          name: user.name || 'Unknown',
          email: user.email,
          phone: user.phone || 'N/A',
          goal: user.goal || 'Not Set',
          status: user.is_active ? 'Active' : 'Inactive',
          joinDate: new Date(user.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          currentWeight: user.weight ? `${user.weight} lbs` : 'N/A',
          targetWeight: 'N/A',
          progress: 50,
          activePlans: 0,
          totalCalories: 0,
          avatar: initials,
          avatarColor: getAvatarColor(user.id),
        };
      });
      
      setClientsData(transformedClients);
      alert('Client added successfully!');
    } catch (error) {
      console.error('Error adding client:', error);
      if (error.response?.data?.detail?.includes('already exists')) {
        setAddClientError('A user with this email already exists');
      } else {
        setAddClientError(error.response?.data?.detail || 'Failed to add client. Please try again.');
      }
    }
  };

  // Filter clients based on search and status
  const filteredClients = clientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: 'Total Clients',
      value: clientsData.length,
      icon: User,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      label: 'Active Clients',
      value: clientsData.filter(c => c.status === 'Active').length,
      icon: TrendingUp,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    },
    {
      label: 'Total Plans',
      value: clientsData.reduce((sum, c) => sum + c.activePlans, 0),
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Clients</h1>
        <p className="text-slate-600 dark:text-slate-300">Manage and track all your coaching clients</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index}
              className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all"
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filter Bar */}
      <Card className="mb-6 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                className="flex-1 sm:flex-none"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('active')}
                className="flex-1 sm:flex-none"
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'inactive' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('inactive')}
                className="flex-1 sm:flex-none"
              >
                Inactive
              </Button>
            </div>
            <Button 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              onClick={() => setShowAddClientDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Loading clients...</p>
        </div>
      ) : filteredClients.length === 0 ? (
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardContent className="p-12 text-center">
            <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No clients found</h3>
            <p className="text-slate-600 dark:text-slate-300">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredClients.map((client, index) => (
          <Card 
            key={client.id}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-scale-in"
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => onNavigate('demo')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${client.avatarColor} flex items-center justify-center text-white font-bold text-lg`}>
                    {client.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-1">{client.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={client.status === 'Active' ? 'default' : 'secondary'}
                        className={client.status === 'Active' 
                          ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' 
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }
                      >
                        {client.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {client.goal}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Joined {client.joinDate}</span>
                </div>
              </div>

              {/* Progress Section */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Progress</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{client.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${client.progress}%` }}
                  />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Current</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{client.currentWeight}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Target</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{client.targetWeight}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Plans</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{client.activePlans}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}        
      </div>
      )}

      {/* Add Client Dialog */}
      {showAddClientDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-none shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add New Client</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddClientDialog(false);
                    setNewClientData({ name: '', email: '', phone: '' });
                    setAddClientError('');
                  }}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Create a new client account. They will receive a temporary password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {addClientError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                  {addClientError}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Full Name *
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={newClientData.name}
                  onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  value={newClientData.email}
                  onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Phone Number (Optional)
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={newClientData.phone}
                  onChange={(e) => setNewClientData({ ...newClientData, phone: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddClientDialog(false);
                    setNewClientData({ name: '', email: '', phone: '' });
                    setAddClientError('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddClient}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
