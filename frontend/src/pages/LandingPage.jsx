import {
  Sparkles,
  ChefHat,
  TrendingUp,
  ShoppingCart,
  FileText,
  ArrowRight,
} from "lucide-react";

import { Button } from "../components/ui/Button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

function LandingPage({ onNavigate }) {
  const features = [
    {
      icon: ChefHat,
      title: "AI-Powered Meal Plans",
      description:
        "Generate personalized 7-day meal plans tailored to your client's goals in seconds.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: TrendingUp,
      title: "Macro Breakdown",
      description:
        "Detailed nutritional analysis with protein, carbs, and fats tracking for every meal.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      icon: ShoppingCart,
      title: "Grocery Lists",
      description:
        "Automatic weekly shopping lists organized by category to save your clients time.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: FileText,
      title: "Export & Share",
      description:
        "Download PDFs or share direct links with clients for easy access anywhere.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="landing-page min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900">
              AI Nutritionist
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <Button className="login-btn" variant="ghost" onClick={() => onNavigate("login")}>
              Log In
            </Button>
            <Button className="signup-btn" onClick={() => onNavigate("signup")}>
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Powered by Advanced AI</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Create Personalized Meal Plans in Seconds with AI
        </h1>

        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Help your clients reach their fitness goals faster with AI-generated
          meal plans, macro tracking, and grocery lists.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button
            size="lg"
            className=" from-emerald-600 to-teal-600"
            onClick={() => onNavigate("create")}
          >
            Generate Meal Plan
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button size="lg" variant="outline" onClick={() => onNavigate("demo")}>
            View Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className=" features max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card border-none shadow-md">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
