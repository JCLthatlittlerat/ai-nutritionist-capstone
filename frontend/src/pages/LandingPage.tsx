import {
  ChefHat,
  TrendingUp,
  ShoppingCart,
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
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
            <Button variant="ghost" onClick={() => onNavigate("login")}>
              Log In
            </Button>
            <Button onClick={() => onNavigate("signup")}>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Powered by Advanced AI</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
          Create Personalized Meal Plans in Seconds with AI
        </h1>

        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Help your clients reach their fitness goals faster with AI-generated
          meal plans, macro tracking, and grocery lists—all in one professional
          platform.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-200"
            onClick={() => onNavigate("create")}
          >
            Generate Meal Plan
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate("demo")}
          >
            View Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 pt-12 border-t">
          <div>
            <div className="text-3xl font-bold text-slate-900">10k+</div>
            <div className="text-sm text-slate-600 mt-1">Plans Generated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">5k+</div>
            <div className="text-sm text-slate-600 mt-1">Active Coaches</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">98%</div>
            <div className="text-sm text-slate-600 mt-1">
              Client Satisfaction
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Professional tools designed for fitness coaches who want to deliver
            exceptional value to their clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Card className="border-none bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your coaching?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
              Join thousands of coaches who are saving time and delivering
              better results with AI Nutritionist.
            </p>
            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-slate-50"
              onClick={() => onNavigate("create")}
            >
              Start Creating Plans
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-600">
          <p>© 2025 AI Nutritionist. Built for professional fitness coaches.</p>
        </div>
      </footer>
    </div>
  );
}
