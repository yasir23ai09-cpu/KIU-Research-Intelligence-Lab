import React, { useState, useEffect } from 'react';
import { ResearchItem } from '../types';
import { 
  SplitSquareVertical, 
  Check, 
  X, 
  Database, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SourceBadge } from '../components/SourceBadge';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
}

export const PaperComparisonView: React.FC<Props> = ({ onTabChange }) => {
  const [allPapers, setAllPapers] = useState<ResearchItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparedPapers, setComparedPapers] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const res = await fetch('/api/research');
      const data = await res.json();
      const items: ResearchItem[] = data.items || [];
      setAllPapers(items);
      // Select first two items by default
      if (items.length >= 2) {
        setSelectedIds([items[0].id, items[1].id]);
        setComparedPapers([items[0], items[1]]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleSelect = (id: string) => {
    let next: string[];
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 1) return; // Keep at least one
      next = selectedIds.filter(x => x !== id);
    } else {
      if (selectedIds.length >= 4) {
        alert('You can compare a maximum of 4 research papers side-by-side.');
        return;
      }
      next = [...selectedIds, id];
    }
    setSelectedIds(next);
    setComparedPapers(allPapers.filter(p => next.includes(p.id)));
  };

  const comparisonAttributes = [
    { label: 'Authors & Year', key: 'authorsYear', render: (p: ResearchItem) => `${p.authors.join(', ')} (${p.year})` },
    { label: 'Research Type & Affiliation', key: 'type', render: (p: ResearchItem) => `${p.researchType} • ${p.institution}` },
    { label: 'Methodology & Approach', key: 'methodology', render: (p: ResearchItem) => p.methodology },
    { label: 'Models & Architectures', key: 'models', render: (p: ResearchItem) => p.modelsOrAlgorithms || 'Standard Convolutional Backbone' },
    { label: 'Experimental Dataset', key: 'dataset', render: (p: ResearchItem) => p.dataset },
    { label: 'Evaluation Metrics', key: 'metrics', render: (p: ResearchItem) => p.evaluationMetrics || 'Top-1 Accuracy, F1-Score' },
    { label: 'Empirical Results', key: 'results', render: (p: ResearchItem) => p.results || 'Demonstrated superiority on test split' },
    { label: 'Author-Stated Limitations', key: 'limitations', render: (p: ResearchItem) => <span className="text-amber-800 dark:text-amber-300 font-medium">{p.limitations || 'Underrepresented seasonal data voids'}</span> },
    { label: 'Recommended Future Work', key: 'futureWork', render: (p: ResearchItem) => p.futureWork || 'Integration of real-time multi-sensor telemetry' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 mb-1">
          <SplitSquareVertical className="w-3.5 h-3.5" />
          <span>Multi-Paper Systematic Comparative Synthesis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Side-by-Side Research Comparison Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Compare 2 to 4 indexed academic papers across methodology, models, dataset benchmarks, evaluation metrics, limitations, and future directions.
        </p>
      </div>

      {/* Paper Selection Chips */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Select Papers to Compare ({selectedIds.length} / 4 selected):
          </span>
          <span className="text-slate-400">Click to toggle paper in comparison table</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {allPapers.map((paper) => {
            const isSelected = selectedIds.includes(paper.id);
            return (
              <button
                key={paper.id}
                onClick={() => toggleSelect(paper.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                  isSelected ? 'bg-emerald-600 text-white' : 'border border-slate-400'
                }`}>
                  {isSelected && <Check className="w-2.5 h-2.5" />}
                </span>
                <span className="truncate max-w-[280px]">
                  [{paper.year}] {paper.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* COMPARATIVE MATRIX TABLE */}
      {comparedPapers.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-4 px-4 font-semibold text-slate-400 uppercase tracking-wider w-48 text-[11px]">
                    Attribute
                  </th>
                  {comparedPapers.map((paper) => (
                    <th key={paper.id} className="py-4 px-4 font-serif font-bold text-slate-900 dark:text-white text-sm max-w-xs align-top">
                      <div className="space-y-1">
                        <SourceBadge status={paper.verificationStatus} officialBadge={paper.officialSourceBadge} />
                        <div className="line-clamp-2">{paper.title}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {comparisonAttributes.map((attr, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/30">
                      {attr.label}
                    </td>
                    {comparedPapers.map((paper) => (
                      <td key={paper.id} className="py-3.5 px-4 text-slate-600 dark:text-slate-300 leading-relaxed align-top">
                        {attr.render(paper)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
