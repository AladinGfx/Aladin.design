import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-transform duration-300 hover:scale-110 active:scale-95"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Moon className="h-5 w-5 fill-current" />
      ) : (
        <Sun className="h-5 w-5 fill-current" />
      )}
    </button>
  );
};