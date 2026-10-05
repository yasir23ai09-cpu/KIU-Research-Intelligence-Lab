import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Views
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { SearchExplorerView } from './views/SearchExplorerView';
import { PaperAnalyzerView } from './views/PaperAnalyzerView';
import { ResearchGapView } from './views/ResearchGapView';
import { NoveltyMatrixView } from './views/NoveltyMatrixView';
import { FypAdvisorView } from './views/FypAdvisorView';
import { RoadmapView } from './views/RoadmapView';
import { LiteratureWorkspaceView } from './views/LiteratureWorkspaceView';
import { PaperComparisonView } from './views/PaperComparisonView';
import { DatasetFinderView } from './views/DatasetFinderView';
import { ResearchersView } from './views/ResearchersView';
import { KnowledgeGraphView } from './views/KnowledgeGraphView';
import { ProposalBuilderView } from './views/ProposalBuilderView';
import { CitationAssistantView } from './views/CitationAssistantView';
import { ChatView } from './views/ChatView';
import { IntegrityView } from './views/IntegrityView';
import { AdminView } from './views/AdminView';

// Mobile Bottom Nav Icons
import { Compass, Sparkles, FileText, Bookmark, Home } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [tabQuery, setTabQuery] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedResearchIds, setSavedResearchIds] = useState<string[]>([]);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme from saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('kiu_theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    // Fetch initial user session
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setCurrentUser(data.user);
          setSavedResearchIds(data.savedResearchIds || []);
        }
      })
      .catch(err => console.error('Session fetch error:', err));
  }, []);

  // Synchronize document root whenever isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kiu_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kiu_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleSwitchRole = async (role: UserRole) => {
    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
      }
    } catch (e) {
      console.error('Error switching role:', e);
    }
  };

  const handleToggleSave = async (researchItemId: string) => {
    try {
      const res = await fetch('/api/research/save-toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ researchItemId })
      });
      const data = await res.json();
      if (data.savedResearchIds) {
        setSavedResearchIds(data.savedResearchIds);
      }
    } catch (e) {
      console.error('Error toggling save:', e);
    }
  };

  const navigateToTab = (tab: string, query?: string) => {
    setCurrentTab(tab);
    if (query !== undefined) {
      setTabQuery(query);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-200`}>
      {/* Top Academic Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={navigateToTab}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main View Container */}
      <main className="flex-1 pb-16 xl:pb-0">
        {currentTab === 'landing' && (
          <LandingView onTabChange={navigateToTab} />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            currentUser={currentUser}
            onTabChange={navigateToTab}
            savedResearchIds={savedResearchIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentTab === 'explore' && (
          <SearchExplorerView
            initialQuery={tabQuery}
            savedResearchIds={savedResearchIds}
            onToggleSave={handleToggleSave}
            onTabChange={navigateToTab}
          />
        )}

        {currentTab === 'paper-analyzer' && (
          <PaperAnalyzerView
            initialPaperId={tabQuery}
            onTabChange={navigateToTab}
          />
        )}

        {currentTab === 'research-gap' && (
          <ResearchGapView onTabChange={navigateToTab} />
        )}

        {currentTab === 'novelty' && (
          <NoveltyMatrixView onTabChange={navigateToTab} />
        )}

        {currentTab === 'fyp-advisor' && (
          <FypAdvisorView onTabChange={navigateToTab} />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapView onTabChange={navigateToTab} />
        )}

        {currentTab === 'literature' && (
          <LiteratureWorkspaceView
            onTabChange={navigateToTab}
            savedResearchIds={savedResearchIds}
          />
        )}

        {currentTab === 'compare' && (
          <PaperComparisonView onTabChange={navigateToTab} />
        )}

        {currentTab === 'datasets' && (
          <DatasetFinderView onTabChange={navigateToTab} />
        )}

        {currentTab === 'researchers' && (
          <ResearchersView onTabChange={navigateToTab} />
        )}

        {currentTab === 'knowledge-graph' && (
          <KnowledgeGraphView onTabChange={navigateToTab} />
        )}

        {currentTab === 'proposal-builder' && (
          <ProposalBuilderView onTabChange={navigateToTab} />
        )}

        {currentTab === 'citation-assistant' && (
          <CitationAssistantView />
        )}

        {currentTab === 'chat' && (
          <ChatView />
        )}

        {currentTab === 'integrity' && (
          <IntegrityView />
        )}

        {currentTab === 'admin' && (
          <AdminView />
        )}
      </main>

      {/* Academic Institutional Footer */}
      <Footer onTabChange={navigateToTab} />

      {/* Mobile Sticky Bottom Navigation Bar (WCAG 2.2 Accessible) */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-2 px-4 flex items-center justify-around shadow-lg"
      >
        <button
          onClick={() => navigateToTab('landing')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
            currentTab === 'landing' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigateToTab('explore')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
            currentTab === 'explore' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Search</span>
        </button>

        <button
          onClick={() => navigateToTab('chat')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
            currentTab === 'chat' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>AI Chat</span>
        </button>

        <button
          onClick={() => navigateToTab('paper-analyzer')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
            currentTab === 'paper-analyzer' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Analyzer</span>
        </button>

        <button
          onClick={() => navigateToTab('dashboard')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
            currentTab === 'dashboard' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Workspace</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
