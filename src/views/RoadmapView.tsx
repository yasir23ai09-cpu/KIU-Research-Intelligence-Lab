import React, { useState } from 'react';
import { ResearchRoadmapStage } from '../types';
import { 
  Milestone, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Layers, 
  Database, 
  Cpu
} from 'lucide-react';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
}

export const RoadmapView: React.FC<Props> = ({ onTabChange }) => {
  const [topic, setTopic] = useState('Deep Learning for Mountain Orchard Pathology and Frost Risk Prediction');
  const [department, setDepartment] = useState('Department of Computer Science');
  const [loading, setLoading] = useState(false);
  const [stages, setStages] = useState<ResearchRoadmapStage[]>([]);

  const sampleTopics = [
    'Deep Learning for Mountain Orchard Pathology',
    'Satellite Remote Sensing for GLOF Risk Mapping in Karakoram',
    'Cross-Lingual Acoustic Modeling for Shina and Balti Dialects',
    'Hybrid Micro-Hydro and Bifacial Solar Microgrid Optimization'
  ];

  const handleGenerate = async (tOverride?: string) => {
    const t = tOverride || topic;
    if (!t.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: t, department })
      });
      const data = await res.json();
      setStages(data.stages || []);
    } catch (e) {
      console.error('Error generating roadmap:', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 mb-1">
          <Milestone className="w-3.5 h-3.5" />
          <span>Long-Term Academic Career & Thesis Progression</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          FYP &rarr; MS/MPhil &rarr; PhD Research Roadmap
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Visualizes how an undergraduate Final Year Project (FYP) topic strategically scales into an MS thesis with rigorous methodology and eventually culminates in an original PhD doctoral dissertation.
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Research Topic to Scale:
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Deep Learning for Mountain Orchard Pathology..."
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

        {/* Preset topics */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Explore Presets:</span>
          {sampleTopics.map((st, i) => (
            <button
              key={i}
              onClick={() => {
                setTopic(st);
                handleGenerate(st);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 hover:bg-blue-100 hover:text-blue-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            >
              {st}
            </button>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            {loading ? <Clock className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>Generate 3-Stage Progression Roadmap</span>
          </button>
        </div>
      </div>

      {/* Visual Progression Journey Timeline */}
      <div className="space-y-8">
        {stages.map((stage, idx) => {
          let badgeColor = 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
          let borderColor = 'border-emerald-500';
          let icon = GraduationCap;

          if (stage.stage.includes('MS')) {
            badgeColor = 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border-blue-300';
            borderColor = 'border-blue-500';
            icon = BookOpen;
          } else if (stage.stage.includes('PhD')) {
            badgeColor = 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 border-purple-300';
            borderColor = 'border-purple-500';
            icon = Award;
          }

          const IconComponent = icon;

          return (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border-l-4 ${borderColor} border border-slate-200 dark:border-slate-700 shadow-sm space-y-5`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeColor}`}>
                      {stage.stage}
                    </span>
                    <div className="text-xs text-slate-500 mt-1">
                      Estimated Duration: <strong>{stage.duration}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-900 dark:text-white">Expected Output: </span>
                  {stage.expectedDeliverable}
                </div>
              </div>

              {/* Focus Summary */}
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">
                  Core Scientific Focus: {stage.focus}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Expected Novelty Contribution:</strong> {stage.noveltyExpectation}
                </p>
              </div>

              {/* 3 Pillars: Dataset, Methodology, Evaluation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-teal-600" />
                    <span>Dataset Scope:</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {stage.datasetScope}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Methodology Complexity:</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {stage.methodologyLevel}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Evaluation Depth:</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {stage.evaluationDepth}
                  </p>
                </div>
              </div>

              {/* Milestones Checklist */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Stage Milestones & Defense Checklist:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {stage.keyMilestones.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-base">
            Ready to Begin Stage 1 (Undergraduate FYP)?
          </h4>
          <p className="text-xs text-slate-300 mt-1">
            Build your 13-section research proposal draft or match verified KIU faculty supervisors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('proposal-builder')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition cursor-pointer"
          >
            Draft Proposal
          </button>
          <button
            onClick={() => onTabChange('researchers')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            Find Faculty Supervisor
          </button>
        </div>
      </div>
    </div>
  );
};
