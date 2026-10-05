import { createRequire } from 'module';
import { ResearchChunk } from '../types';

const require = createRequire(import.meta.url);
let pdfParse: any;
try {
  pdfParse = require('pdf-parse');
} catch (err) {
  console.warn('pdf-parse module could not be loaded via require, falling back to text extraction:', err);
}

export interface ExtractedDocument {
  text: string;
  numPages: number;
  info: any;
  chunks: ResearchChunk[];
  detectedSections: string[];
}

const SECTION_HEADERS = [
  'abstract',
  'introduction',
  'background',
  'related work',
  'literature review',
  'methodology',
  'proposed method',
  'materials and methods',
  'dataset',
  'experimental setup',
  'experiments',
  'results',
  'discussion',
  'limitations',
  'future work',
  'conclusion',
  'references'
];

/**
 * Parses raw PDF buffer and extracts text, page estimations, and section chunks
 */
export async function parsePdfBuffer(buffer: Buffer, documentId: string): Promise<ExtractedDocument> {
  try {
    const data = await pdfParse(buffer);
    const fullText = data.text || '';
    const numPages = data.numpages || 1;
    
    const chunks = chunkDocumentText(fullText, documentId, numPages);
    const detectedSections = detectSections(fullText);

    return {
      text: fullText,
      numPages,
      info: data.info || {},
      chunks,
      detectedSections
    };
  } catch (error) {
    console.error('Error parsing PDF buffer with pdf-parse:', error);
    // Fallback: treat buffer as utf-8 text
    const text = buffer.toString('utf-8');
    const chunks = chunkDocumentText(text, documentId, 1);
    return {
      text,
      numPages: 1,
      info: {},
      chunks,
      detectedSections: detectSections(text)
    };
  }
}

/**
 * Chunks text into structured paragraph chunks with detected page numbers and sections
 */
export function chunkDocumentText(text: string, documentId: string, totalPages: number = 1): ResearchChunk[] {
  const paragraphs = text.split(/\n\s*\n/);
  const chunks: ResearchChunk[] = [];
  
  let currentSection = 'Introduction / Overview';
  const totalChars = text.length || 1;
  let charCounter = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i].trim();
    if (!p || p.length < 30) continue;

    // Check if this paragraph starts with a known section header
    const lowerP = p.toLowerCase().slice(0, 50);
    for (const header of SECTION_HEADERS) {
      if (lowerP.startsWith(header) || lowerP.includes(`\n${header}`)) {
        currentSection = header.toUpperCase();
        break;
      }
    }

    charCounter += p.length;
    // Estimate page number based on character progression
    const estimatedPage = Math.min(totalPages, Math.max(1, Math.ceil((charCounter / totalChars) * totalPages)));

    chunks.push({
      id: `chunk-${documentId}-${chunks.length + 1}`,
      researchItemId: documentId,
      pageNumber: estimatedPage,
      section: currentSection,
      content: p
    });
  }

  return chunks;
}

function detectSections(text: string): string[] {
  const detected: string[] = [];
  const lower = text.toLowerCase();
  for (const h of SECTION_HEADERS) {
    if (lower.includes(h)) {
      detected.push(h.charAt(0).toUpperCase() + h.slice(1));
    }
  }
  return detected;
}
