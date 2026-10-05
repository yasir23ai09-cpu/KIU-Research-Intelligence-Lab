import React, { useState, useEffect, useRef } from 'react';
import { PaperAnalysis, ResearchItem } from '../types';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  BookOpen, 
  Cpu, 
  Layers, 
  Clock, 
  Quote, 
  Search,
  ChevronRight,
  Database
} from 'lucide-react';
import { SourceBadge } from '../components/SourceBadge';

interface Props {
  initialPaperId?: string;
  onTabChange: (tab: string, query?: string) => void;
}

export const PaperAnalyzerView: React.FC<Props> = ({ initialPaperId, onTabChange }) => {
  const [selectedPaperId, setSelectedPaperId] = useState(initialPaperId || '');
  const [indexedPapers, setIndexedPapers] = useState<ResearchItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [paperTitle, setPaperTitle] = useState('');
  const [fileName, setFileName] = useState('');
  const [base64File, setBase64File] = useState<string | null>(null);

  // Analysis State
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PaperAnalysis | null>(null);

  // Ask This Paper Chat
  const [question, setQuestion] = useState('');
  const [asking, setAsking] = useState(false);
  const [qaHistory, setQaHistory] = useState<{
    question: string;
    answer: string;
    confidence: string;
    citations: { page?: number; section?: string; quote: string }[];
  }[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchIndexedPapers();
  }, []);

  useEffect(() => {
    if (initialPaperId) {
      setSelectedPaperId(initialPaperId);
      analyzeSelectedPaper(initialPaperId);
    }
  }, [initialPaperId]);

  const fetchIndexedPapers = async () => {
    try {
      const res = await fetch('/api/research');
      const data = await res.json();
      setIndexedPapers(data.items || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setPaperTitle(file.name.replace(/\.[^/.]+$/, ''));
    setSelectedPaperId('');

    const reader = new FileReader();
    if (file.type === 'application/pdf') {
      reader.onload = () => {
        setBase64File(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = () => {
        setInputText(reader.result as string);
        setBase64File(null);
      };
      reader.readAsText(file);
    }
  };

  const analyzeSelectedPaper = async (paperId: string) => {
    try {
      setAnalyzing(true);
      const res = await fetch('/api/ai/analyze-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paperId })
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (e) {
      console.error('Error analyzing paper:', e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleStartAnalysis = async () => {
    if (selectedPaperId) {
      analyzeSelectedPaper(selectedPaperId);
      return;
    }

    if (!inputText && !base64File) {
      alert('Please upload a PDF or enter paper text to analyze.');
      return;
    }

    try {
      setAnalyzing(true);

      // If binary PDF was uploaded, post to upload route first to extract text
      let textToAnalyze = inputText;
      if (base64File) {
        const uploadRes = await fetch('/api/research/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: paperTitle || fileName || 'Uploaded Document',
            base64Pdf: base64File
          })
        });
        const uploadData = await uploadRes.json();
        if (uploadData.item) {
          textToAnalyze = uploadData.item.abstract || '';
          setSelectedPaperId(uploadData.item.id);
        }
      }

      const res = await fetch('/api/ai/analyze-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperText: textToAnalyze,
          paperTitle: paperTitle || fileName,
          paperId: selectedPaperId || undefined
        })
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (e) {
      console.error('Error analyzing document:', e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const currentQ = question;
    setQuestion('');
    setAsking(true);

    try {
      const res = await fetch('/api/ai/ask-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ,
          paperId: selectedPaperId || undefined,
          paperText: inputText || undefined,
          paperTitle: analysis?.title || paperTitle
        })
      });
      const data = await res.json();
      setQaHistory(prev => [
        ...prev,
        {
          question: currentQ,
          answer: data.answer,
          confidence: data.confidence || 'High evidence',
          citations: data.citations || []
        }
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setAsking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1">
          <FileText className="w-3.5 h-3.5" />
          <span>Automated 12-Section Academic Decomposition</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Academic Paper & PDF Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Deconstructs peer-reviewed papers, theses, and FYPs into problem statements, methodologies, sample sizes, limitations, and future directions without hallucinating absent information.
        </p>
      </div>

      {/* Input / Selection Panel */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Step 1: Choose Research Paper Source
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A: Select Indexed Paper */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Select from Indexed KIU & Scholarly Papers:
            </label>
            <select
              value={selectedPaperId}
              onChange={(e) => {
                setSelectedPaperId(e.target.value);
                setBase64File(null);
                setInputText('');
                setFileName('');
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">-- Or choose an indexed paper --</option>
              {indexedPapers.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.researchType}] {p.title.slice(0, 75)}... ({p.year})
                </option>
              ))}
            </select>
          </div>

          {/* Option B: Upload PDF */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Or Upload PDF / DOCX / TXT Document:
            </label>
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2.5 px-4 rounded-xl border border-dashed border-emerald-500/60 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100/60 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{fileName ? `Uploaded: ${fileName}` : 'Choose PDF File to Extract'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Textarea if manual text is pasted */}
        {!selectedPaperId && !base64File && (
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Or Paste Academic Text / Abstract:
            </label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste research text, abstract, or methodology description here..."
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleStartAnalysis}
            disabled={analyzing}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            {analyzing ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Decomposing Paper Sections...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Analyze Academic Structure</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Analysis Display */}
      {analysis && (
        <div className="space-y-8 animate-fade-in">
          {/* Paper Overview Header */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {analysis.researchField}
              </span>
              {analysis.year && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  Year {analysis.year}
                </span>
              )}
            </div>

            <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight">
              {analysis.title}
            </h2>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              <strong>Authors:</strong> {analysis.authors.join(', ')}
            </div>

            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Abstract</div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/60">
                {analysis.abstract}
              </p>
            </div>
          </div>

          {/* 12-Section Academic Decomposition Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* 1. Research Problem */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>1. Research Problem</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {analysis.researchProblem}
              </p>
            </div>

            {/* 2. Research Questions */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-sky-500" />
                <span>2. Research Questions</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                {analysis.researchQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            {/* 3. Objectives */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>3. Research Objectives</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                {analysis.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* 4. Methodology */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>4. Methodology</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {analysis.methodology}
              </p>
            </div>

            {/* 5. Dataset & Sample Size */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Database className="w-4 h-4 text-teal-500" />
                <span>5. Dataset & Sample Size</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Dataset:</strong> {analysis.dataset}
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>Sample Size:</strong> {analysis.sampleSize}
              </p>
            </div>

            {/* 6. Models & Algorithms */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-500" />
                <span>6. Models & Algorithms</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {analysis.models.concat(analysis.algorithms).map((m, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* 7. Evaluation Metrics */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>7. Evaluation Metrics</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {analysis.evaluationMetrics.map((em, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[11px]">
                    {em}
                  </span>
                ))}
              </div>
            </div>

            {/* 8. Results */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>8. Experimental Results</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {analysis.results}
              </p>
            </div>

            {/* 9. Limitations */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>9. Author-Stated Limitations</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                {analysis.limitations.map((lim, i) => (
                  <li key={i}>{lim}</li>
                ))}
              </ul>
            </div>

            {/* 10. Future Work */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>10. Future Work</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                {analysis.futureWork.map((fw, i) => (
                  <li key={i}>{fw}</li>
                ))}
              </ul>
            </div>

            {/* 11. Contributions */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Quote className="w-4 h-4 text-teal-500" />
                <span>11. Scientific Contributions</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                {analysis.contributions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* 12. Reproducibility Info */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-slate-500" />
                <span>12. Reproducibility Info</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {analysis.reproducibilityInfo}
              </p>
            </div>
          </div>

          {/* ASK THIS PAPER: Grounded Q&A Interface */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  Ask This Paper
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Strict Page-Level Grounding
              </span>
            </div>

            {/* Example Queries */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="font-semibold text-slate-500">Suggested Questions:</span>
              {[
                'What is the primary methodology used?',
                'Which dataset was selected and what was the sample size?',
                'What specific limitations did the authors report?',
                'What future work is suggested for this topic?'
              ].map(q => (
                <button
                  key={q}
                  onClick={() => setQuestion(q)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 hover:text-emerald-800 transition cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Conversation History */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {qaHistory.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-center text-xs text-slate-500">
                  Ask any question about this paper's problem, dataset, algorithm, or limitations. Answers are grounded in the document with page citations.
                </div>
              ) : (
                qaHistory.map((item, i) => (
                  <div key={i} className="space-y-2 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.question}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg">
                      {item.answer}
                    </p>

                    {item.citations && item.citations.length > 0 && (
                      <div className="pt-1 space-y-1">
                        <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                          Supporting Evidence & Citations:
                        </div>
                        {item.citations.map((c, cIdx) => (
                          <div key={cIdx} className="text-[11px] text-slate-500 font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                            <strong>Source:</strong> {c.page ? `Page ${c.page}, ` : ''}{c.section || 'Document Text'}: "{c.quote}"
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Question Input Bar */}
            <form onSubmit={handleAskQuestion} className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about this paper's methodology, dataset, limitations, or future directions..."
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={asking || !question.trim()}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                {asking ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Ask</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
