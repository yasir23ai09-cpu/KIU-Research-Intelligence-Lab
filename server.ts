import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { repositoryStore } from './src/server/store';
import { 
  analyzePaperContent, 
  askPaperQuestion, 
  analyzeResearchGaps, 
  analyzeNovelty, 
  generateFypRecommendations, 
  generateResearchRoadmap, 
  generateProposalDraft, 
  chatResearchAssistant 
} from './src/server/aiService';
import { parsePdfBuffer, chunkDocumentText } from './src/server/pdfService';
import { ResearchItem } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Body parsers with generous limits for PDF uploads and base64 documents
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Simulated session store
let currentUserId = 'usr-student-1';

// ======================= AUTH ROUTES =======================

app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = repositoryStore.users.find(u => u.id === currentUserId) || repositoryStore.users[0];
  const savedIds = repositoryStore.savedResearchIds[user.id] || [];
  res.json({ user, savedResearchIds: savedIds });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email } = req.body;
  const user = repositoryStore.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || repositoryStore.users[0];
  currentUserId = user.id;
  const savedIds = repositoryStore.savedResearchIds[user.id] || [];
  res.json({ user, savedResearchIds: savedIds });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, role, departmentId } = req.body;
  const dept = repositoryStore.departments.find(d => d.id === departmentId);
  const newUser = {
    id: `usr-${Date.now()}`,
    name: name || 'Academic Researcher',
    email: email || `researcher-${Date.now()}@kiu.edu.pk`,
    role: role || 'student',
    departmentId: dept?.id,
    departmentName: dept?.name,
    institution: 'Karakoram International University',
    createdAt: new Date().toISOString().split('T')[0]
  };
  repositoryStore.users.push(newUser);
  currentUserId = newUser.id;
  repositoryStore.savedResearchIds[newUser.id] = [];
  res.json({ user: newUser, savedResearchIds: [] });
});

app.post('/api/auth/switch-role', (req: Request, res: Response) => {
  const { role } = req.body;
  const user = repositoryStore.users.find(u => u.id === currentUserId);
  if (user && role) {
    user.role = role;
  }
  res.json({ user });
});

// ======================= DEPARTMENTS & SOURCES =======================

app.get('/api/departments', (req: Request, res: Response) => {
  res.json({ departments: repositoryStore.departments });
});

app.get('/api/sources', (req: Request, res: Response) => {
  res.json({ sources: repositoryStore.sources });
});

app.post('/api/sources/verify', (req: Request, res: Response) => {
  const { id } = req.body;
  const source = repositoryStore.sources.find(s => s.id === id);
  if (source) {
    source.lastChecked = new Date().toISOString().split('T')[0];
    source.status = 'Online & Verified';
  }
  res.json({ success: true, source });
});

// ======================= RESEARCH REPOSITORY & SEARCH =======================

app.get('/api/research', (req: Request, res: Response) => {
  const { query, departmentId, researchType, year, openAccessOnly, verificationStatus } = req.query;
  const results = repositoryStore.searchResearch({
    query: query as string,
    departmentId: departmentId as string,
    researchType: researchType as string,
    year: year ? Number(year) : undefined,
    openAccessOnly: openAccessOnly === 'true',
    verificationStatus: verificationStatus as string
  });
  res.json(results);
});

app.get('/api/research/:id', (req: Request, res: Response) => {
  const item = repositoryStore.researchItems.find(r => r.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Research item not found in repository.' });
  }

  // Find related items by topic or department
  const related = repositoryStore.researchItems
    .filter(r => r.id !== item.id && (r.departmentId === item.departmentId || r.researchArea === item.researchArea))
    .slice(0, 3);

  // Find matching researchers
  const relatedResearchers = repositoryStore.researchers
    .filter(resch => resch.departmentId === item.departmentId)
    .slice(0, 2);

  res.json({ item, related, relatedResearchers });
});

app.post('/api/research/save-toggle', (req: Request, res: Response) => {
  const { researchItemId } = req.body;
  if (!repositoryStore.savedResearchIds[currentUserId]) {
    repositoryStore.savedResearchIds[currentUserId] = [];
  }
  const list = repositoryStore.savedResearchIds[currentUserId];
  const index = list.indexOf(researchItemId);
  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(researchItemId);
  }
  res.json({ savedResearchIds: list });
});

