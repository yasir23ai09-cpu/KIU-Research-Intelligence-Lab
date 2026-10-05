import React, { useState, useEffect, useRef } from 'react';
import { KnowledgeGraphData, GraphNode, GraphLink } from '../types';
import { 
  Network, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  ExternalLink, 
  BookOpen, 
  Users, 
  Database, 
  Building2,
  X
} from 'lucide-react';

interface Props {
  onTabChange: (tab: string, query?: string) => void;
}

export const KnowledgeGraphView: React.FC<Props> = ({ onTabChange }) => {
  const [graphData, setGraphData] = useState<KnowledgeGraphData>({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchGraph();
  }, []);

  const fetchGraph = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/knowledge-graph');
      const data = await res.json();
      setGraphData(data);
    } catch (e) {
      console.error('Error fetching knowledge graph:', e);
    } finally {
      setLoading(false);
    }
  };

  const filteredNodes = graphData.nodes.filter(n => {
    if (typeFilter !== 'all' && n.type !== typeFilter) return false;
    if (searchQuery && !n.label.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const nodeMap = new Map(filteredNodes.map(n => [n.id, n]));
  const filteredLinks = graphData.links.filter(l => nodeMap.has(l.source) && nodeMap.has(l.target));

  // Circular Layout Coordinates Calculation
  const width = 800;
  const height = 550;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 220;

  const nodePositions = new Map<string, { x: number; y: number }>();
  filteredNodes.forEach((node, i) => {
    const angle = (i / (filteredNodes.length || 1)) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle) + (node.type === 'topic' ? 30 : 0);
    const y = centerY + radius * Math.sin(angle) + (node.type === 'department' ? -30 : 0);
    nodePositions.set(node.id, { x, y });
  });

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'department': return '#0f766e'; // teal
      case 'researcher': return '#1e3a8a'; // blue
      case 'paper': return '#b45309'; // amber
      case 'topic': return '#0284c7'; // sky
      case 'dataset': return '#7c3aed'; // purple
      default: return '#64748b';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1">
          <Network className="w-3.5 h-3.5" />
          <span>Semantic Academic Knowledge Graph</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
          Research Entity Knowledge Graph
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Explore interconnected relationships between Karakoram International University researchers, academic papers, datasets, methodologies, and departments.
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entities in graph..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            <option value="all">All Entity Types</option>
            <option value="paper">Papers</option>
            <option value="researcher">Researchers</option>
            <option value="department">Departments</option>
            <option value="dataset">Datasets</option>
            <option value="topic">Topics</option>
          </select>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(prev => Math.min(1.6, prev + 0.15))}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="font-mono text-slate-500">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.15))}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
            title="Reset Zoom"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Graph Canvas & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive SVG Canvas */}
        <div 
          ref={containerRef}
          className="lg:col-span-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative min-h-[550px] flex items-center justify-center"
        >
          {loading ? (
            <div className="text-slate-400 text-xs animate-pulse">Constructing Knowledge Graph...</div>
          ) : (
            <svg 
              viewBox={`0 0 ${width} ${height}`} 
              className="w-full h-full transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Relationship Links */}
              {filteredLinks.map((link, i) => {
                const sPos = nodePositions.get(link.source);
                const tPos = nodePositions.get(link.target);
                if (!sPos || !tPos) return null;

                return (
                  <g key={i}>
                    <line
                      x1={sPos.x}
                      y1={sPos.y}
                      x2={tPos.x}
                      y2={tPos.y}
                      stroke="#334155"
                      strokeWidth="1.5"
                      strokeDasharray={link.type === 'cites' ? '4,4' : undefined}
                    />
                  </g>
                );
              })}

              {/* Entity Nodes */}
              {filteredNodes.map((node) => {
                const pos = nodePositions.get(node.id);
                if (!pos) return null;
                const isSelected = selectedNode?.id === node.id;
                const color = getNodeColor(node.type);

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer group"
                    transform={`translate(${pos.x}, ${pos.y})`}
                  >
                    <circle
                      r={isSelected ? 18 : (node.val || 12)}
                      fill={color}
                      stroke={isSelected ? '#ffffff' : '#0f172a'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-all duration-200 group-hover:scale-125"
                    />
                    <text
                      dy={isSelected ? 26 : 20}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="9"
                      fontFamily="sans-serif"
                      className="select-none pointer-events-none drop-shadow"
                    >
                      {node.label.slice(0, 18)}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}

          {/* Type Legend in corner */}
          <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 space-y-1.5 backdrop-blur-md">
            <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Entity Legend</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span> Department</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-700"></span> Researcher</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Research Paper</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Dataset</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Topic Area</div>
          </div>
        </div>

        {/* Selected Entity Inspector Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
              Node Inspector
            </h3>
            {selectedNode && (
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-3 text-xs">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {selectedNode.type}
              </span>

              <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white leading-snug">
                {selectedNode.label}
              </h4>

              {selectedNode.details && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="font-semibold text-slate-500 uppercase text-[10px]">Entity Attributes:</div>
                  {Object.entries(selectedNode.details).map(([k, v]) => (
                    <div key={k} className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                      <span className="font-semibold text-slate-600 dark:text-slate-400 capitalize">{k}: </span>
                      <span className="text-slate-800 dark:text-slate-200">{String(v)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3">
                <button
                  onClick={() => {
                    if (selectedNode.type === 'paper') onTabChange('explore', selectedNode.label);
                    else if (selectedNode.type === 'researcher') onTabChange('researchers');
                    else if (selectedNode.type === 'dataset') onTabChange('datasets');
                    else onTabChange('explore', selectedNode.label);
                  }}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition text-center cursor-pointer"
                >
                  View Connected Records &rarr;
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <Network className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p>Click on any node in the graph to inspect its academic relationships and metadata.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
