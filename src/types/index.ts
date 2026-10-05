export type UserRole = 'student' | 'scholar' | 'faculty' | 'admin' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  departmentName?: string;
  institution?: string;
  researchInterests?: string[];
  avatarUrl?: string;
  createdAt: string;
}

export type VerificationStatus = 
  | 'official_kiu' 
  | 'verified_research' 
  | 'student_submitted' 
  | 'faculty_submitted' 
  | 'open_scholarly' 
  | 'ai_generated' 
  | 'pending_verification';

export type ResearchType = 
  | 'FYP' 
  | 'MS/MPhil Thesis' 
  | 'PhD Thesis' 
  | 'Journal Publication' 
  | 'Conference Paper' 
  | 'Research Project' 
  | 'Dataset' 
  | 'Technical Report' 
  | 'Review Paper';

export interface Department {
  id: string;
  name: string;
  faculty: string;
  officialUrl: string;
  sourceUrl: string;
  verified: boolean;
  programs: string[];
  researchAreas: string[];
  headOfDepartment?: string;
  lastChecked: string;
}

export interface Researcher {
  id: string;
  name: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  institution: string;
  researchInterests: string[];
  profileUrl: string;
  officialSourceUrl: string;
  verified: boolean;
  emailContact?: string;
  publicationsCount: number;
  featuredTopics: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  year: number;
  researchType: ResearchType;
  departmentId?: string;
  departmentName?: string;
  institution: string;
  keywords: string[];
  researchArea: string;
  methodology: string;
  dataset: string;
  modelsOrAlgorithms?: string;
  evaluationMetrics?: string;
  results?: string;
  limitations?: string;
  futureWork?: string;
  doi?: string;
  sourceUrl: string;
  pdfUrl?: string;
  isOpenAccess: boolean;
  license?: string;
  verificationStatus: VerificationStatus;
  officialSourceBadge?: boolean;
  citationCount?: number;
  uploadedBy?: string;
  createdAt: string;
}

export interface ResearchChunk {
  id: string;
  researchItemId: string;
  pageNumber: number;
  section: string;
  content: string;
}

export interface PaperAnalysis {
  title: string;
  authors: string[];
  year?: number;
  abstract: string;
  researchField: string;
  researchProblem: string;
  researchQuestions: string[];
  objectives: string[];
  methodology: string;
  dataset: string;
  sampleSize: string;
  models: string[];
  algorithms: string[];
  evaluationMetrics: string[];
  results: string;
  limitations: string[];
  futureWork: string[];
  contributions: string[];
  reproducibilityInfo: string;
  importantReferences: string[];
  sourceCitations: { page: number; section: string; quote: string }[];
}

export interface ResearchGap {
  id: string;
  topic: string;
  category: 
    | 'Dataset Gap' 
    | 'Geographic Gap' 
    | 'Methodological Gap' 
    | 'Evaluation Gap' 
    | 'Deployment Gap' 
    | 'Domain Gap' 
    | 'Temporal Gap' 
    | 'Reproducibility Gap';
  title: string;
  opportunity: string;
  evidence: string[];
  evidenceType: 
    | 'Author-stated limitation' 
    | 'Future work recommendation' 
    | 'Methodological comparison' 
    | 'Dataset limitation' 
    | 'Geographic limitation' 
    | 'Literature synthesis';
  confidence: 'High evidence' | 'Moderate evidence' | 'Limited evidence';
  supportingPaperIds: string[];
  suggestedNextSteps: string[];
}

export interface NoveltyAnalysis {
  proposedTitle: string;
  problemDomain: string;
  similarExistingResearch: {
    paperId?: string;
    title: string;
    similarityScore: number;
    sharedAspects: string[];
    differences: string[];
  }[];
  noveltyScore: number; // 0-100
  potentialNovelContributions: string[];
  risksAndPitfalls: string[];
  recommendedImprovements: string[];
  recommendedMethodologies: string[];
  disclaimer: string;
}

export interface FypRecommendation {
  id: string;
  title: string;
  problem: string;
  motivation: string;
  researchQuestions: string[];
  objectives: string[];
  proposedMethodology: string;
  datasetOptions: string[];
  technologies: string[];
  expectedContribution: string;
  difficulty: 'Beginner-Friendly' | 'Intermediate' | 'Advanced';
  estimatedScopeMonths: number;
  relatedLiterature: string[];
  potentialLimitations: string[];
  futureResearchDirection: string;
}

export interface ResearchRoadmapStage {
  stage: 'Stage 1 — FYP' | 'Stage 2 — MS/MPhil' | 'Stage 3 — PhD';
  focus: string;
  duration: string;
  datasetScope: string;
  methodologyLevel: string;
  evaluationDepth: string;
  expectedDeliverable: string;
  noveltyExpectation: string;
  keyMilestones: string[];
}

export interface ResearchProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  departmentId?: string;
  researchArea: string;
  problem: string;
  objectives: string[];
  researchQuestions: string[];
  dataset: string;
  methodology: string;
  relatedPaperIds: string[];
  status: 
    | 'Idea' 
    | 'Literature Review' 
    | 'Proposal' 
    | 'Development' 
    | 'Experiment' 
    | 'Evaluation' 
    | 'Writing' 
    | 'Completed';
  notes: { id: string; content: string; date: string; tag?: string }[];
  updatedAt: string;
}

export interface DatasetItem {
  id: string;
  name: string;
  description: string;
  domain: string;
  size: string;
  format: string;
  license: string;
  isFree: boolean;
  source: 'Kaggle' | 'UCI' | 'Hugging Face' | 'OpenML' | 'KIU / Regional Repository' | 'Government Portal';
  sourceUrl: string;
  downloadUrl?: string;
  citation?: string;
  tags: string[];
}

export interface LiteratureMatrixRow {
  paperId: string;
  title: string;
  authors: string;
  year: number;
  problem: string;
  dataset: string;
  method: string;
  results: string;
  limitations: string;
  futureWork: string;
  userNotes?: string;
  tags?: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'paper' | 'researcher' | 'topic' | 'method' | 'dataset' | 'department';
  val?: number;
  color?: string;
  details?: Record<string, any>;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
  type: 'authored' | 'uses_method' | 'uses_dataset' | 'belongs_to' | 'cites' | 'has_limitation';
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface ProposalDraft {
  title: string;
  background: string;
  problemStatement: string;
  researchGap: string;
  researchQuestions: string[];
  objectives: string[];
  proposedMethodology: string;
  dataset: string;
  evaluationStrategy: string;
  expectedContribution: string;
  limitations: string;
  futureWork: string;
  references: { id: string; citation: string; doi?: string; url?: string }[];
}

export interface SourceRegistryItem {
  id: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: 'KIU Official Portal' | 'DASR Directorate' | 'Faculty Profile' | 'OpenAlex' | 'Crossref' | 'arXiv' | 'Semantic Scholar';
  official: boolean;
  lastChecked: string;
  status: 'Online & Verified' | 'Needs Recheck' | 'Unreachable';
  notes: string;
}
