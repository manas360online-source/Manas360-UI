import React, { useEffect, useState } from 'react';

// --- ICONS FOR THEME TOGGLE ---
const SunIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);

const MoonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);

export const Header: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Sync local state with global class
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <header className="relative text-center pt-6 pb-16 animate-fade-in-down">
      
      {/* Absolute positioned toggle for Landing Page Header */}
      <div className="absolute top-4 right-0 md:right-4 z-50">
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-full text-[#0A3A78] dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors backdrop-blur-sm"
          title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>

      <div className="inline-block relative">
        <div className="font-serif text-[1.6rem] md:text-[1.8rem] font-medium text-wellness-slate dark:text-white tracking-[0.2em] uppercase transition-colors">
          MANAS<span className="font-semibold text-[#0A4E89] dark:text-sky-300">360</span>
        </div>
        {/* Subtle underline decoration */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-sky-200/60 dark:bg-sky-500/60 rounded-full transition-colors"></div>
      </div>
    </header>
  );
};