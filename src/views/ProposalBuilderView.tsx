import React, { useState } from 'react';
import { ProposalDraft } from '../types';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Printer
} from 'lucide-react';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
}

export const ProposalBuilderView: React.FC<Props> = ({ onTabChange }) => {
  const [topic, setTopic] = useState('Deep Learning for Automated Foliar Disease Classification in High-Altitude Apricot & Cherry Orchards');
  const [problem, setProblem] = useState('Crop loss in high-altitude valleys due to lack of rapid edge disease detection and cloud connectivity voids.');
  const [opportunity, setOpportunity] = useState('Optimization of lightweight CNN backbones for resource-constrained ARM embedded devices under natural glare.');
  const [department, setDepartment] = useState('Department of Computer Science');

  const [generating, setGenerating] = useState(false);
  const [proposal, setProposal] = useState<ProposalDraft | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setGenerating(true);
    try {
      const res = await fetch('/api/ai/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          problem,
          opportunity,
          department
        })
      });
      const data = await res.json();
      if (data.proposal) {
        setProposal(data.proposal);
      }
    } catch (e) {
      console.error('Error generating proposal:', e);
    } finally {
      setGenerating(false);
    }
  };

  React.useEffect(() => {
    handleGenerate();
  }, []);

  const copyAsMarkdown = () => {
    if (!proposal) return;
    const md = `
# ${proposal.title}
*A Research Proposal Draft submitted to the ${department}, Karakoram International University*

## 1. Background
${proposal.background}

## 2. Problem Statement
${proposal.problemStatement}

## 3. Research Gap & Potential Opportunity
${proposal.researchGap}

## 4. Research Questions
${proposal.researchQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

## 5. Research Objectives
${proposal.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

## 6. Proposed Methodology
${proposal.proposedMethodology}

## 7. Experimental Dataset
${proposal.dataset}

## 8. Evaluation Strategy
${proposal.evaluationStrategy}

## 9. Expected Contribution
${proposal.expectedContribution}

## 10. Limitations
${proposal.limitations}

## 11. Future Work
${proposal.futureWork}

## 12. References (Verified Indexed Sources)
${proposal.references.map((r, i) => `[${i + 1}] ${r.citation} ${r.doi ? `DOI: ${r.doi}` : ''}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1">
          <FileText className="w-3.5 h-3.5" />
          <span>13-Section Structured Academic Thesis Proposal Generator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Research Proposal Draft Builder
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Generates a complete, formal 13-section research proposal adhering to the statutory requirements of the KIU Directorate of Advanced Studies & Research (DASR).
        </p>
      </div>

      {/* Input Parameters */}
      <form onSubmit={handleGenerate} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Proposal Core Parameters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5 md:col-span-2">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Proposed Research Topic:
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Department:
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="Department of Computer Science">Department of Computer Science</option>
              <option value="Department of Geology and Mountain Hazards">Department of Geology and Mountain Hazards</option>
              <option value="Department of Environmental Sciences">Department of Environmental Sciences</option>
              <option value="Department of Electrical Engineering">Department of Electrical Engineering</option>
              <option value="Department of Agriculture and Food Technology">Department of Agriculture and Food Technology</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Primary Research Opportunity / Gap:
            </label>
            <input
              type="text"
              value={opportunity}
              onChange={(e) => setOpportunity(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Problem Statement Summary:
            </label>
            <textarea
              rows={2}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={generating}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            {generating ? <Clock className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>Generate 13-Section Formal Draft</span>
          </button>
        </div>
      </form>

      {/* Mandatory Integrity Banner */}
      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Verified Academic Reference Policy: </span>
          All citations and references generated below are strictly mapped to verified scholarly papers in the indexed repository. The system never invents fake references or artificial DOIs.
        </div>
      </div>

      {/* 13-Section Proposal Output Document */}
      {proposal && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md p-8 sm:p-12 space-y-8 animate-fade-in font-serif text-slate-800 dark:text-slate-200">
          {/* Document Header & Action bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-6 not-serif">
            <div>
              <div className="text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">
                Karakoram International University • Directorate of Advanced Studies & Research
              </div>
              <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mt-1">
                Formal Academic Research Proposal Draft
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyAsMarkdown}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Markdown' : 'Copy as Markdown'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Draft</span>
              </button>
            </div>
          </div>

          {/* Section 1: Title */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              1. Proposed Thesis Title
            </h3>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {proposal.title}
            </h2>
          </section>

          {/* Section 2: Background */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              2. Scientific Background & Context
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {proposal.background}
            </p>
          </section>

          {/* Section 3: Problem Statement */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              3. Problem Statement
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              {proposal.problemStatement}
            </p>
          </section>

          {/* Section 4: Research Gap */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              4. Research Gap / Identified Opportunity
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {proposal.researchGap}
            </p>
          </section>

          {/* Section 5: Research Questions */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              5. Research Questions
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
              {proposal.researchQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          </section>

          {/* Section 6: Objectives */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              6. Specific Objectives
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
              {proposal.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ol>
          </section>

          {/* Section 7: Proposed Methodology */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              7. Proposed Methodology & Architecture
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {proposal.proposedMethodology}
            </p>
          </section>

          {/* Section 8: Dataset */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              8. Dataset & Experimental Benchmarks
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {proposal.dataset}
            </p>
          </section>

          {/* Section 9: Evaluation Strategy */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              9. Evaluation & Validation Strategy
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {proposal.evaluationStrategy}
            </p>
          </section>

          {/* Section 10: Expected Contribution */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              10. Expected Scientific & Societal Contribution
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {proposal.expectedContribution}
            </p>
          </section>

          {/* Section 11: Limitations */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider not-serif">
              11. Anticipated Scope & Methodological Limitations
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {proposal.limitations}
            </p>
          </section>

          {/* Section 12: Future Work */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider not-serif">
              12. Future Work Direction
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {proposal.futureWork}
            </p>
          </section>

          {/* Section 13: Verified References */}
          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700 not-serif">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              13. Verified Bibliographic References
            </h3>
            <div className="space-y-2 text-xs">
              {proposal.references.map((ref, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-900 dark:text-white">[{idx + 1}] </span>
                    <span className="text-slate-700 dark:text-slate-300">{ref.citation}</span>
                    {ref.doi && (
                      <div className="text-[11px] font-mono text-slate-500">DOI: {ref.doi}</div>
                    )}
                  </div>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
                    >
                      Source Link &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
