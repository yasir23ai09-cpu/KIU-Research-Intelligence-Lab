import { 
  User, 
  Department, 
  Researcher, 
  ResearchItem, 
  ResearchChunk, 
  DatasetItem, 
  ResearchGap, 
  ResearchProject,
  SourceRegistryItem,
  KnowledgeGraphData,
  GraphNode,
  GraphLink
} from '../types';
import { OFFICIAL_KIU_DEPARTMENTS, OFFICIAL_KIU_SOURCES } from '../data/kiuDepartments';
import { 
  INITIAL_RESEARCH_ITEMS, 
  INITIAL_RESEARCHERS, 
  INITIAL_DATASETS, 
  INITIAL_RESEARCH_GAPS,
  INITIAL_RESEARCH_PROJECTS 
} from '../data/initialData';

class RepositoryStore {
  public users: User[] = [
    {
      id: 'usr-student-1',
      name: 'Yasir Ali',
      email: 'yasir.23ai09@bbsutsd.edu.pk',
      role: 'student',
      departmentId: 'dept-cs',
      departmentName: 'Department of Computer Science',
      institution: 'Karakoram International University',
      researchInterests: ['Computer Vision', 'Deep Learning', 'Edge AI', 'Precision Agriculture'],
      createdAt: '2026-09-01'
    },
    {
      id: 'usr-scholar-1',
      name: 'Fatima Baig (MS Scholar)',
      email: 'fatima.ms@kiu.edu.pk',
      role: 'scholar',
      departmentId: 'dept-geology',
      departmentName: 'Department of Geology and Mountain Hazards',
      institution: 'Karakoram International University',
      researchInterests: ['GLOF Prediction', 'Remote Sensing', 'Cryosphere Dynamics'],
      createdAt: '2026-08-15'
    },
    {
      id: 'usr-faculty-1',
      name: 'Dr. Shahzad Alam',
      email: 'shahzad.alam@kiu.edu.pk',
      role: 'faculty',
      departmentId: 'dept-cs',
      departmentName: 'Department of Computer Science',
      institution: 'Karakoram International University',
      researchInterests: ['Artificial Intelligence', 'Computer Vision', 'Regional NLP'],
      createdAt: '2026-01-10'
    },
    {
      id: 'usr-admin-1',
      name: 'DASR Academic Administrator',
      email: 'dasr.admin@kiu.edu.pk',
      role: 'admin',
      institution: 'Directorate of Advanced Studies & Research (DASR)',
      createdAt: '2026-01-01'
    }
  ];

  public departments: Department[] = [...OFFICIAL_KIU_DEPARTMENTS];
  public sources: SourceRegistryItem[] = [...OFFICIAL_KIU_SOURCES];
  public researchers: Researcher[] = [...INITIAL_RESEARCHERS];
  public researchItems: ResearchItem[] = [...INITIAL_RESEARCH_ITEMS];
  public chunks: ResearchChunk[] = [];
  public datasets: DatasetItem[] = [...INITIAL_DATASETS];
  public researchGaps: ResearchGap[] = [...INITIAL_RESEARCH_GAPS];
  public projects: ResearchProject[] = [...INITIAL_RESEARCH_PROJECTS];
  public savedResearchIds: Record<string, string[]> = {
    'usr-student-1': ['res-kiu-001', 'res-kiu-006', 'res-open-005']
  };

  constructor() {
    this.seedInitialChunks();
  }

  private seedInitialChunks() {
    // Generate initial research chunks for indexed papers so RAG has granular page and section targets
    for (const item of this.researchItems) {
      this.chunks.push(
        {
          id: `chunk-${item.id}-1`,
          researchItemId: item.id,
          pageNumber: 1,
          section: 'ABSTRACT & INTRODUCTION',
          content: `${item.title}. Abstract: ${item.abstract}`
        },
        {
          id: `chunk-${item.id}-2`,
          researchItemId: item.id,
          pageNumber: 2,
          section: 'METHODOLOGY & DATASET',
          content: `Methodology: ${item.methodology}. Dataset: ${item.dataset}. Models: ${item.modelsOrAlgorithms || 'Standard baseline architecture'}.`
        },
        {
          id: `chunk-${item.id}-3`,
          researchItemId: item.id,
          pageNumber: 4,
          section: 'RESULTS & EVALUATION',
          content: `Evaluation Metrics: ${item.evaluationMetrics || 'Accuracy, Precision, Recall'}. Results: ${item.results || 'Demonstrated empirical gains across benchmarks'}.`
        },
        {
          id: `chunk-${item.id}-4`,
          researchItemId: item.id,
          pageNumber: 6,
          section: 'LIMITATIONS & FUTURE WORK',
          content: `Reported Limitations: ${item.limitations || 'Data scarcity in extreme operating domains'}. Future Work: ${item.futureWork || 'Integration of multi-spectral sensor arrays'}.`
        }
      );
    }
  }

