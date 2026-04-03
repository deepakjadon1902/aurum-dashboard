import { useStore } from '@/store';
import { Menu, Sun, Moon, Shield, Eye } from 'lucide-react';

export const Topbar = () => {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const setSidebarOpen = useStore((s) => s.setSidebarOpen);
  const currentRole = useStore((s) => s.currentRole);
  const setRole = useStore((s) => s.setRole);

  const handleThemeToggle = () => {
    toggleTheme();
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 md:px-6 border-b border-border bg-card/60 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="/aurum%20logo.jpeg"
            alt="Aurum logo"
            className="h-8 w-8 rounded-md object-contain"
          />
          <span className="hidden sm:inline text-sm font-semibold text-foreground tracking-wide">Aurum</span>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {/* Role switcher */}
        <div className="flex items-center bg-muted rounded-lg p-0.5">
          <button
            onClick={() => setRole('viewer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentRole === 'viewer'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Viewer
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentRole === 'admin'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>

        {/* Theme toggle */}
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};