// PDF / Document Upload & Processing
app.post('/api/research/upload', async (req: Request, res: Response) => {
  try {
    const { title, text, base64Pdf, departmentId, researchType, authors, isOpenAccess } = req.body;
    let fullText = text || '';
    let pageCount = 1;

    const newId = `res-upload-${Date.now()}`;

    if (base64Pdf) {
      const buffer = Buffer.from(base64Pdf.replace(/^data:application\/pdf;base64,/, ''), 'base64');
      const parsed = await parsePdfBuffer(buffer, newId);
      fullText = parsed.text || fullText;
      pageCount = parsed.numPages || 1;
      // Index extracted chunks for vector / RAG search
      repositoryStore.chunks.push(...parsed.chunks);
    } else if (fullText) {
      const chunks = chunkDocumentText(fullText, newId, Math.max(1, Math.ceil(fullText.length / 2500)));
      repositoryStore.chunks.push(...chunks);
    }

    const dept = repositoryStore.departments.find(d => d.id === departmentId);

    const newItem: ResearchItem = {
      id: newId,
      title: title || 'User Uploaded Research Document',
      abstract: fullText.slice(0, 350) + (fullText.length > 350 ? '...' : ''),
      authors: Array.isArray(authors) && authors.length ? authors : ['User Contributor'],
      year: new Date().getFullYear(),
      researchType: researchType || 'Research Paper',
      departmentId: dept?.id,
      departmentName: dept?.name || 'Department of Computer Science',
      institution: 'Karakoram International University',
      keywords: ['User Upload', 'Extracted Document', dept?.name || 'Computing'],
      researchArea: dept?.researchAreas?.[0] || 'Applied Computing',
      methodology: 'Empirical document analysis extracted via KIU PDF parser',
      dataset: 'Specified within uploaded document corpus',
      sourceUrl: 'https://dasr.kiu.edu.pk/',
      isOpenAccess: isOpenAccess !== false,
      verificationStatus: 'student_submitted',
      citationCount: 0,
      uploadedBy: currentUserId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    repositoryStore.researchItems.unshift(newItem);

    res.json({
      success: true,
      item: newItem,
      pageCount,
      extractedLength: fullText.length,
      message: 'Document successfully parsed, chunked, and indexed into research repository.'
    });
  } catch (error: any) {
    console.error('Error handling upload:', error);
    res.status(500).json({ error: error.message || 'Failed to process document upload.' });
  }
});

// ======================= AI SERVICES =======================

// 1. Paper Analyzer
app.post('/api/ai/analyze-paper', async (req: Request, res: Response) => {
  try {
    const { paperText, paperTitle, paperId } = req.body;
    let textToAnalyze = paperText || '';

    if (paperId && !textToAnalyze) {
      const found = repositoryStore.researchItems.find(r => r.id === paperId);
      if (found) {
        textToAnalyze = `${found.title}\n\nAbstract: ${found.abstract}\n\nMethodology: ${found.methodology}\n\nDataset: ${found.dataset}\n\nResults: ${found.results}\n\nLimitations: ${found.limitations}\n\nFuture Work: ${found.futureWork}`;
      }
    }

    if (!textToAnalyze || textToAnalyze.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide document text or select a valid paper to analyze.' });
    }

    const analysis = await analyzePaperContent(textToAnalyze, paperTitle);
    res.json({ analysis });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to analyze paper.' });
  }
});

// 2. Ask This Paper
app.post('/api/ai/ask-paper', async (req: Request, res: Response) => {
  try {
    const { paperText, question, paperTitle, paperId } = req.body;
    let textToQuery = paperText || '';

    if (paperId && !textToQuery) {
      const found = repositoryStore.researchItems.find(r => r.id === paperId);
      if (found) {
        textToQuery = `${found.title}\n\nAbstract: ${found.abstract}\n\nMethodology: ${found.methodology}\n\nDataset: ${found.dataset}\n\nResults: ${found.results}\n\nLimitations: ${found.limitations}\n\nFuture Work: ${found.futureWork}`;
      }
    }

    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Please enter a question about this paper.' });
    }

    const result = await askPaperQuestion(textToQuery, question, paperTitle);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to answer question.' });
  }
});