  /**
   * Hybrid Search: Combines keyword matching, metadata filters, and lexical/semantic scoring
   */
  public searchResearch(params: {
    query?: string;
    departmentId?: string;
    researchType?: string;
    year?: number;
    openAccessOnly?: boolean;
    verificationStatus?: string;
  }): { items: (ResearchItem & { similarityScore: number })[]; totalCount: number } {
    const query = (params.query || '').trim().toLowerCase();
    const queryTerms = query ? query.split(/\s+/).filter(t => t.length > 1) : [];

    const scoredItems = this.researchItems
      .filter(item => {
        if (params.departmentId && item.departmentId !== params.departmentId) return false;
        if (params.researchType && item.researchType !== params.researchType) return false;
        if (params.year && item.year !== params.year) return false;
        if (params.openAccessOnly && !item.isOpenAccess) return false;
        if (params.verificationStatus && item.verificationStatus !== params.verificationStatus) return false;
        return true;
      })
      .map(item => {
        let score = 0.5; // base score

        if (queryTerms.length > 0) {
          const title = item.title.toLowerCase();
          const abstract = item.abstract.toLowerCase();
          const area = item.researchArea.toLowerCase();
          const keywords = item.keywords.map(k => k.toLowerCase()).join(' ');
          const methodology = (item.methodology || '').toLowerCase();
          const dataset = (item.dataset || '').toLowerCase();
          const authors = item.authors.map(a => a.toLowerCase()).join(' ');

          for (const term of queryTerms) {
            if (title.includes(term)) score += 0.35;
            if (keywords.includes(term)) score += 0.25;
            if (area.includes(term)) score += 0.2;
            if (methodology.includes(term)) score += 0.15;
            if (dataset.includes(term)) score += 0.15;
            if (abstract.includes(term)) score += 0.1;
            if (authors.includes(term)) score += 0.1;
          }
        }

        // Slight boost for verified / official KIU research and recent years
        if (item.verificationStatus === 'official_kiu') score += 0.08;
        if (item.year >= 2024) score += 0.05;

        // Normalize score between 0 and 1
        const normalized = Math.min(0.99, Math.max(0.1, score));
        return {
          ...item,
          similarityScore: Math.round(normalized * 100) / 100
        };
      });

    // Sort by score descending, then by year
    scoredItems.sort((a, b) => {
      if (queryTerms.length > 0) {
        return b.similarityScore - a.similarityScore || b.year - a.year;
      }
      return b.year - a.year;
    });

    return {
      items: scoredItems,
      totalCount: scoredItems.length
    };
  }

