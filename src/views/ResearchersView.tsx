import React, { useState, useEffect } from 'react';
import { Researcher, Department } from '../types';
import { 
  Users, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Mail, 
  BookOpen, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { SourceBadge } from '../components/SourceBadge';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
}

export const ResearchersView: React.FC<Props> = ({ onTabChange }) => {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDept, setSelectedDept] = useState('');
  
  // Matching Engine
  const [interestInput, setInterestInput] = useState('Computer vision, machine learning for agricultural crop disease and edge AI');
  const [matching, setMatching] = useState(false);
  const [matches, setMatches] = useState<{
    researcher: Researcher;
    matchScore: number;
    matchedInterests: string[];
    evidence: string;
  }[]>([]);

  useEffect(() => {
    fetchResearchers();
  }, [selectedDept]);

  const fetchResearchers = async () => {
    try {
      const [resResch, resDepts] = await Promise.all([
        fetch(`/api/researchers${selectedDept ? `?departmentId=${selectedDept}` : ''}`).then(r => r.json()),
        fetch('/api/departments').then(r => r.json())
      ]);
      setResearchers(resResch.researchers || []);
      setDepartments(resDepts.departments || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMatch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!interestInput.trim()) return;

    setMatching(true);
    try {
      const res = await fetch('/api/researchers/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests: interestInput })
      });
      const data = await res.json();
      setMatches(data.matches || []);
    } catch (e) {
      console.error(e);
    } finally {
      setMatching(false);
    }
  };

  React.useEffect(() => {
    handleMatch();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1">
          <Users className="w-3.5 h-3.5" />
          <span>Verified Academic Faculty Directory & Matcher</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Verified Researcher Directory & Supervisor Matching
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Connect your proposed research topic with verified faculty at Karakoram International University and DASR using traceable public research records.
        </p>
      </div>

      {/* SUPERVISOR / RESEARCH INTEREST MATCHING TOOL */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-2xl border border-emerald-800/40 shadow-xl space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-800/80 text-emerald-200 border border-emerald-600/40 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Research Interest Alignment Engine</span>
          </div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">
            Find Potential Faculty Supervisors by Research Alignment
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Enter your proposed research topic or methodology. The system matches verified public faculty profiles with granular source evidence.
          </p>
        </div>

        <form onSubmit={handleMatch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            placeholder="e.g. Computer vision, medical imaging, glacier remote sensing, Shina speech..."
            className="flex-1 py-3 px-4 rounded-xl border border-emerald-500/40 bg-slate-900/80 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            disabled={matching}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            {matching ? <Clock className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>Match Supervisors</span>
          </button>
        </form>

        {/* Mandatory Policy Disclaimer from Section 31 */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-emerald-800/40 text-[11px] text-slate-300 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Academic Integrity Notice: </span>
            This tool identifies potential research-interest matches based on verified public faculty publications and department records. It does not state or guarantee that a professor will supervise your thesis. Official supervision assignments are governed by the respective department and DASR regulations.
          </div>
        </div>

        {/* Matches Results */}
        {matches.length > 0 && (
          <div className="pt-4 space-y-3">
            <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Top Potential Research-Interest Matches:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.slice(0, 4).map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white">
                        {m.researcher.name}
                      </h4>
                      <div className="text-xs text-slate-400">
                        {m.researcher.designation} • {m.researcher.departmentName}
                      </div>
                    </div>

                    <div className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                      {m.matchScore}% Match
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-emerald-400">Evidence: </strong>
                    {m.evidence}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                    <span>Contact: {m.researcher.emailContact || 'Official KIU Portal'}</span>
                    <a
                      href={m.researcher.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Official Faculty Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* VERIFIED FACULTY DIRECTORY LIST */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
              Official KIU Researcher Directory
            </h2>
            <p className="text-xs text-slate-500">
              Verified academic profiles with verifiable public research records.
            </p>
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchers.map(r => (
            <div
              key={r.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <SourceBadge status="official_kiu" officialBadge={true} />
                  <span className="text-xs text-slate-400">
                    {r.publicationsCount} Publications
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                    {r.name}
                  </h3>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    {r.designation}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {r.departmentName} • {r.institution}
                  </div>
                </div>

                {/* Research Interests */}
                <div className="space-y-1 pt-1">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Verified Research Interests:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {r.researchInterests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Official Link */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Source Verified</span>
                <a
                  href={r.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View KIU Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
