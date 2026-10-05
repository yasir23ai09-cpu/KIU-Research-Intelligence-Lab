import React, { useState, useEffect } from 'react';
import { ResearchItem, SourceRegistryItem } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  RefreshCw, 
  FileText, 
  Users, 
  Building2, 
  Clock, 
  Check, 
  X,
  Database
} from 'lucide-react';
import { SourceBadge } from '../components/SourceBadge';

export const AdminView: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [sources, setSources] = useState<SourceRegistryItem[]>([]);
  const [pendingItems, setPendingItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [resAnalytics, resResearch] = await Promise.all([
        fetch('/api/admin/analytics').then(r => r.json()),
        fetch('/api/research').then(r => r.json())
      ]);

      setAnalytics(resAnalytics);
      setSources(resAnalytics.sources || []);
      const all: ResearchItem[] = resResearch.items || [];
      const pending = all.filter(r => r.verificationStatus === 'student_submitted' || r.verificationStatus === 'pending_verification');
      setPendingItems(pending);
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmission = async (id: string, newStatus: string) => {
    setVerifyingId(id);
    try {
      const res = await fetch('/api/admin/verify-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setPendingItems(prev => prev.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setVerifyingId(null);
    }
  };

  const handlePingSource = async (id: string) => {
    try {
      const res = await fetch('/api/sources/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setSources(prev => prev.map(s => s.id === id ? data.source : s));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Directorate of Advanced Studies & Research (DASR) Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Research Administration & Integrity Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Audit research submissions, monitor authoritative KIU data sources, and maintain scholarly metadata verification.
          </p>
        </div>

        <button
          onClick={fetchAdminData}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh System Metrics</span>
        </button>
      </div>

      {/* Metrics Row */}
      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
            <div className="text-xs text-slate-500">Total Indexed Research</div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {analytics.metrics.totalResearch}
            </div>
            <div className="text-[11px] text-emerald-600">Papers, FYPs & Theses</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
            <div className="text-xs text-slate-500">Official KIU Departments</div>
            <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {analytics.metrics.totalDepartments}
            </div>
            <div className="text-[11px] text-slate-400">100% Verified URLs</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
            <div className="text-xs text-slate-500">Verified Faculty Profiles</div>
            <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
              {analytics.metrics.totalResearchers}
            </div>
            <div className="text-[11px] text-slate-400">Traceable Publications</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
            <div className="text-xs text-slate-500">Pending Review Submissions</div>
            <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
              {pendingItems.length}
            </div>
            <div className="text-[11px] text-amber-600">Requires Admin Approval</div>
          </div>
        </div>
      )}

      {/* Pending Student Submissions Verifier Table */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Pending Student / Scholar Research Submissions ({pendingItems.length})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review user uploads before granting official university repository certification.
            </p>
          </div>
        </div>

        {pendingItems.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 text-center text-xs text-slate-500">
            No pending submissions awaiting verification. All records are currently audited.
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-3 font-semibold">Title & Author</th>
                  <th className="py-3 px-3 font-semibold">Department</th>
                  <th className="py-3 px-3 font-semibold">Current Status</th>
                  <th className="py-3 px-3 font-semibold">Submission Date</th>
                  <th className="py-3 px-3 font-semibold text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {pendingItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">
                      <div className="line-clamp-1">{item.title}</div>
                      <div className="text-[11px] text-slate-400">{item.authors.join(', ')}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                      {item.departmentName || 'Computer Science'}
                    </td>
                    <td className="py-3 px-3">
                      <SourceBadge status={item.verificationStatus} />
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono">
                      {item.createdAt}
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={() => handleVerifySubmission(item.id, 'verified_research')}
                        disabled={verifyingId === item.id}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition cursor-pointer"
                      >
                        Approve & Verify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Authoritative Sources Health Monitor */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div>
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Authoritative Source Health & Traceability Monitor</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitors upstream URLs to ensure KIU university information remains 100% authoritative and truthful.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-3 font-semibold">Source Portal</th>
                <th className="py-3 px-3 font-semibold">Category</th>
                <th className="py-3 px-3 font-semibold">Authoritative Status</th>
                <th className="py-3 px-3 font-semibold">Last Checked</th>
                <th className="py-3 px-3 font-semibold">Current State</th>
                <th className="py-3 px-3 font-semibold text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {sources.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">
                    <div>{s.sourceName}</div>
                    <a
                      href={s.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span className="truncate max-w-xs">{s.sourceUrl}</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {s.sourceType}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      s.official 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {s.official ? 'Official KIU Source' : 'Scholarly Index'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono">
                    {s.lastChecked}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{s.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handlePingSource(s.id)}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer transition"
                    >
                      Audit Source
                    </button>
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
