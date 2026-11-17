import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const getStoredTheme = () => {
  try {
    const stored = localStorage.getItem('theme');
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch (e) {
    return null;
  }
};

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#0C0C16' : '#FAFAFD');
  }
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => getStoredTheme() || (document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  );

  useEffect(() => {
    if (getStoredTheme()) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const next = e.matches ? 'dark' : 'light';
      setTheme(next);
      applyTheme(next);
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
