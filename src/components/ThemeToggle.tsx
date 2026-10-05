import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface Props {
  isDark: boolean;
  onToggle: () => void;
  variant?: 'compact' | 'pill' | 'expanded';
  className?: string;
}

export const ThemeToggle: React.FC<Props> = ({ 
  isDark, 
  onToggle, 
  variant = 'pill',
  className = '' 
}) => {
  if (variant === 'expanded') {
    return (
      <button
        onClick={onToggle}
        type="button"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
          isDark
            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
            : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
        } ${className}`}
      >
        <div className="flex items-center gap-2 text-xs font-semibold">
          {isDark ? (
            <Moon className="w-4 h-4 text-sky-400 fill-sky-400/20" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          )}
          <span>Theme: {isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-xs">
          Toggle
        </span>
      </button>
    );
  }

  // Default 'pill' variant: A segmented toggle switch showing Sun and Moon
  return (
    <button
      onClick={onToggle}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Click to switch to ${isDark ? 'Light' : 'Dark'} mode`}
      className={`relative inline-flex items-center p-1 rounded-full border transition-all duration-300 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
        isDark
          ? 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-slate-600'
          : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-slate-400 shadow-inner'
      } ${className}`}
    >
      {/* Light Option Indicator */}
      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
        !isDark 
          ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold' 
          : 'text-slate-400 hover:text-slate-300'
      }`}>
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-500/30' : 'text-slate-400'}`} />
        <span className="hidden sm:inline">Light</span>
      </span>

      {/* Dark Option Indicator */}
      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
        isDark 
          ? 'bg-slate-700 text-white shadow-sm border border-slate-600 font-bold' 
          : 'text-slate-500 hover:text-slate-700'
      }`}>
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-sky-300 fill-sky-300/30' : 'text-slate-400'}`} />
        <span className="hidden sm:inline">Dark</span>
      </span>
    </button>
  );
};
