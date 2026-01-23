import {
  Database,
  Brain,
  Settings,
  Download,
  Sparkles,
  Server,
  Cloud,
  FileText,
  Code,
  Scale,
  BookOpen,
  HeadphonesIcon,
  Layers
} from 'lucide-react';
import { UseCaseType, InfrastructureType, LLMProvider, EmbeddingProvider, VectorDBProvider } from '@/lib/types';
import { Step, UseCaseInfo, InfrastructureInfo } from './types';

export const STEPS: Step[] = [
  { id: 1, name: 'Nivel', icon: Layers },
  { id: 2, name: 'Caso de Uso', icon: FileText },
  { id: 3, name: 'LLM', icon: Brain },
  { id: 4, name: 'Embeddings', icon: Sparkles },
  { id: 5, name: 'Base de Datos', icon: Database },
  { id: 6, name: 'Configuracion', icon: Settings },
  { id: 7, name: 'Descargar', icon: Download },
];

export const USE_CASE_INFO: Record<UseCaseType, UseCaseInfo> = {
  scientific: { name: 'Cientifico', description: 'Papers, investigacion, documentos tecnicos', icon: BookOpen },
  legal: { name: 'Legal', description: 'Contratos, leyes, documentos legales', icon: Scale },
  code: { name: 'Codigo', description: 'Repositorios, documentacion tecnica, APIs', icon: Code },
  documentation: { name: 'Documentacion', description: 'Manuales, guias, wikis', icon: FileText },
  'customer-support': { name: 'Soporte', description: 'FAQs, tickets, atencion al cliente', icon: HeadphonesIcon },
  general: { name: 'General', description: 'Uso general, sin especializacion', icon: Layers },
};

export const INFRASTRUCTURE_INFO: Record<InfrastructureType, InfrastructureInfo> = {
  local: { name: 'Local', description: 'Todo en tu maquina, sin APIs externas', icon: Server },
  hybrid: { name: 'Hibrido', description: 'Modelos locales con servicios cloud', icon: Layers },
  cloud: { name: 'Cloud', description: 'APIs y servicios cloud completos', icon: Cloud },
};

export const LLM_PROVIDERS: { id: LLMProvider; name: string; description: string; local: boolean }[] = [
  { id: 'ollama', name: 'Ollama', description: 'Modelos locales, privacidad total', local: true },
  { id: 'openai', name: 'OpenAI', description: 'GPT-4, alta calidad', local: false },
  { id: 'anthropic', name: 'Anthropic', description: 'Claude, seguro y potente', local: false },
  { id: 'huggingface', name: 'HuggingFace', description: 'Acceso a miles de modelos', local: false },
];

export const EMBEDDING_PROVIDERS: { id: EmbeddingProvider; name: string; description: string }[] = [
  { id: 'sentence-transformers', name: 'Sentence Transformers', description: 'Locales, multilingues, gratuitos' },
  { id: 'openai', name: 'OpenAI', description: 'text-embedding-3, alta calidad' },
  { id: 'ollama', name: 'Ollama', description: 'nomic-embed, local' },
  { id: 'huggingface', name: 'HuggingFace', description: 'BGE, E5 y mas' },
];

export const VECTOR_DATABASES: { id: VectorDBProvider; name: string; description: string; local: boolean }[] = [
  { id: 'chromadb', name: 'ChromaDB', description: 'Simple, embebido, perfecto para empezar', local: true },
  { id: 'faiss', name: 'FAISS', description: 'Meta AI, muy rapido, local', local: true },
  { id: 'qdrant', name: 'Qdrant', description: 'Produccion, filtros avanzados', local: true },
  { id: 'milvus', name: 'Milvus', description: 'Escalable, cloud-native', local: false },
  { id: 'pinecone', name: 'Pinecone', description: 'Serverless, managed', local: false },
  { id: 'pgvector', name: 'pgvector', description: 'PostgreSQL con vectores', local: true },
];

export const LOCAL_STORAGE_KEY = 'rag-builder-config';
