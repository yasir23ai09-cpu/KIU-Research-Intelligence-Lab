import React, { useState } from 'react';
import { NoveltyAnalysis } from '../types';
import { 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight, 
  Clock, 
  Cpu, 
  Compass,
  FileCheck
} from 'lucide-react';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
}

export const NoveltyMatrixView: React.FC<Props> = ({ onTabChange }) => {
  const [proposedIdea, setProposedIdea] = useState('AI-based Mango & High-Altitude Orchard Disease Detection using Mobile Camera in Gilgit-Baltistan');
  const [department, setDepartment] = useState('Department of Computer Science');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<NoveltyAnalysis | null>(null);

  const sampleIdeas = [
    'AI-based Orchard Foliar Disease Detection using Mobile Camera in Gilgit-Baltistan',
    'Real-time Satellite Sentinel-1 SAR Coherence for Glacial Lake Outburst Early Warning',
    'Self-Supervised Speech-to-Text for Low-Resource Shina Dialects of Northern Pakistan',
    'Micro-Hydro and Solar PV Hybrid Microgrid Optimization for Off-Grid Remote Villages'
  ];

  const handleAnalyze = async (ideaOverride?: string) => {
    const text = ideaOverride || proposedIdea;
    if (!text.trim()) return;

    setAnalyzing(true);
    try {
      const res = await fetch('/api/ai/novelty-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposedIdea: text,
          department
        })
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (e) {
      console.error('Error running novelty analysis:', e);
    } finally {
      setAnalyzing(false);
    }
  };

  React.useEffect(() => {
    handleAnalyze();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Multivariate Similarity & Novel Angle Decomposition</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Semantic Research Similarity & Novelty Analysis
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Compare your proposed FYP, MS, or PhD research topic against indexed literature to isolate similar prior studies, identify genuine potential novel angles, and prevent redundant thesis submissions.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Proposed Research Title or Problem Statement:
            </label>
            <input
              type="text"
              value={proposedIdea}
              onChange={(e) => setProposedIdea(e.target.value)}
              placeholder="e.g. AI-based Mango Disease Detection using Mobile Camera..."
              className="w-full py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Department:
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full py-3 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Department of Computer Science">Department of Computer Science</option>
              <option value="Department of Geology and Mountain Hazards">Department of Geology and Mountain Hazards</option>
              <option value="Department of Environmental Sciences">Department of Environmental Sciences</option>
              <option value="Department of Electrical Engineering">Department of Electrical Engineering</option>
              <option value="Department of Agriculture and Food Technology">Department of Agriculture and Food Technology</option>
              <option value="Department of Urdu and Regional Languages">Department of Urdu and Regional Languages</option>
            </select>
          </div>
        </div>

        {/* Preset sample topics */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Try Preset Ideas:</span>
          {sampleIdeas.map((idea, i) => (
            <button
              key={i}
              onClick={() => {
                setProposedIdea(idea);
                handleAnalyze(idea);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 hover:bg-purple-100 hover:text-purple-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            >
              {idea.slice(0, 38)}...
            </button>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => handleAnalyze()}
            disabled={analyzing}
            className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            {analyzing ? <Clock className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>Run Semantic Novelty Analysis</span>
          </button>
        </div>
      </div>

      {/* Mandatory Disclaimer from Section 23 */}
      <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Academic Scope Notice: </span>
          This is a Semantic Research Similarity & Novelty Analysis based on currently indexed literature. It is not an official automated plagiarism check and requires formal review by your academic supervisor and DASR thesis committee.
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysis && (
        <div className="space-y-8 animate-fade-in">
          {/* Top Score & Domain Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {analysis.problemDomain}
              </span>
              <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white leading-snug">
                Analysis for: "{analysis.proposedTitle}"
              </h2>
              <p className="text-xs text-slate-500">
                Evaluated against indexed literature across 10 dimensions: problem domain, dataset, region, classes, model architecture, input modalities, deployment environment, and evaluation metrics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-center shrink-0 min-w-[160px]">
              <div className="text-3xl font-bold font-mono text-purple-700 dark:text-purple-400">
                {analysis.noveltyScore}%
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                Estimated Novelty Potential
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Subject to literature validation
              </div>
            </div>
          </div>

          {/* Similar Existing Research Table */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Similar Existing Research in Literature</span>
            </h3>

            <div className="space-y-3">
              {analysis.similarExistingResearch.map((sim, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {sim.title}
                    </h4>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      Similarity: {sim.similarityScore}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <div className="font-semibold text-slate-600 dark:text-slate-400 text-[11px] mb-1">
                        Shared Aspects / Overlap:
                      </div>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5">
                        {sim.sharedAspects.map((sh, sIdx) => (
                          <li key={sIdx}>{sh}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="font-semibold text-emerald-700 dark:text-emerald-400 text-[11px] mb-1">
                        Distinct Differences / Gaps:
                      </div>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5">
                        {sim.differences.map((diff, dIdx) => (
                          <li key={dIdx}>{diff}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Three-Column Breakdown: Contributions, Risks, Recommended Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Novel Contributions */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-semibold text-sm">Potential Novel Contributions</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {analysis.potentialNovelContributions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 bg-emerald-50/50 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks & Pitfalls */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-semibold text-sm">Methodological Risks & Pitfalls</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {analysis.risksAndPitfalls.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 bg-rose-50/50 dark:bg-rose-950/30 p-2.5 rounded-lg border border-rose-100 dark:border-rose-900/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Improvements */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <Lightbulb className="w-5 h-5" />
                <h3 className="font-semibold text-sm">Recommended Improvements</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {analysis.recommendedImprovements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2 bg-amber-50/50 dark:bg-amber-950/30 p-2.5 rounded-lg border border-amber-100 dark:border-amber-900/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-600 dark:text-slate-300">
              Ready to construct an official proposal draft with these novel contributions?
            </span>
            <button
              onClick={() => onTabChange('proposal-builder')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Build 13-Section Research Proposal Draft</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
