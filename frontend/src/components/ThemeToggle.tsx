import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0" disabled>
          <Sun className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("light")}
        className={`w-8 h-8 p-0 transition-all ${
          theme === "light"
            ? "bg-white dark:bg-slate-700 shadow-sm text-emerald-600"
            : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
        }`}
        title="Light mode"
      >
        <Sun className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("dark")}
        className={`w-8 h-8 p-0 transition-all ${
          theme === "dark"
            ? "bg-white dark:bg-slate-700 shadow-sm text-emerald-600"
            : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
        }`}
        title="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("system")}
        className={`w-8 h-8 p-0 transition-all ${
          theme === "system"
            ? "bg-white dark:bg-slate-700 shadow-sm text-emerald-600"
            : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
        }`}
        title="System mode"
      >
        <Monitor className="w-4 h-4" />
      </Button>
    </div>
  );
}
