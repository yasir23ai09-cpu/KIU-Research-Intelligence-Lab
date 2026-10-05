import React, { useState } from 'react';
import { ResearchGap } from '../types';
import { 
  SplitSquareVertical, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Layers, 
  Database, 
  Globe, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
}

export const ResearchGapView: React.FC<Props> = ({ onTabChange }) => {
  const [topic, setTopic] = useState('Deep transfer learning for orchard disease detection in high-altitude Gilgit-Baltistan');
  const [analyzing, setAnalyzing] = useState(false);
  const [gaps, setGaps] = useState<ResearchGap[]>([]);
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [selectedGap, setSelectedGap] = useState<ResearchGap | null>(null);

  const sampleTopics = [
    'Deep learning for high-altitude orchard leaf disease in Pakistan',
    'Satellite remote sensing & GLOF early warning in Karakoram',
    'Low-resource speech recognition for Shina & Balti languages',
    'Standalone hybrid solar microgrids in Northern alpine valleys'
  ];

  const handleAnalyze = async (topicToAnalyze?: string) => {
    const t = topicToAnalyze || topic;
    if (!t.trim()) return;

    setAnalyzing(true);
    try {
      const res = await fetch('/api/ai/research-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: t })
      });
      const data = await res.json();
      setGaps(data.gaps || []);
      setDisclaimer(data.disclaimer || 'Based on the indexed literature available to this system, these appear to be potential research opportunities.');
      if (data.gaps && data.gaps.length > 0) {
        setSelectedGap(data.gaps[0]);
      }
    } catch (e) {
      console.error('Error analyzing research gaps:', e);
    } finally {
      setAnalyzing(false);
    }
  };

  // Initial trigger if not analyzed
  React.useEffect(() => {
    handleAnalyze();
  }, []);

  const dimensions = [
    { name: 'Dataset Gap', icon: Database, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300' },
    { name: 'Geographic Gap', icon: Globe, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300' },
    { name: 'Methodological Gap', icon: Layers, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-300' },
    { name: 'Evaluation Gap', icon: CheckCircle2, color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-300' },
    { name: 'Deployment Gap', icon: Cpu, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300' },
    { name: 'Domain Gap', icon: Globe, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300' },
    { name: 'Temporal Gap', icon: Clock, color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/60 dark:text-teal-300' },
    { name: 'Reproducibility Gap', icon: AlertCircle, color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/60 dark:text-orange-300' },
  ];

  // Research Gap Heatmap Data Simulation
  const heatmapRows = [
    'Orchard Pathology Vision',
    'Cryosphere GLOF Hazards',
    'Shina / Balti Language Tech',
    'Alpine Solar Microgrids',
    'High-Altitude Telemedicine'
  ];

  const heatmapCols = [
    'Dataset Availability',
    'Modern Methodologies',
    'Mountain Geographic Context',
    'Edge Deployment',
    'Evaluation Benchmarking'
  ];

  const heatmapData: Record<string, 'High' | 'Moderate' | 'Low' | 'Opportunity'> = {
    'Orchard Pathology Vision-Dataset Availability': 'Opportunity',
    'Orchard Pathology Vision-Modern Methodologies': 'Moderate',
    'Orchard Pathology Vision-Mountain Geographic Context': 'Low',
    'Orchard Pathology Vision-Edge Deployment': 'Opportunity',
    'Orchard Pathology Vision-Evaluation Benchmarking': 'Moderate',

    'Cryosphere GLOF Hazards-Dataset Availability': 'Moderate',
    'Cryosphere GLOF Hazards-Modern Methodologies': 'High',
    'Cryosphere GLOF Hazards-Mountain Geographic Context': 'High',
    'Cryosphere GLOF Hazards-Edge Deployment': 'Opportunity',
    'Cryosphere GLOF Hazards-Evaluation Benchmarking': 'Low',

    'Shina / Balti Language Tech-Dataset Availability': 'Low',
    'Shina / Balti Language Tech-Modern Methodologies': 'Low',
    'Shina / Balti Language Tech-Mountain Geographic Context': 'Opportunity',
    'Shina / Balti Language Tech-Edge Deployment': 'Low',
    'Shina / Balti Language Tech-Evaluation Benchmarking': 'Opportunity',

    'Alpine Solar Microgrids-Dataset Availability': 'Moderate',
    'Alpine Solar Microgrids-Modern Methodologies': 'High',
    'Alpine Solar Microgrids-Mountain Geographic Context': 'Moderate',
    'Alpine Solar Microgrids-Edge Deployment': 'High',
    'Alpine Solar Microgrids-Evaluation Benchmarking': 'High',

    'High-Altitude Telemedicine-Dataset Availability': 'Opportunity',
    'High-Altitude Telemedicine-Modern Methodologies': 'Low',
    'High-Altitude Telemedicine-Mountain Geographic Context': 'Opportunity',
    'High-Altitude Telemedicine-Edge Deployment': 'Opportunity',
    'High-Altitude Telemedicine-Evaluation Benchmarking': 'Low',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 mb-1">
          <SplitSquareVertical className="w-3.5 h-3.5" />
          <span>8-Dimensional Scholarly Opportunity Detection</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Research Gap & Opportunity Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Analyzes indexed literature across 8 dimensions (Dataset, Geographic, Methodological, Evaluation, Deployment, Domain, Temporal, Reproducibility) to discover empirical research opportunities with verifiable citations.
        </p>
      </div>

      {/* Topic Query Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Enter Research Topic or Proposed Direction:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Deep learning for mango leaf disease detection in Pakistan..."
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleAnalyze()}
            disabled={analyzing}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {analyzing ? <Clock className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>Analyze Literature Gaps</span>
          </button>
        </div>

        {/* Preset topics */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Try Topics:</span>
          {sampleTopics.map((st, i) => (
            <button
              key={i}
              onClick={() => {
                setTopic(st);
                handleAnalyze(st);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            >
              {st.slice(0, 40)}...
            </button>
          ))}
        </div>
      </div>

      {/* Mandatory Academic Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Academic Integrity Mandate: </span>
          {disclaimer || "Based on the indexed literature available to this system, these appear to be potential research opportunities. All AI-generated research opportunities require validation through systematic literature review and supervisor consultation."}
        </div>
      </div>

      {/* Gaps Display Layout */}
      {gaps.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Identified Opportunities */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Identified Research Opportunities ({gaps.length})</span>
            </h2>

            <div className="space-y-4">
              {gaps.map((gap) => (
                <div
                  key={gap.id}
                  onClick={() => setSelectedGap(gap)}
                  className={`p-6 rounded-2xl bg-white dark:bg-slate-800 border transition-all cursor-pointer space-y-3 ${
                    selectedGap?.id === gap.id
                      ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {gap.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      gap.confidence === 'High evidence'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300'
                    }`}>
                      Confidence: {gap.confidence}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                    {gap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {gap.opportunity}
                  </p>

                  {/* Supporting Evidence List */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                      <span>Supporting Evidence ({gap.evidence.length} points):</span>
                      <span className="text-slate-500">Type: {gap.evidenceType}</span>
                    </div>
                    {gap.evidence.map((ev, i) => (
                      <div key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>

                  {/* Next steps */}
                  {gap.suggestedNextSteps && gap.suggestedNextSteps.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                      <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                        Suggested Next Methodological Steps:
                      </div>
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                        {gap.suggestedNextSteps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTabChange('novelty');
                      }}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Check Novelty of this Opportunity</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: 8 Dimensions Taxonomy Guide */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                8-Dimension Research Taxonomy
              </h3>
              <p className="text-xs text-slate-500">
                Academic gaps in literature occur across diverse scientific dimensions.
              </p>

              <div className="space-y-2">
                {dimensions.map((dim, i) => {
                  const Icon = dim.icon;
                  return (
                    <div key={i} className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${dim.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
                        {dim.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESEARCH GAP HEATMAP MATRIX */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
            Research Gap Activity Heatmap Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Visualizing literature density across research topics and dimensions. Low activity or potential opportunity indicates fertile academic ground for FYPs, MS theses, and PhD dissertations.
          </p>
        </div>

        {/* Heatmap Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
            <span className="text-slate-600 dark:text-slate-300">High Activity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-blue-400"></span>
            <span className="text-slate-600 dark:text-slate-300">Moderate Activity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-slate-300 dark:bg-slate-600"></span>
            <span className="text-slate-600 dark:text-slate-300">Low Activity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-400"></span>
            <span className="text-amber-800 dark:text-amber-300 font-semibold">Potential Opportunity</span>
          </div>
        </div>

        {/* Heatmap Grid Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                  Topic / Domain
                </th>
                {heatmapCols.map((col, i) => (
                  <th key={i} className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300 text-center">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapRows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-slate-100 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                    {row}
                  </td>
                  {heatmapCols.map((col, cIdx) => {
                    const status = heatmapData[`${row}-${col}`] || 'Moderate';
                    let cellClass = 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
                    if (status === 'High') cellClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold';
                    if (status === 'Moderate') cellClass = 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
                    if (status === 'Opportunity') cellClass = 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-700 animate-pulse';

                    return (
                      <td key={cIdx} className="py-2 px-3 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] ${cellClass}`}>
                          {status}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
