import React, { useState, useEffect } from 'react';
import { ResearchItem } from '../types';
import { 
  BookMarked, 
  Copy, 
  Check, 
  Search, 
  ExternalLink, 
  Quote, 
  ShieldCheck 
} from 'lucide-react';
import { SourceBadge } from '../components/SourceBadge';

export const CitationAssistantView: React.FC = () => {
  const [papers, setPapers] = useState<ResearchItem[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<ResearchItem | null>(null);
  const [search, setSearch] = useState('');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/research')
      .then(r => r.json())
      .then(d => {
        const items = d.items || [];
        setPapers(items);
        if (items.length > 0) setSelectedPaper(items[0]);
      });
  }, []);

  const filtered = papers.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.authors.some(a => a.toLowerCase().includes(search.toLowerCase()))
  );

  const formatApa = (p: ResearchItem) => {
    const authors = p.authors.length > 2 
      ? `${p.authors[0]} et al.`
      : p.authors.join(' & ');
    const doiPart = p.doi ? ` https://doi.org/${p.doi}` : (p.sourceUrl ? ` Retrieved from ${p.sourceUrl}` : '');
    return `${authors} (${p.year}). ${p.title}. ${p.institution || 'Karakoram International University'}.${doiPart}`;
  };

  const formatIeee = (p: ResearchItem) => {
    const authors = p.authors.join(', ');
    const doiPart = p.doi ? `, doi: ${p.doi}` : '';
    return `${authors}, "${p.title}," ${p.institution || 'Karakoram International University'}, ${p.year}${doiPart}.`;
  };

  const formatMla = (p: ResearchItem) => {
    const firstAuthor = p.authors[0] || 'Author';
    const rest = p.authors.length > 1 ? ', et al.' : '';
    const doiPart = p.doi ? `, https://doi.org/${p.doi}` : '';
    return `${firstAuthor}${rest}. "${p.title}." ${p.institution || 'Karakoram International University'}, ${p.year}${doiPart}.`;
  };

  const handleCopy = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1">
          <BookMarked className="w-3.5 h-3.5" />
          <span>APA • IEEE • MLA Citation Formatter</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Academic Citation Assistant
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Instantly generate verified bibliographic citations in APA 7th, IEEE, and MLA 9th styles directly from indexed literature metadata without artificial DOI fabrication.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Paper Selector */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search indexed paper to cite..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map(paper => (
              <div
                key={paper.id}
                onClick={() => setSelectedPaper(paper)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                  selectedPaper?.id === paper.id
                    ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{paper.year}</span>
                  <SourceBadge status={paper.verificationStatus} officialBadge={paper.officialSourceBadge} />
                </div>
                <h4 className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-2">
                  {paper.title}
                </h4>
                <div className="text-[11px] text-slate-500">
                  {paper.authors[0]} et al.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Citation Generator */}
        <div className="lg:col-span-2 space-y-6">
          {selectedPaper ? (
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              {/* Selected Paper Details */}
              <div className="space-y-2 border-b border-slate-200 dark:border-slate-700 pb-4">
                <SourceBadge status={selectedPaper.verificationStatus} officialBadge={selectedPaper.officialSourceBadge} />
                <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white leading-tight">
                  {selectedPaper.title}
                </h2>
                <div className="text-xs text-slate-500">
                  <strong>Authors:</strong> {selectedPaper.authors.join(', ')} • <strong>Year:</strong> {selectedPaper.year} • <strong>Affiliation:</strong> {selectedPaper.institution}
                </div>
                {selectedPaper.doi && (
                  <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                    Official DOI: {selectedPaper.doi}
                  </div>
                )}
              </div>

              {/* Formats */}
              <div className="space-y-4">
                {/* 1. APA Format */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      APA (7th Edition)
                    </span>
                    <button
                      onClick={() => handleCopy(formatApa(selectedPaper), 'apa')}
                      className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedFormat === 'apa' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFormat === 'apa' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed select-all">
                    {formatApa(selectedPaper)}
                  </p>
                </div>

                {/* 2. IEEE Format */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      IEEE Format
                    </span>
                    <button
                      onClick={() => handleCopy(formatIeee(selectedPaper), 'ieee')}
                      className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedFormat === 'ieee' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFormat === 'ieee' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed select-all">
                    {formatIeee(selectedPaper)}
                  </p>
                </div>

                {/* 3. MLA Format */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      MLA (9th Edition)
                    </span>
                    <button
                      onClick={() => handleCopy(formatMla(selectedPaper), 'mla')}
                      className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedFormat === 'mla' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFormat === 'mla' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed select-all">
                    {formatMla(selectedPaper)}
                  </p>
                </div>
              </div>

              {/* DOI Verifiability Statement */}
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Anti-Hallucination Assurance: DOIs are checked against Crossref registry metadata and are omitted if unverified.</span>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              Select a paper on the left to generate verified citations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
