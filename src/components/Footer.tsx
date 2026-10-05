import React from 'react';
import { ShieldCheck, ExternalLink, GraduationCap, MapPin, Heart } from 'lucide-react';

interface Props {
  onTabChange: (tab: string) => void;
}

export const Footer: React.FC<Props> = ({ onTabChange }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand & Mission */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-serif font-bold text-lg">
                K
              </div>
              <span className="font-serif font-bold text-white text-base">
                KIU Research Intelligence Lab
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              AI-Powered Research Discovery, Gap Analysis & FYP/MS/PhD Research Advisor. Bridging localized Himalayan & Karakoram research challenges with global scholarly literature.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Gilgit, Gilgit-Baltistan, Pakistan</span>
            </div>
          </div>

          {/* Official KIU Direct Portals */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Official KIU Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://www.kiu.edu.pk/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Main University Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://dasr.kiu.edu.pk/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Directorate of Advanced Studies & Research (DASR)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.kiu.edu.pk/departments" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Official Departments Directory (27 Depts)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.kiu.edu.pk/departments/department-of-computer-science" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Department of Computer Science</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://admissions.kiu.edu.pk/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>KIU Admissions Directorate</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Research Modules */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Core Academic Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onTabChange('explore')} className="hover:text-emerald-400 cursor-pointer">
                  Global & KIU Research Search
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('paper-analyzer')} className="hover:text-emerald-400 cursor-pointer">
                  PDF Paper Decomposition Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('research-gap')} className="hover:text-emerald-400 cursor-pointer">
                  8-Dimension Research Gap Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('novelty')} className="hover:text-emerald-400 cursor-pointer">
                  Semantic Similarity & Novelty Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('roadmap')} className="hover:text-emerald-400 cursor-pointer">
                  FYP &rarr; MS/MPhil &rarr; PhD Research Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('literature')} className="hover:text-emerald-400 cursor-pointer">
                  Literature Review Workspace
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Integrity & Open Science */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Academic Integrity
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              The AI does not present unsupported statements as fact. All research opportunities, methodology analyses, and roadmaps represent evidence-backed opportunities requiring human supervisor review.
            </p>
            <button
              onClick={() => onTabChange('integrity')}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
            >
              Read Research Integrity Policy &rarr;
            </button>
          </div>
        </div>

        {/* Mandatory Project Disclaimer from Prompt Section 76 */}
        <div className="border-t border-slate-800 pt-6 pb-4">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">Official Disclaimer: </span>
            KIU Research Intelligence Lab is an independent academic/research technology project designed to support research discovery and academic workflows. It is not the official KIU website or an official KIU system unless formally authorized by Karakoram International University. Official university information is retrieved and linked directly to authoritative KIU sources.
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/60">
          <p>© {new Date().getFullYear()} KIU Research Intelligence Lab. Built for academic research discovery.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>OpenAlex / Crossref / arXiv Compatible</span>
            <span>•</span>
            <span>WCAG 2.2 AA Accessible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
