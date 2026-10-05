import React from 'react';
import { VerificationStatus } from '../types';
import { ShieldCheck, Award, GraduationCap, Globe, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface Props {
  status: VerificationStatus;
  officialBadge?: boolean;
  className?: string;
}

export const SourceBadge: React.FC<Props> = ({ status, officialBadge, className = '' }) => {
  if (officialBadge || status === 'official_kiu') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800 ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        Official KIU Source
      </span>
    );
  }

  switch (status) {
    case 'verified_research':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-900 border border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800 ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          Verified Research
        </span>
      );
    case 'faculty_submitted':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-900 border border-indigo-300 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800 ${className}`}>
          <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          Faculty Submitted
        </span>
      );
    case 'student_submitted':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800 ${className}`}>
          <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          Student Submitted (FYP/Thesis)
        </span>
      );
    case 'open_scholarly':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-900 border border-sky-300 dark:bg-sky-950/70 dark:text-sky-300 dark:border-sky-800 ${className}`}>
          <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          Open Scholarly Source
        </span>
      );
    case 'ai_generated':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-900 border border-purple-300 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800 ${className}`}>
          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          AI-Generated Analysis
        </span>
      );
    case 'pending_verification':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 ${className}`}>
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          Pending Verification
        </span>
      );
  }
};