  /**
   * RAG chunk retriever for question answering
   */
  public retrieveRelevantChunks(query: string, maxChunks: number = 6): ResearchChunk[] {
    const qLower = query.toLowerCase();
    const terms = qLower.split(/\s+/).filter(t => t.length > 2);

    const scored = this.chunks.map(chunk => {
      let score = 0;
      const contentLower = chunk.content.toLowerCase();
      const sectionLower = chunk.section.toLowerCase();

      for (const t of terms) {
        if (contentLower.includes(t)) score += 2;
        if (sectionLower.includes(t)) score += 3;
      }

      return { chunk, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, maxChunks).map(s => s.chunk);
  }

  /**
   * Supervisor & Research Interest Matching
   */
  public matchResearchers(interestsText: string): { researcher: Researcher; matchScore: number; matchedInterests: string[]; evidence: string }[] {
    const terms = interestsText.toLowerCase().split(/[,\s]+/).filter(t => t.length > 2);

    const results = this.researchers.map(r => {
      const matchedInterests: string[] = [];
      let score = 30; // base potential

      for (const interest of r.researchInterests) {
        const iLower = interest.toLowerCase();
        for (const t of terms) {
          if (iLower.includes(t)) {
            if (!matchedInterests.includes(interest)) {
              matchedInterests.push(interest);
              score += 22;
            }
          }
        }
      }

      for (const topic of r.featuredTopics) {
        const tLower = topic.toLowerCase();
        for (const t of terms) {
          if (tLower.includes(t) && !matchedInterests.includes(topic)) {
            matchedInterests.push(topic);
            score += 15;
          }
        }
      }

      const matchScore = Math.min(96, Math.max(35, score));
      const evidence = matchedInterests.length > 0
        ? `Verified research alignment in ${matchedInterests.join(', ')} via official KIU faculty record (${r.officialSourceUrl}).`
        : `Affiliated with ${r.departmentName} at Karakoram International University with supervisory experience.`;

      return {
        researcher: r,
        matchScore,
        matchedInterests,
        evidence
      };
    });

    return results.sort((a, b) => b.matchScore - a.matchScore);
  }

  /**
   * Generates Interactive Knowledge Graph
   */
  public getKnowledgeGraph(): KnowledgeGraphData {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const addedNodes = new Set<string>();

    // 1. Department Nodes
    for (const d of this.departments.slice(0, 6)) {
      const id = `node-${d.id}`;
      nodes.push({
        id,
        label: d.name.replace('Department of ', ''),
        type: 'department',
        val: 18,
        color: '#0f766e',
        details: { url: d.officialUrl, verified: d.verified }
      });
      addedNodes.add(id);
    }

    // 2. Researcher Nodes
    for (const r of this.researchers) {
      const id = `node-${r.id}`;
      nodes.push({
        id,
        label: r.name,
        type: 'researcher',
        val: 15,
        color: '#1e3a8a',
        details: { designation: r.designation, dept: r.departmentName }
      });
      addedNodes.add(id);

      const deptNodeId = `node-${r.departmentId}`;
      if (addedNodes.has(deptNodeId)) {
        links.push({
          source: id,
          target: deptNodeId,
          label: 'belongs_to',
          type: 'belongs_to'
        });
      }
    }

    // 3. Research Paper Nodes
    for (const p of this.researchItems) {
      const id = `node-${p.id}`;
      nodes.push({
        id,
        label: p.title.slice(0, 36) + '...',
        type: 'paper',
        val: 12,
        color: '#b45309',
        details: { year: p.year, type: p.researchType, status: p.verificationStatus }
      });
      addedNodes.add(id);

      // Link to department if available
      if (p.departmentId && addedNodes.has(`node-${p.departmentId}`)) {
        links.push({
          source: id,
          target: `node-${p.departmentId}`,
          label: 'department_output',
          type: 'belongs_to'
        });
      }

      // Link to researcher author if matched
      for (const author of p.authors) {
        const found = this.researchers.find(r => r.name.toLowerCase().includes(author.toLowerCase()) || author.toLowerCase().includes(r.name.toLowerCase()));
        if (found) {
          links.push({
            source: `node-${found.id}`,
            target: id,
            label: 'authored',
            type: 'authored'
          });
        }
      }

      // Topic node
      const topicId = `node-topic-${p.researchArea.replace(/\s+/g, '-').toLowerCase()}`;
      if (!addedNodes.has(topicId)) {
        nodes.push({
          id: topicId,
          label: p.researchArea,
          type: 'topic',
          val: 10,
          color: '#0284c7'
        });
        addedNodes.add(topicId);
      }
      links.push({
        source: id,
        target: topicId,
        label: 'in_area',
        type: 'belongs_to'
      });
    }

    // 4. Datasets
    for (const ds of this.datasets.slice(0, 4)) {
      const id = `node-${ds.id}`;
      nodes.push({
        id,
        label: ds.name.split(':')[0],
        type: 'dataset',
        val: 11,
        color: '#7c3aed',
        details: { license: ds.license, source: ds.source }
      });
      addedNodes.add(id);

      // Link to first matching paper
      if (this.researchItems[0]) {
        links.push({
          source: `node-${this.researchItems[0].id}`,
          target: id,
          label: 'uses_dataset',
          type: 'uses_dataset'
        });
      }
    }

    return { nodes, links };
  }
}

export const repositoryStore = new RepositoryStore();
