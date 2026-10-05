import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Scale, 
  Lock, 
  BookOpen,
  Award
} from 'lucide-react';
import { OFFICIAL_KIU_SOURCES } from '../data/kiuDepartments';

export const IntegrityView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Statutory Compliance & Responsible AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
          Academic Integrity & Responsible AI Framework
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          The core operating charter governing the KIU Research Intelligence Lab: ensuring empirical veracity, anti-hallucination guardrails, and ethical human supervisor oversight.
        </p>
      </div>

      {/* Primary Disclaimer Box from Section 76 */}
      <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-2">
        <div className="font-bold flex items-center gap-2 text-base">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Important Academic Project Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          "KIU Research Intelligence Lab is an independent academic/research technology project designed to support research discovery and academic workflows. It is not the official KIU website or an official KIU system unless formally authorized by Karakoram International University."
        </p>
        <p className="text-xs text-amber-800 dark:text-amber-300">
          The application references official KIU information retrieved from authoritative university portals, but it strictly distinguishes between Official University Data, Open Scholarly Literature, User Uploads, and AI-Generated Analysis.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
        {/* Principle 1: Supervisor Primacy */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
            AI Does Not Replace Faculty Supervisors
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            All research topics, methodologies, and roadmaps formulated by this system represent exploratory recommendations. Students must consult their designated academic supervisor and obtain formal approval through their department before initiating research.
          </p>
        </div>

        {/* Principle 2: Anti-Hallucination Guardrails */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
            Zero-Hallucination Citation Policy
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The platform never invents papers, authors, citations, DOIs, datasets, or faculty profiles. If literature is not present in indexed sources, the system explicitly reports: "Not identified in the provided document" or "Insufficient evidence found."
          </p>
        </div>

        {/* Principle 3: Uncertainty & Research Gaps */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
            Research Gaps are Opportunities, Not Guaranteed Novelty
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The system never claims an area is definitely a novel gap. Instead, it states: "Based on the indexed literature available to this system, this appears to be a potential research opportunity." All gaps must be validated through systematic literature reviews.
          </p>
        </div>

        {/* Principle 4: Intellectual Property & Privacy */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
            04
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
            Document Privacy & Copyright Respect
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            User-uploaded theses and private draft papers are isolated and not utilized to train public foundation models or exposed without authorization. Copyrighted full-text papers are not scraped; only open-access metadata and abstracts are indexed.
          </p>
        </div>
      </div>

      {/* Authoritative KIU Data Source Registry Table */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
            Authoritative KIU Data Sources & Verification Registry
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            KIU department structures, programs, and faculty data are verified against these official URLs.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-3 font-semibold">Source Portal Name</th>
                <th className="py-3 px-3 font-semibold">Type</th>
                <th className="py-3 px-3 font-semibold">Official Status</th>
                <th className="py-3 px-3 font-semibold">Last Checked</th>
                <th className="py-3 px-3 font-semibold">Direct Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {OFFICIAL_KIU_SOURCES.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                    {s.sourceName}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">
                    {s.sourceType}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      s.official 
                        ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {s.official ? 'Authoritative' : 'Scholarly Partner'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 font-mono">
                    {s.lastChecked}
                  </td>
                  <td className="py-2.5 px-3">
                    <a
                      href={s.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