// 3. Research Gap Analyzer
app.post('/api/ai/research-gap', async (req: Request, res: Response) => {
  try {
    const { topic } = req.body;
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Please provide a research topic to analyze gaps.' });
    }

    // Retrieve relevant indexed literature chunks
    const chunks = repositoryStore.retrieveRelevantChunks(topic, 8);
    const literatureContext = chunks.map(c => `[Chunk ${c.id} - ${c.section} (Page ${c.pageNumber})]: ${c.content}`).join('\n\n');

    const result = await analyzeResearchGaps(topic, literatureContext || 'General indexed KIU mountain hazards, agriculture, and AI studies.');
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to analyze research gaps.' });
  }
});

// 4. Novelty & Semantic Similarity Analyzer
app.post('/api/ai/novelty-analysis', async (req: Request, res: Response) => {
  try {
    const { proposedIdea, department } = req.body;
    if (!proposedIdea || !proposedIdea.trim()) {
      return res.status(400).json({ error: 'Please enter your proposed FYP / research idea.' });
    }

    const chunks = repositoryStore.retrieveRelevantChunks(proposedIdea, 6);
    const context = chunks.map(c => `${c.section}: ${c.content}`).join('\n\n');

    const analysis = await analyzeNovelty(proposedIdea, department || 'Computer Science', context);
    res.json({ analysis });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to analyze research novelty.' });
  }
});

// 5. FYP Idea Advisor
app.post('/api/ai/fyp-advisor', async (req: Request, res: Response) => {
  try {
    const { department, skills, interests, preferredTechnology, difficulty } = req.body;
    const recommendations = await generateFypRecommendations({
      department: department || 'Department of Computer Science',
      skills: skills || 'Python, Deep Learning, Edge Hardware',
      interests: interests || 'Computer Vision for Local Agriculture',
      preferredTechnology: preferredTechnology || 'PyTorch, TensorFlow Lite, Android',
      difficulty: difficulty || 'Intermediate'
    });
    res.json({ recommendations });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate recommendations.' });
  }
});

// 6. Research Roadmap (FYP -> MS -> PhD)
app.post('/api/ai/roadmap', async (req: Request, res: Response) => {
  try {
    const { topic, department } = req.body;
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Please enter a research topic to build a roadmap.' });
    }
    const stages = await generateResearchRoadmap(topic, department || 'Computer Science');
    res.json({ stages });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate roadmap.' });
  }
});

// 7. Research Proposal Builder
app.post('/api/ai/proposal', async (req: Request, res: Response) => {
  try {
    const { topic, problem, opportunity, department } = req.body;
    const verifiedReferences = repositoryStore.researchItems.slice(0, 4).map(r => ({
      title: r.title,
      authors: r.authors,
      year: r.year,
      doi: r.doi,
      url: r.sourceUrl
    }));

    const proposal = await generateProposalDraft({
      topic: topic || 'Edge AI for Mountain Environmental Monitoring',
      problem: problem || 'Infrastructural constraints in high altitude regions.',
      opportunity: opportunity || 'Deployment of localized TinyML sensor models.',
      department: department || 'Department of Computer Science',
      verifiedReferences
    });
    res.json({ proposal });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate proposal draft.' });
  }
});

// 8. General RAG Chat
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const chunks = repositoryStore.retrieveRelevantChunks(message, 6);
    const context = chunks.map(c => `[Doc: ${c.researchItemId} (Page ${c.pageNumber})]: ${c.content}`).join('\n\n');

    const result = await chatResearchAssistant(message, context, history || []);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to process chat message.' });
  }
});

// ======================= DATASETS & RESEARCHERS =======================

app.get('/api/datasets', (req: Request, res: Response) => {
  const { query, domain, source } = req.query;
  let items = repositoryStore.datasets;
  if (query) {
    const q = (query as string).toLowerCase();
    items = items.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q)));
  }
  if (domain) {
    items = items.filter(d => d.domain.toLowerCase().includes((domain as string).toLowerCase()));
  }
  if (source) {
    items = items.filter(d => d.source === source);
  }
  res.json({ datasets: items });
});

app.get('/api/researchers', (req: Request, res: Response) => {
  const { departmentId } = req.query;
  let items = repositoryStore.researchers;
  if (departmentId) {
    items = items.filter(r => r.departmentId === departmentId);
  }
  res.json({ researchers: items });
});

