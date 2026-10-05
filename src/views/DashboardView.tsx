import React, { useState, useEffect } from 'react';
import { User, ResearchItem, ResearchProject } from '../types';
import { 
  Bookmark, 
  FolderKanban, 
  FileText, 
  Sparkles, 
  Search, 
  SplitSquareVertical, 
  Database, 
  GraduationCap, 
  Milestone, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Layers,
  BookOpen
} from 'lucide-react';
import { SourceBadge } from '../components/SourceBadge';

interface Props {
  currentUser: User | null;
  onTabChange: (tab: string, query?: string) => void;
  savedResearchIds: string[];
  onToggleSave: (id: string) => void;
}

export const DashboardView: React.FC<Props> = ({
  currentUser,
  onTabChange,
  savedResearchIds,
  onToggleSave
}) => {
  const [savedPapers, setSavedPapers] = useState<ResearchItem[]>([]);
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [savedResearchIds]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [resPapers, resProjects] = await Promise.all([
        fetch('/api/research').then(r => r.json()),
        fetch('/api/literature/projects').then(r => r.json())
      ]);

      const allItems: ResearchItem[] = resPapers.items || [];
      const saved = allItems.filter(p => savedResearchIds.includes(p.id));
      setSavedPapers(saved);
      setProjects(resProjects.projects || []);
    } catch (e) {
      console.error('Error fetching dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: 'Search Research', icon: Search, tab: 'explore', color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/70 dark:text-emerald-300' },
    { label: 'Upload Paper / PDF', icon: Plus, tab: 'paper-analyzer', color: 'text-blue-700 bg-blue-50 dark:bg-blue-950/70 dark:text-blue-300' },
    { label: 'Ask Research AI', icon: Sparkles, tab: 'chat', color: 'text-purple-700 bg-purple-50 dark:bg-purple-950/70 dark:text-purple-300' },
    { label: 'Analyze Paper', icon: FileText, tab: 'paper-analyzer', color: 'text-amber-700 bg-amber-50 dark:bg-amber-950/70 dark:text-amber-300' },
    { label: 'Find Research Gap', icon: SplitSquareVertical, tab: 'research-gap', color: 'text-rose-700 bg-rose-50 dark:bg-rose-950/70 dark:text-rose-300' },
    { label: 'Find Dataset', icon: Database, tab: 'datasets', color: 'text-teal-700 bg-teal-50 dark:bg-teal-950/70 dark:text-teal-300' },
    { label: 'Compare Papers', icon: Layers, tab: 'compare', color: 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/70 dark:text-indigo-300' },
    { label: 'Generate FYP Direction', icon: GraduationCap, tab: 'fyp-advisor', color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/70 dark:text-emerald-300' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-md border border-emerald-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-800/80 text-emerald-200 border border-emerald-600/40 mb-2 capitalize">
            Role: {currentUser?.role || 'Student'}
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Welcome back, {currentUser?.name || 'Academic Scholar'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {currentUser?.departmentName || 'Department of Computer Science'} • Karakoram International University
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onTabChange('roadmap')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Milestone className="w-3.5 h-3.5" />
            <span>View FYP &rarr; PhD Roadmap</span>
          </button>
        </div>
      </div>

      {/* Quick Action Matrix */}
      <div>
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
          Quick Research Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                onClick={() => onTabChange(action.tab)}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow transition-all flex flex-col items-center text-center gap-2 cursor-pointer group"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${action.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Key Metric Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white font-mono">
              {savedPapers.length}
            </div>
            <div className="text-xs text-slate-500">Saved Papers</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 flex items-center justify-center">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white font-mono">
              {projects.length}
            </div>
            <div className="text-xs text-slate-500">Active Projects</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center">
            <SplitSquareVertical className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white font-mono">
              3
            </div>
            <div className="text-xs text-slate-500">Identified Gaps</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white font-mono">
              100%
            </div>
            <div className="text-xs text-slate-500">Integrity Verified</div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Research Projects & Saved Papers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Research Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-emerald-600" />
              <span>My Research Workspace & Projects</span>
            </h2>
            <button
              onClick={() => onTabChange('literature')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Open Literature Matrix &rarr;
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No active research projects yet
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Create a literature review workspace to organize your research problem, notes, and research questions.
              </p>
              <button
                onClick={() => onTabChange('literature')}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition cursor-pointer"
              >
                Create First Project
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map(proj => (
                <div 
                  key={proj.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1">
                        Status: {proj.status}
                      </span>
                      <h3 className="font-semibold text-base text-slate-900 dark:text-white leading-tight">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Area: {proj.researchArea}
                      </p>
                    </div>

                    <button
                      onClick={() => onTabChange('literature')}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-600 dark:text-slate-300 hover:text-emerald-700 cursor-pointer transition"
                      title="Open in Literature Workspace"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proj.problem}
                  </p>

                  {/* Research Objectives tags */}
                  {proj.objectives && proj.objectives.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                      <div className="text-[11px] font-semibold text-slate-400 mb-1">Key Objectives:</div>
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                        {proj.objectives.slice(0, 2).map((obj, i) => (
                          <li key={i} className="truncate">{obj}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                    <span>Notes recorded: {proj.notes?.length || 0}</span>
                    <span>Updated: {proj.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Saved Literature */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" />
              <span>Saved Literature ({savedPapers.length})</span>
            </h2>
            <button
              onClick={() => onTabChange('explore')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Browse More &rarr;
            </button>
          </div>

          {savedPapers.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-2">
              <p className="text-xs text-slate-500">
                You haven't bookmarked any research papers yet.
              </p>
              <button
                onClick={() => onTabChange('explore')}
                className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
              >
                Search Research Papers &rarr;
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {savedPapers.map(paper => (
                <div 
                  key={paper.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-500 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <SourceBadge status={paper.verificationStatus} officialBadge={paper.officialSourceBadge} />
                    <button
                      onClick={() => onToggleSave(paper.id)}
                      className="text-amber-500 hover:text-slate-400 text-xs cursor-pointer"
                      title="Remove bookmark"
                    >
                      <Bookmark className="w-4 h-4 fill-amber-500" />
                    </button>
                  </div>

                  <h4 
                    onClick={() => onTabChange('explore', paper.title)}
                    className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer line-clamp-2"
                  >
                    {paper.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{paper.authors[0]} et al. • {paper.year}</span>
                    <button
                      onClick={() => onTabChange('paper-analyzer', paper.id)}
                      className="text-emerald-600 font-semibold hover:underline cursor-pointer"
                    >
                      Analyze &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
