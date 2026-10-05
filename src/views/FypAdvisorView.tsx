import React, { useState } from 'react';
import { FypRecommendation } from '../types';
import { 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Clock, 
  BookOpen, 
  AlertCircle, 
  ArrowRight,
  Layers,
  Send
} from 'lucide-react';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
}

export const FypAdvisorView: React.FC<Props> = ({ onTabChange }) => {
  const [department, setDepartment] = useState('Department of Computer Science');
  const [skills, setSkills] = useState('Python, PyTorch, Embedded Systems, OpenCV, React');
  const [interests, setInterests] = useState('Computer Vision for Mountain Agriculture, Edge AI, Satellite Remote Sensing');
  const [preferredTech, setPreferredTech] = useState('TensorFlow Lite, Raspberry Pi, Flutter, Google Earth Engine');
  const [difficulty, setDifficulty] = useState<'Beginner-Friendly' | 'Intermediate' | 'Advanced'>('Intermediate');
  
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<FypRecommendation[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/fyp-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          department,
          skills,
          interests,
          preferredTechnology: preferredTech,
          difficulty
        })
      });
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (e) {
      console.error('Error generating FYP recommendations:', e);
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
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Undergraduate & Postgraduate Topic Formulation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          AI FYP & Thesis Idea Advisor
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Generates well-formulated, academically feasible Final Year Project (FYP) and MS research proposals grounded in real regional challenges across Karakoram International University and the Hindukush-Himalaya.
        </p>
      </div>

      {/* Input Parameters Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Student Skill & Interest Parameters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Department:
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Department of Computer Science">Department of Computer Science</option>
              <option value="Department of Geology and Mountain Hazards">Department of Geology and Mountain Hazards</option>
              <option value="Department of Environmental Sciences">Department of Environmental Sciences</option>
              <option value="Department of Electrical Engineering">Department of Electrical Engineering</option>
              <option value="Department of Agriculture and Food Technology">Department of Agriculture and Food Technology</option>
              <option value="Department of Urdu and Regional Languages">Department of Urdu and Regional Languages</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Target Difficulty / Scope:
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Beginner-Friendly">Beginner-Friendly (Structured Baselines)</option>
              <option value="Intermediate">Intermediate (Field Deployment & Model Compression)</option>
              <option value="Advanced">Advanced (Novel Architectural Adapters / Multimodal)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Student Technical Skills & Languages:
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Python, PyTorch, OpenCV, Flutter, Node.js"
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Research Interests & Themes:
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g. Computer Vision for Mountain Orchards, GLOF Satellite AI"
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            {loading ? <Clock className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>Generate Feasible FYP Directions</span>
          </button>
        </div>
      </div>

      {/* Mandatory Supervisor Validation Notice from Section 24 */}
      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Academic Governance Policy: </span>
          All recommendations below represent AI-generated research directions. They require formal discussion and validation with your designated departmental supervisor before registering an FYP title with the department.
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id || index}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Topic Recommendation #{index + 1}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {rec.difficulty}
                </span>
                <span className="text-xs text-slate-500">
                  Scope: ~{rec.estimatedScopeMonths} Months
                </span>
              </div>

              <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Requires Supervisor Validation</span>
              </div>
            </div>

            {/* Title & Problem */}
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                {rec.title}
              </h2>
              <div className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-white">Research Problem: </strong>
                {rec.problem}
              </div>
            </div>

            {/* Motivation */}
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-white">Scientific & Regional Motivation: </strong>
              {rec.motivation}
            </div>

            {/* Research Questions & Objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-sky-500" />
                  <span>Research Questions:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  {rec.researchQuestions.map((q, qIdx) => (
                    <li key={qIdx}>{q}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Measurable Objectives:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  {rec.objectives.map((obj, oIdx) => (
                    <li key={oIdx}>{obj}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Methodology, Datasets, Technologies */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  Proposed Methodology:
                </span>
                <p className="text-slate-600 dark:text-slate-300">{rec.proposedMethodology}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  Dataset Options:
                </span>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5">
                  {rec.datasetOptions.map((ds, dIdx) => (
                    <li key={dIdx} className="truncate">{ds}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  Recommended Technologies:
                </span>
                <div className="flex flex-wrap gap-1">
                  {rec.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar: Roadmap, Proposal, Supervisor Matching */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTabChange('roadmap')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <span>Build FYP &rarr; MS Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onTabChange('proposal-builder')}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  Draft 13-Section Proposal
                </button>
              </div>

              <button
                onClick={() => onTabChange('researchers')}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Match Potential Faculty Supervisors &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
