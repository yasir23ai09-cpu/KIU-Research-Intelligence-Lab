import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  SplitSquareVertical, 
  Milestone, 
  Database, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { SourceBadge } from '../components/SourceBadge';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
}

export const LandingView: React.FC<Props> = ({ onTabChange }) => {
  const [heroSearch, setHeroSearch] = useState('');

  const quickSearchQueries = [
    'AI-based crop disease detection',
    'Mountain climate change',
    'GLOF hazard segmentation',
    'Shina & Balti speech recognition',
    'Solar microgrid optimization'
  ];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onTabChange('explore', heroSearch);
    } else {
      onTabChange('explore');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/40">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-900/70 border border-emerald-500/40 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Karakoram International University Research Intelligence Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Research Smarter. Discover Better. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              Build the Future.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed">
            An AI-powered research intelligence platform helping students and researchers discover literature, analyze research gaps, compare methodologies, find datasets, and develop research directions from FYP to postgraduate research.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleHeroSubmit} className="max-w-2xl mx-auto mt-6">
            <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden border border-emerald-500/30 bg-slate-900/90 backdrop-blur-md">
              <Search className="w-5 h-5 text-emerald-400 absolute left-4" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search KIU & global scholarly literature (e.g. GLOF remote sensing, orchard disease, regional NLP)..."
                className="w-full py-4 pl-12 pr-32 text-sm bg-transparent text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Explore Queries:</span>
              {quickSearchQueries.map(q => (
                <button
                  type="button"
                  key={q}
                  onClick={() => onTabChange('explore', q)}
                  className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 border border-slate-700/80 transition-all cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </form>

          {/* Three Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <button
              onClick={() => onTabChange('explore')}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-emerald-600/25 flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Explore Research
            </button>
            <button
              onClick={() => onTabChange('chat')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Ask Research AI
            </button>
            <button
              onClick={() => onTabChange('paper-analyzer')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              Analyze a Paper
            </button>
          </div>

          {/* Verified Badges Bar */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-bold text-white font-mono">27</div>
              <div className="text-xs text-slate-400">Official KIU Departments</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-bold text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-slate-400">Evidence-Backed Citations</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-bold text-amber-400 font-mono">8 Dimensions</div>
              <div className="text-xs text-slate-400">Research Gap Taxonomy</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-bold text-sky-400 font-mono">FYP &rarr; PhD</div>
              <div className="text-xs text-slate-400">Continuous Roadmap</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RESEARCH JOURNEY: FYP -> MS/MPhil -> PhD -> Publication */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
            The Academic Progression Framework
          </h2>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            From Undergraduate FYP to High-Impact PhD Research
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            Every great scientific dissertation begins as an exploratory undergraduate thesis. KIU Research Intelligence Lab provides the structured bridge across all academic stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Stage 1 */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center mb-3">
              01
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
              Final Year Project (FYP)
            </h4>
            <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-2">
              Small-Scale Implementation & Baseline
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Local problem identification, regional field dataset acquisition (1k-3k samples), and deployment on mobile/edge hardware.
            </p>
            <div className="text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-900/60 p-2 rounded border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Deliverable:</span> Working prototype & defense report
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold text-xs flex items-center justify-center mb-3">
              02
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
              MS / MPhil Research
            </h4>
            <div className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-2">
              Methodology Expansion & Ablation
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Novel attention mechanism, statistical cross-validation, multiseasonal field evaluation, and systematic literature matrix.
            </p>
            <div className="text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-900/60 p-2 rounded border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Deliverable:</span> Scopus / IEEE journal publication
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold text-xs flex items-center justify-center mb-3">
              03
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
              Doctoral (PhD) Thesis
            </h4>
            <div className="text-xs font-medium text-purple-700 dark:text-purple-400 mb-2">
              Theoretical & Foundational Novelty
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Planetary or regional-scale longitudinal datasets, novel theoretical convergence proofs, and global scientific leadership.
            </p>
            <div className="text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-900/60 p-2 rounded border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Deliverable:</span> PhD Dissertation & Q1 Journal Series
            </div>
          </div>

          {/* Stage 4 */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center mb-3">
              04
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
              Societal & Policy Impact
            </h4>
            <div className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
              Deployment in Gilgit-Baltistan
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Real-world integration with regional disaster management authorities (GLOF warnings), local farmers, and linguistic archives.
            </p>
            <div className="text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-900/60 p-2 rounded border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Outcome:</span> Commercialization & Public Policy
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onTabChange('roadmap')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Launch Interactive FYP &rarr; PhD Roadmap Generator &rarr;
          </button>
        </div>
      </section>

      {/* 3. CORE INTELLIGENCE MODULES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
            Intelligence Modules
          </h2>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Designed for Rigorous Academic Workflows
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Semantic & Hybrid Search */}
          <div 
            onClick={() => onTabChange('explore')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
              Hybrid Research Search
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Combines keyword relevance, vector semantic similarity, and official KIU departmental metadata. Filter by year, open access, and verification status.
            </p>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline flex items-center gap-1">
              Explore Search Engine &rarr;
            </span>
          </div>

          {/* Card 2: Paper Decomposition Analyzer */}
          <div 
            onClick={() => onTabChange('paper-analyzer')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
              Paper Decomposition Analyzer
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Upload any PDF or thesis. The AI extracts 12 academic dimensions—problem, objectives, methodology, metrics, and limitations—without hallucinating missing data.
            </p>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-1">
              Upload & Analyze PDF &rarr;
            </span>
          </div>

          {/* Card 3: Research Gap Analyzer */}
          <div 
            onClick={() => onTabChange('research-gap')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <SplitSquareVertical className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
              8-Dimension Gap Analyzer
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Evaluates literature across Dataset, Geographic, Methodological, Evaluation, Deployment, Domain, Temporal, and Reproducibility gaps with source evidence.
            </p>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:underline flex items-center gap-1">
              Detect Potential Gaps &rarr;
            </span>
          </div>

          {/* Card 4: Semantic Novelty & Similarity Matrix */}
          <div 
            onClick={() => onTabChange('novelty')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
              Novelty & Similarity Analysis
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Compare your proposed FYP topic against indexed literature to identify similarities, potential novel angles, and methodology improvements before proposal defense.
            </p>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:underline flex items-center gap-1">
              Check Research Novelty &rarr;
            </span>
          </div>

          {/* Card 5: FYP Idea Advisor */}
          <div 
            onClick={() => onTabChange('fyp-advisor')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
              AI FYP Idea Advisor
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Enter your department, skills, and interests to receive 3 tailored, academically feasible project proposals complete with research questions and suggested datasets.
            </p>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline flex items-center gap-1">
              Generate FYP Directions &rarr;
            </span>
          </div>

          {/* Card 6: Verified Datasets & Knowledge Graph */}
          <div 
            onClick={() => onTabChange('datasets')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
              Dataset Discovery & Graph
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Curated access to Kaggle, UCI, Hugging Face, Copernicus satellite archives, and high-altitude field benchmarks for Northern Pakistan with verified licenses.
            </p>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:underline flex items-center gap-1">
              Find Research Datasets &rarr;
            </span>
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC INTEGRITY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white border border-emerald-800/40 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/80 text-emerald-300 border border-emerald-600/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Strict Academic Integrity & Anti-Hallucination Policy
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Evidence-Backed Science, Not Generative Hallucination
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every research gap, methodology comparison, and literature citation in this system is linked to verified indexed papers or official university portals. When literature is absent, the system explicitly states "Insufficient evidence found" rather than inventing papers, DOIs, or experimental outcomes.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onTabChange('integrity')}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Review Full Policy Guidelines
              </button>
              <button
                onClick={() => onTabChange('researchers')}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
              >
                View Verified Faculty Directory
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
