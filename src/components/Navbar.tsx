import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { 
  Compass, 
  Sparkles, 
  SplitSquareVertical, 
  GraduationCap, 
  Milestone, 
  BookMarked, 
  Database, 
  Users, 
  Network, 
  LayoutDashboard, 
  FileText, 
  ShieldCheck, 
  Menu, 
  X, 
  Check, 
  ChevronDown,
  Layers,
  Search
} from 'lucide-react';

interface Props {
  currentTab: string;
  onTabChange: (tab: string) => void;
  currentUser: User | null;
  onSwitchRole: (role: UserRole) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentTab,
  onTabChange,
  currentUser,
  onSwitchRole,
  isDark,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Explore Literature', icon: Compass },
    { id: 'chat', label: 'AI Assistant', icon: Sparkles },
    { id: 'paper-analyzer', label: 'Paper Analyzer', icon: FileText },
    { id: 'research-gap', label: 'Research Gap', icon: SplitSquareVertical },
    { id: 'novelty', label: 'Novelty Analysis', icon: Layers },
    { id: 'fyp-advisor', label: 'FYP Advisor', icon: GraduationCap },
    { id: 'roadmap', label: 'Roadmap', icon: Milestone },
    { id: 'literature', label: 'Literature Matrix', icon: BookMarked },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'researchers', label: 'Researchers', icon: Users },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Network },
  ];

  const roles: { role: UserRole; label: string }[] = [
    { role: 'student', label: 'Student' },
    { role: 'scholar', label: 'Research Scholar (MS/PhD)' },
    { role: 'faculty', label: 'Faculty / Supervisor' },
    { role: 'admin', label: 'Research Admin (DASR)' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Academic Sub-bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">Karakoram International University</span>
          <span className="hidden sm:inline text-slate-400">| Directorate of Advanced Studies & Research (DASR)</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onTabChange('integrity')}
            className="hover:text-emerald-400 text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Research Integrity & Policy</span>
            <span className="md:hidden">Policy</span>
          </button>
          <span className="text-slate-600">|</span>
          <a 
            href="https://www.kiu.edu.pk/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-emerald-400 hover:underline flex items-center gap-1"
          >
            Official Portal &rarr;
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => onTabChange('landing')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-800 to-teal-950 dark:from-emerald-700 dark:to-slate-900 text-white flex items-center justify-center font-serif font-bold text-xl shadow-md border border-emerald-600/40 group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <div className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-tight tracking-tight flex items-center gap-1.5">
                KIU Research Intelligence Lab
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block tracking-wide">
                From Literature to Research Direction
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.slice(0, 7).map(item => {
              const Icon = item.icon;
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}

            {/* More Menu for additional tools */}
            <div className="relative group">
              <button 
                className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
              >
                More <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 hidden group-hover:block transition-all">
                {navItems.slice(7).map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {item.label}
                    </button>
                  );
                })}
                <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                <button
                  onClick={() => onTabChange('compare')}
                  className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 flex items-center gap-2 cursor-pointer"
                >
                  <SplitSquareVertical className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Paper Comparison
                </button>
                <button
                  onClick={() => onTabChange('proposal-builder')}
                  className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Proposal Builder (13-Sec)
                </button>
                <button
                  onClick={() => onTabChange('citation-assistant')}
                  className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 flex items-center gap-2 cursor-pointer"
                >
                  <BookMarked className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Citation Assistant (APA/IEEE)
                </button>
                <button
                  onClick={() => onTabChange('admin')}
                  className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Admin Console
                </button>
              </div>
            </div>
          </nav>

          {/* Right Action Icons: Role Switcher, Dashboard, Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 cursor-pointer transition-all"
                title="Switch Role"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="capitalize font-medium">{currentUser?.role || 'Student'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Role-Based Access
                  </div>
                  {roles.map(r => (
                    <button
                      key={r.role}
                      onClick={() => {
                        onSwitchRole(r.role);
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between cursor-pointer"
                    >
                      <span>{r.label}</span>
                      {currentUser?.role === r.role && (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dashboard Shortcut Button */}
            <button
              onClick={() => onTabChange('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/80 dark:text-emerald-300 dark:hover:bg-emerald-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">My Workspace</span>
            </button>

            {/* Theme Toggle - User-Friendly Segmented Pill */}
            <ThemeToggle 
              isDark={isDark} 
              onToggle={onToggleTheme} 
              variant="pill" 
            />

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1">
          <div className="py-2 border-b border-slate-200 dark:border-slate-800 mb-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Signed in as:</span>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full capitalize font-semibold">
                {currentUser?.role || 'Student'}
              </span>
            </div>
            <div className="font-semibold text-sm text-slate-900 dark:text-white">
              {currentUser?.name || 'Yasir Ali'}
            </div>
            <div className="pt-1">
              <ThemeToggle 
                isDark={isDark} 
                onToggle={onToggleTheme} 
                variant="expanded" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-xs font-medium text-left flex items-center gap-2 cursor-pointer ${
                    currentTab === item.id
                      ? 'bg-emerald-800 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                onTabChange('compare');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-md text-xs font-medium text-left flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <SplitSquareVertical className="w-4 h-4 text-emerald-600" />
              <span>Paper Comparison</span>
            </button>
            <button
              onClick={() => {
                onTabChange('proposal-builder');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-md text-xs font-medium text-left flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Proposal Builder</span>
            </button>
            <button
              onClick={() => {
                onTabChange('citation-assistant');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-md text-xs font-medium text-left flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <BookMarked className="w-4 h-4 text-emerald-600" />
              <span>Citation Assistant</span>
            </button>
            <button
              onClick={() => {
                onTabChange('admin');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-md text-xs font-medium text-left flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Admin Console</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
