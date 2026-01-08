import { LayoutDashboard, Plus, Users, History, Settings, Sparkles, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export function Sidebar({ currentPage, onNavigate, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create', label: 'Create Plan', icon: Plus },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-900">AI Nutritionist</div>
            <div className="text-xs text-slate-500">Coach Dashboard</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-slate-900 text-sm truncate">John Doe</div>
            <div className="text-xs text-slate-500">Pro Coach</div>
          </div>
        </div>
        {onLogout && (
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-600 hover:text-slate-900 hover:bg-red-50 hover:text-red-600"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span className="text-sm">Logout</span>
          </Button>
        )}
      </div>
    </aside>
  );
}