app.post('/api/researchers/match', (req: Request, res: Response) => {
  const { interests } = req.body;
  if (!interests || !interests.trim()) {
    return res.status(400).json({ error: 'Please enter your research interests to match supervisors.' });
  }
  const matches = repositoryStore.matchResearchers(interests);
  res.json({ matches });
});

// ======================= KNOWLEDGE GRAPH =======================

app.get('/api/knowledge-graph', (req: Request, res: Response) => {
  const graph = repositoryStore.getKnowledgeGraph();
  res.json(graph);
});

// ======================= LITERATURE WORKSPACE & PROJECTS =======================

app.get('/api/literature/projects', (req: Request, res: Response) => {
  const userProjects = repositoryStore.projects.filter(p => p.userId === currentUserId);
  res.json({ projects: userProjects });
});

app.post('/api/literature/projects', (req: Request, res: Response) => {
  const { title, researchArea, problem, objectives, researchQuestions, dataset, methodology } = req.body;
  const newProj = {
    id: `proj-${Date.now()}`,
    userId: currentUserId,
    title: title || 'New Research Workspace',
    description: problem || '',
    researchArea: researchArea || 'Computer Science',
    problem: problem || '',
    objectives: Array.isArray(objectives) ? objectives : ['Systematic literature review'],
    researchQuestions: Array.isArray(researchQuestions) ? researchQuestions : [],
    dataset: dataset || '',
    methodology: methodology || '',
    relatedPaperIds: [],
    status: 'Idea' as const,
    notes: [],
    updatedAt: new Date().toISOString().split('T')[0]
  };
  repositoryStore.projects.unshift(newProj);
  res.json({ project: newProj });
});

app.post('/api/literature/notes', (req: Request, res: Response) => {
  const { projectId, content, tag } = req.body;
  const proj = repositoryStore.projects.find(p => p.id === projectId);
  if (proj) {
    const newNote = {
      id: `note-${Date.now()}`,
      content: content || '',
      date: new Date().toISOString().split('T')[0],
      tag: tag || 'General'
    };
    proj.notes.push(newNote);
    proj.updatedAt = new Date().toISOString().split('T')[0];
    return res.json({ note: newNote, project: proj });
  }
  res.status(404).json({ error: 'Project not found.' });
});

// ======================= PAPER COMPARISON =======================

app.post('/api/compare', (req: Request, res: Response) => {
  const { paperIds } = req.body;
  if (!Array.isArray(paperIds) || paperIds.length === 0) {
    return res.status(400).json({ error: 'Please select papers to compare.' });
  }
  const papers = repositoryStore.researchItems.filter(p => paperIds.includes(p.id));
  res.json({ papers });
});

// ======================= ADMIN ANALYTICS & VERIFICATION =======================

app.get('/api/admin/analytics', (req: Request, res: Response) => {
  const totalResearch = repositoryStore.researchItems.length;
  const totalUsers = repositoryStore.users.length;
  const totalDepartments = repositoryStore.departments.length;
  const totalResearchers = repositoryStore.researchers.length;
  const pendingSubmissions = repositoryStore.researchItems.filter(r => r.verificationStatus === 'pending_verification' || r.verificationStatus === 'student_submitted').length;

  const typeDistribution: Record<string, number> = {};
  for (const item of repositoryStore.researchItems) {
    typeDistribution[item.researchType] = (typeDistribution[item.researchType] || 0) + 1;
  }

  const deptDistribution: Record<string, number> = {};
  for (const item of repositoryStore.researchItems) {
    const name = item.departmentName || 'General';
    deptDistribution[name] = (deptDistribution[name] || 0) + 1;
  }

  res.json({
    metrics: {
      totalResearch,
      totalUsers,
      totalDepartments,
      totalResearchers,
      pendingSubmissions,
      verifiedSources: repositoryStore.sources.filter(s => s.status === 'Online & Verified').length
    },
    typeDistribution,
    deptDistribution,
    sources: repositoryStore.sources
  });
});

app.post('/api/admin/verify-item', (req: Request, res: Response) => {
  const { id, status } = req.body;
  const item = repositoryStore.researchItems.find(r => r.id === id);
  if (item) {
    item.verificationStatus = status || 'verified_research';
  }
  res.json({ success: true, item });
});

// ======================= VITE & STATIC FILES =======================

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KIU Research Intelligence Lab server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
});
