import React, { useState, useEffect } from 'react';
import { DatasetItem } from '../types';
import { 
  Database, 
  Search, 
  ExternalLink, 
  Download, 
  Tag, 
  CheckCircle2, 
  ShieldCheck, 
  Filter, 
  FileText,
  Copy,
  Check
} from 'lucide-react';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
}

export const DatasetFinderView: React.FC<Props> = ({ onTabChange }) => {
  const [datasets, setDatasets] = useState<DatasetItem[]>([]);
  const [query, setQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchDatasets();
  }, [query, domainFilter, sourceFilter]);

  const fetchDatasets = async () => {
    try {
      const params = new URLSearchParams();
      if (query) params.set('query', query);
      if (domainFilter) params.set('domain', domainFilter);
      if (sourceFilter) params.set('source', sourceFilter);

      const res = await fetch(`/api/datasets?${params.toString()}`);
      const data = await res.json();
      setDatasets(data.datasets || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyCitation = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 mb-1">
          <Database className="w-3.5 h-3.5" />
          <span>Open Scholarly & Regional Benchmark Discovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Academic Dataset Discovery Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Discover verified open-source datasets across Kaggle, UCI, Hugging Face, OpenML, and Karakoram International University regional field repositories with explicit license auditing.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search datasets by name, domain, format, or sensor type..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="">All Sources</option>
              <option value="KIU / Regional Repository">KIU Regional Repositories</option>
              <option value="Kaggle">Kaggle</option>
              <option value="Hugging Face">Hugging Face</option>
              <option value="Government Portal">Government / ESA Satellite</option>
            </select>
          </div>
        </div>
      </div>

      {/* Datasets Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {datasets.map((ds) => (
          <div
            key={ds.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  ds.source === 'KIU / Regional Repository'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {ds.source}
                </span>

                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                  {ds.size}
                </span>
              </div>

              <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                {ds.name}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {ds.description}
              </p>

              {/* Format & License */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block text-[11px]">Format:</span>
                  <span className="text-slate-600 dark:text-slate-400 truncate block">{ds.format}</span>
                </div>
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block text-[11px]">License:</span>
                  <span className="text-slate-600 dark:text-slate-400 truncate block">{ds.license}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ds.tags.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              {ds.citation && (
                <button
                  onClick={() => handleCopyCitation(ds.citation!, ds.id)}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 cursor-pointer font-medium"
                >
                  {copiedId === ds.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === ds.id ? 'Citation Copied' : 'Copy Citation'}</span>
                </button>
              )}

              <a
                href={ds.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition flex items-center gap-1.5"
              >
                <span>Access Dataset</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
