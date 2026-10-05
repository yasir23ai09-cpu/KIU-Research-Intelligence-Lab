import React, { useState, useEffect } from 'react';
import { ResearchItem, ResearchProject, LiteratureMatrixRow } from '../types';
import { 
  BookMarked, 
  Download, 
  Plus, 
  Trash2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Edit3, 
  Layers, 
  ExternalLink,
  Save,
  FolderPlus
} from 'lucide-react';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
  savedResearchIds: string[];
}

export const LiteratureWorkspaceView: React.FC<Props> = ({ onTabChange, savedResearchIds }) => {
  const [papers, setPapers] = useState<ResearchItem[]>([]);
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  
  // New Project Form Modal
  const [showNewProjModal, setShowNewProjModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newArea, setNewArea] = useState('Computer Vision & Precision Agriculture');
  const [newProblem, setNewProblem] = useState('');
  
  // Note Form
  const [noteContent, setNoteContent] = useState('');
  const [noteTag, setNoteTag] = useState('Literature Analysis');

  useEffect(() => {
    fetchWorkspaceData();
  }, []);

  const fetchWorkspaceData = async () => {
    try {
      const [resPapers, resProjects] = await Promise.all([
        fetch('/api/research').then(r => r.json()),
        fetch('/api/literature/projects').then(r => r.json())
      ]);

      const allItems: ResearchItem[] = resPapers.items || [];
      setPapers(allItems);

      const projs: ResearchProject[] = resProjects.projects || [];
      setProjects(projs);
      if (projs.length > 0 && !selectedProjectId) {
        setSelectedProjectId(projs[0].id);
      }
    } catch (e) {
      console.error('Error fetching workspace:', e);
    }
  };

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/literature/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          researchArea: newArea,
          problem: newProblem,
          objectives: ['Conduct systematic literature review', 'Synthesize research limitations'],
          researchQuestions: ['What are the dominant architectures and benchmarks?']
        })
      });
      const data = await res.json();
      if (data.project) {
        setProjects([data.project, ...projects]);
        setSelectedProjectId(data.project.id);
        setShowNewProjModal(false);
        setNewTitle('');
        setNewProblem('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim() || !currentProject) return;

    try {
      const res = await fetch('/api/literature/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: currentProject.id,
          content: noteContent,
          tag: noteTag
        })
      });
      const data = await res.json();
      if (data.note) {
        currentProject.notes.push(data.note);
        setNoteContent('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Matrix Rows
  const matrixRows: LiteratureMatrixRow[] = papers.map(p => ({
    paperId: p.id,
    title: p.title,
    authors: p.authors.join(', '),
    year: p.year,
    problem: p.abstract.slice(0, 100) + '...',
    dataset: p.dataset || 'Field imagery',
    method: p.methodology || 'Transfer learning',
    results: p.results || 'Empirical benchmark',
    limitations: p.limitations || 'Underrepresented environmental conditions',
    futureWork: p.futureWork || 'Integration of multi-spectral telemetry'
  }));

  const exportCsv = () => {
    const headers = ['Paper Title', 'Authors', 'Year', 'Problem', 'Dataset', 'Method', 'Results', 'Limitations', 'Future Work'];
    const rows = matrixRows.map(r => [
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.authors.replace(/"/g, '""')}"`,
      r.year,
      `"${r.problem.replace(/"/g, '""')}"`,
      `"${r.dataset.replace(/"/g, '""')}"`,
      `"${r.method.replace(/"/g, '""')}"`,
      `"${r.results.replace(/"/g, '""')}"`,
      `"${r.limitations.replace(/"/g, '""')}"`,
      `"${r.futureWork.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `KIU_Literature_Matrix_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const workflowSteps = [
    'Idea',
    'Literature Review',
    'Research Opportunity',
    'Proposal',
    'Methodology',
    'Data Collection',
    'Experiment',
    'Evaluation',
    'Writing',
    'Publication'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Literature Review Workspace & Automatic Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            My Literature Review Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Synthesize papers into an automatic literature matrix, organize research notes, and track thesis progress milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewProjModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition cursor-pointer flex items-center gap-1.5"
          >
            <FolderPlus className="w-4 h-4" />
            <span>New Research Workspace</span>
          </button>

          <button
            onClick={exportCsv}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Matrix (CSV)</span>
          </button>
        </div>
      </div>

      {/* Project Selector Bar */}
      {currentProject && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Current Active Workspace Project
              </div>
              <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-white mt-0.5">
                {currentProject.title}
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">
                Domain: <strong>{currentProject.researchArea}</strong> • Status: <strong>{currentProject.status}</strong>
              </div>
            </div>

            {/* Switch Project Dropdown */}
            {projects.length > 1 && (
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            )}
          </div>

          {/* Research Progress Timeline from Section 60 */}
          <div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Thesis Progress Roadmap
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex items-center min-w-[700px] gap-1">
                {workflowSteps.map((step, idx) => {
                  const isCurrent = step === currentProject.status;
                  const isPast = workflowSteps.indexOf(currentProject.status) > idx;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center relative">
                      <div className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center mb-1.5 transition-all ${
                        isCurrent 
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950'
                          : isPast
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className={`text-[11px] text-center leading-tight font-medium ${
                        isCurrent
                          ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'text-slate-500'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTOMATIC LITERATURE MATRIX TABLE */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              Structured Literature Review Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Standard 8-column academic synthesis format. Ready for literature chapter write-ups.
            </p>
          </div>

          <button
            onClick={exportCsv}
            className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition cursor-pointer flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Table</span>
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="py-3 px-3 font-semibold min-w-[200px]">Paper & Authors</th>
                <th className="py-3 px-2 font-semibold w-16 text-center">Year</th>
                <th className="py-3 px-3 font-semibold min-w-[180px]">Research Problem</th>
                <th className="py-3 px-3 font-semibold min-w-[150px]">Dataset</th>
                <th className="py-3 px-3 font-semibold min-w-[160px]">Methodology</th>
                <th className="py-3 px-3 font-semibold min-w-[160px]">Results</th>
                <th className="py-3 px-3 font-semibold min-w-[180px] text-amber-700 dark:text-amber-400">Limitations</th>
                <th className="py-3 px-3 font-semibold min-w-[180px]">Future Work</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {matrixRows.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">
                    <div 
                      onClick={() => onTabChange('explore', r.title)}
                      className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                    >
                      {r.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                      {r.authors}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center font-mono text-slate-500">
                    {r.year}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {r.problem}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {r.dataset}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {r.method}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {r.results}
                  </td>
                  <td className="py-3 px-3 text-amber-800 dark:text-amber-300 bg-amber-50/40 dark:bg-amber-950/20">
                    {r.limitations}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {r.futureWork}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Research Notes & Annotations Panel */}
      {currentProject && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-emerald-600" />
              <span>Project Field & Literature Notes ({currentProject.notes?.length || 0})</span>
            </h3>
          </div>

          {/* New Note Form */}
          <form onSubmit={handleAddNote} className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
            <textarea
              rows={2}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Record a key finding, supervisor advice, experimental observation, or citation note..."
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Tag:</span>
                <select
                  value={noteTag}
                  onChange={(e) => setNoteTag(e.target.value)}
                  className="py-1 px-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <option value="Literature Analysis">Literature Analysis</option>
                  <option value="Supervisor Guidance">Supervisor Guidance</option>
                  <option value="Data Collection">Data Collection</option>
                  <option value="Experimental Bug">Experimental Observation</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!noteContent.trim()}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs transition cursor-pointer"
              >
                Add Note
              </button>
            </div>
          </form>

          {/* Notes List */}
          <div className="space-y-2">
            {currentProject.notes && currentProject.notes.map(n => (
              <div key={n.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {n.tag || 'Note'}
                    </span>
                    <span className="text-[11px] text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {n.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE NEW WORKSPACE MODAL */}
      {showNewProjModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              Create New Literature Workspace Project
            </h3>
            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project / Thesis Title:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Edge-AI Orchard Sentry: Mobile Leaf Diagnosis"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Research Area / Domain:
                </label>
                <input
                  type="text"
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Research Problem Statement:
                </label>
                <textarea
                  rows={3}
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  placeholder="Describe the primary scientific or regional challenge your thesis addresses..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
