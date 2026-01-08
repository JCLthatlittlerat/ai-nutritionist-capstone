import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { CreateMealPlan } from './pages/CreateMealPlan';
import { MealPlanView } from './pages/MealPlanView';
import { Sidebar } from './pages/Sidebar';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleGeneratePlan = () => {
    setCurrentPage('demo');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  // Auth pages - no sidebar
  if (currentPage === 'login') {
    return <Login onNavigate={handleNavigate} onLogin={handleLogin} />;
  }

  if (currentPage === 'signup') {
    return <SignUp onNavigate={handleNavigate} onSignUp={handleSignUp} />;
  }

  // Landing page - no sidebar
  if (currentPage === 'landing') {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  // App pages - with sidebar
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} onLogout={handleLogout} />
      <main className="flex-1 overflow-auto">
        {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {currentPage === 'create' && <CreateMealPlan onNavigate={handleNavigate} onGenerate={handleGeneratePlan} />}
        {currentPage === 'demo' && <MealPlanView />}
      </main>
    </div>
  );
}
