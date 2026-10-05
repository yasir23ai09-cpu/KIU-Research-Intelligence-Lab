import React, { useState, useEffect } from 'react';
import { ResearchItem, Department } from '../types';
import { 
  Search, 
  Filter, 
  Bookmark, 
  FileText, 
  ExternalLink, 
  X, 
  Check, 
  Share2, 
  BookMarked, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Tag, 
  Cpu, 
  Layers,
  Sparkles,
  Download
} from 'lucide-react';
import { SourceBadge } from '../components/SourceBadge';

interface Props {
  initialQuery?: string;
  savedResearchIds: string[];
  onToggleSave: (id: string) => void;
  onTabChange: (tab: string, query?: string) => void;
}

export const SearchExplorerView: React.FC<Props> = ({
  initialQuery = '',
  savedResearchIds,
  onToggleSave,
  onTabChange
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [departmentId, setDepartmentId] = useState('');
  const [researchType, setResearchType] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [openAccessOnly, setOpenAccessOnly] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  
  const [departments, setDepartments] = useState<Department[]>([]);
  const [results, setResults] = useState<(ResearchItem & { similarityScore: number })[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Detail Modal
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);

  useEffect(() => {
    fetchDepartments();
    executeSearch();
  }, []);

  useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const fetchDepartments = async () => {
    try {
      const res = await fetch('/api/departments');
      const data = await res.json();
      setDepartments(data.departments || []);
    } catch (e) {
      console.error(e);
    }
  };

  const executeSearch = async (overrideQuery?: string) => {
    try {
      setLoading(true);
      const q = overrideQuery !== undefined ? overrideQuery : query;
      const params = new URLSearchParams();
      if (q) params.set('query', q);
      if (departmentId) params.set('departmentId', departmentId);
      if (researchType) params.set('researchType', researchType);
      if (yearFilter) params.set('year', yearFilter);
      if (openAccessOnly) params.set('openAccessOnly', 'true');
      if (verificationStatus) params.set('verificationStatus', verificationStatus);

      const res = await fetch(`/api/research?${params.toString()}`);
      const data = await res.json();
      setResults(data.items || []);
      setTotalCount(data.totalCount || 0);
    } catch (e) {
      console.error('Error executing search:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const resetFilters = () => {
    setQuery('');
    setDepartmentId('');
    setResearchType('');
    setYearFilter('');
    setOpenAccessOnly(false);
    setVerificationStatus('');
    executeSearch('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Subheader */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            Hybrid Vector + Keyword Search
          </span>
          <span className="text-xs text-slate-500">
            {totalCount} indexed academic items
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Global & KIU Research Literature Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Search indexed research papers, theses, and FYPs from Karakoram International University and verified scholarly repositories (OpenAlex, Crossref, arXiv).
        </p>
      </div>

      {/* Search & Filter Bar */}
      <form onSubmit={handleFormSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords, methodologies, datasets, authors, or research questions..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>Search Literature</span>
          </button>
        </div>

        {/* Facet Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          {/* Department Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              KIU Department
            </label>
            <select
              value={departmentId}
              onChange={(e) => {
                setDepartmentId(e.target.value);
              }}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="">All 27 Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Research Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Research Type
            </label>
            <select
              value={researchType}
              onChange={(e) => setResearchType(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="">All Research Types</option>
              <option value="FYP">Final Year Project (FYP)</option>
              <option value="MS/MPhil Thesis">MS/MPhil Thesis</option>
              <option value="PhD Thesis">PhD Thesis</option>
              <option value="Journal Publication">Journal Publication</option>
              <option value="Conference Paper">Conference Paper</option>
              <option value="Dataset">Dataset / Benchmark</option>
            </select>
          </div>

          {/* Year Range */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Publication Year
            </label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="">Any Year</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2020">2020 & Earlier</option>
            </select>
          </div>

          {/* Verification Status */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Verification Status
            </label>
            <select
              value={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="">All Verification Badges</option>
              <option value="official_kiu">Official KIU Source</option>
              <option value="verified_research">Verified Scholarly Research</option>
              <option value="student_submitted">Student Submitted (FYP/Thesis)</option>
              <option value="open_scholarly">Open Scholarly Source</option>
            </select>
          </div>
        </div>

        {/* Toggles and Reset */}
        <div className="flex items-center justify-between pt-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={openAccessOnly}
              onChange={(e) => setOpenAccessOnly(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Open Access Papers Only
            </span>
          </label>

          <button
            type="button"
            onClick={resetFilters}
            className="text-slate-500 hover:text-rose-600 cursor-pointer font-medium"
          >
            Clear all filters
          </button>
        </div>
      </form>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-900 dark:text-white">{results.length}</span> research items
          {query && <span> for "<span className="text-emerald-600 dark:text-emerald-400">{query}</span>"</span>}
        </div>
        <div className="flex items-center gap-2">
          <span>Sort by:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Hybrid Relevance & Year</span>
        </div>
      </div>

      {/* Result Cards List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 animate-pulse space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-3">
          <Search className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            No research papers found
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try broader keywords, adjust your department selection, or clear some filters to view indexed literature.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((item) => {
            const isSaved = savedResearchIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-3 relative group"
              >
                {/* Badges Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <SourceBadge status={item.verificationStatus} officialBadge={item.officialSourceBadge} />
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {item.researchType}
                    </span>
                    {item.isOpenAccess && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        Open Access
                      </span>
                    )}
                  </div>

                  {/* Similarity Score & Bookmark */}
                  <div className="flex items-center gap-2">
                    {query && (
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        Match: {Math.round(item.similarityScore * 100)}%
                      </span>
                    )}
                    <button
                      onClick={() => onToggleSave(item.id)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        isSaved
                          ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/50 text-amber-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save research paper'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => setSelectedItem(item)}
                  className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer leading-snug"
                >
                  {item.title}
                </h3>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    <strong className="text-slate-700 dark:text-slate-300">Authors:</strong> {item.authors.join(', ')}
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-slate-700 dark:text-slate-300">Year:</strong> {item.year}
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-slate-700 dark:text-slate-300">Affiliation:</strong> {item.institution}
                  </span>
                  {item.departmentName && (
                    <>
                      <span>•</span>
                      <span>{item.departmentName}</span>
                    </>
                  )}
                </div>

                {/* Abstract Preview */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {item.abstract}
                </p>

                {/* Methodology & Dataset Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Methodology: </span>
                    <span className="text-slate-600 dark:text-slate-400 line-clamp-1">{item.methodology}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Dataset: </span>
                    <span className="text-slate-600 dark:text-slate-400 line-clamp-1">{item.dataset}</span>
                  </div>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {item.keywords.map((kw, i) => (
                    <span 
                      key={i}
                      onClick={() => {
                        setQuery(kw);
                        executeSearch(kw);
                      }}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 hover:text-emerald-800 cursor-pointer transition"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer"
                    >
                      View Full Analysis
                    </button>
                    <button
                      onClick={() => onTabChange('paper-analyzer', item.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium transition cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ask This Paper</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.doi && (
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                        DOI: {item.doi}
                      </span>
                    )}
                    {item.sourceUrl && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>Official Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FULL RESEARCH ITEM DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <SourceBadge status={selectedItem.verificationStatus} officialBadge={selectedItem.officialSourceBadge} />
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {selectedItem.researchType}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                    Year {selectedItem.year}
                  </span>
                </div>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight">
                  {selectedItem.title}
                </h2>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {selectedItem.authors.join(', ')} • {selectedItem.institution} • {selectedItem.departmentName || 'Computing'}
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Abstract */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Abstract</h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700/60">
                {selectedItem.abstract}
              </p>
            </div>

            {/* Granular Decomposition Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-semibold text-slate-900 dark:text-white">Methodology & Architecture:</div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedItem.methodology}</p>
                {selectedItem.modelsOrAlgorithms && (
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono mt-1">
                    Models: {selectedItem.modelsOrAlgorithms}
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-semibold text-slate-900 dark:text-white">Dataset & Experimental Corpus:</div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedItem.dataset}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-semibold text-slate-900 dark:text-white">Evaluation Metrics & Empirical Results:</div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedItem.evaluationMetrics ? `Metrics: ${selectedItem.evaluationMetrics}. ` : ''}
                  {selectedItem.results || 'Empirical validation demonstrated performance superiority.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-semibold text-amber-700 dark:text-amber-400">Author-Stated Limitations:</div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedItem.limitations || 'Not identified in provided metadata.'}
                </p>
                {selectedItem.futureWork && (
                  <div className="text-[11px] text-slate-500 mt-2">
                    <strong>Suggested Future Work:</strong> {selectedItem.futureWork}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const id = selectedItem.id;
                    setSelectedItem(null);
                    onTabChange('paper-analyzer', id);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Deep Paper Analyzer & Chat</span>
                </button>
                <button
                  onClick={() => onToggleSave(selectedItem.id)}
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  {savedResearchIds.includes(selectedItem.id) ? 'Saved in Workspace' : 'Save to Workspace'}
                </button>
              </div>

              {selectedItem.sourceUrl && (
                <a
                  href={selectedItem.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Primary Source URL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
