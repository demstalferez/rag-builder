// Tipos principales para la configuración de RAG

export type LLMProvider = 'ollama' | 'openai' | 'anthropic' | 'huggingface' | 'local';
export type VectorDBProvider = 'chromadb' | 'faiss' | 'qdrant' | 'milvus' | 'pinecone' | 'pgvector';
export type EmbeddingProvider = 'sentence-transformers' | 'openai' | 'huggingface' | 'ollama';
export type InfrastructureType = 'local' | 'hybrid' | 'cloud';
export type UseCaseType = 'scientific' | 'legal' | 'code' | 'documentation' | 'customer-support' | 'general';
export type ComplexityLevel = 'basic' | 'advanced' | 'enterprise';

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
  baseUrl?: string;
}

export interface EmbeddingConfig {
  provider: EmbeddingProvider;
  model: string;
  dimensions?: number;
}

export interface VectorDBConfig {
  provider: VectorDBProvider;
  collectionName: string;
  persistPath?: string;
  host?: string;
  port?: number;
  apiKey?: string;
}

export interface ChunkingConfig {
  strategy: 'recursive' | 'fixed' | 'semantic' | 'markdown';
  chunkSize: number;
  chunkOverlap: number;
  separators?: string[];
}

export interface RetrievalConfig {
  topK: number;
  useHybridSearch: boolean;
  useReranking: boolean;
  rerankerModel?: string;
  hybridAlpha?: number;
}

export interface RAGConfig {
  projectName: string;
  description: string;

  // Nivel y tipo
  complexity: ComplexityLevel;
  useCase: UseCaseType;
  infrastructure: InfrastructureType;

  // Componentes
  llm: LLMConfig;
  embedding: EmbeddingConfig;
  vectorDB: VectorDBConfig;
  chunking: ChunkingConfig;
  retrieval: RetrievalConfig;

  // Opciones adicionales
  includeDocker: boolean;
  includeTests: boolean;
  includeAPI: boolean;
  includeUI: boolean;
  language: 'python' | 'typescript';
}

// Configuraciones predefinidas
export const DEFAULT_CONFIGS: Record<ComplexityLevel, Partial<RAGConfig>> = {
  basic: {
    complexity: 'basic',
    llm: {
      provider: 'ollama',
      model: 'llama3.1:8b',
      temperature: 0.7,
    },
    embedding: {
      provider: 'sentence-transformers',
      model: 'paraphrase-multilingual-MiniLM-L12-v2',
      dimensions: 384,
    },
    vectorDB: {
      provider: 'chromadb',
      collectionName: 'documents',
      persistPath: './chroma_db',
    },
    chunking: {
      strategy: 'recursive',
      chunkSize: 500,
      chunkOverlap: 100,
    },
    retrieval: {
      topK: 3,
      useHybridSearch: false,
      useReranking: false,
    },
    includeDocker: true,
    includeTests: false,
    includeAPI: false,
    includeUI: false,
  },
  advanced: {
    complexity: 'advanced',
    llm: {
      provider: 'ollama',
      model: 'llama3.1:8b',
      temperature: 0.3,
    },
    embedding: {
      provider: 'sentence-transformers',
      model: 'BAAI/bge-m3',
      dimensions: 1024,
    },
    vectorDB: {
      provider: 'qdrant',
      collectionName: 'documents',
      host: 'localhost',
      port: 6333,
    },
    chunking: {
      strategy: 'recursive',
      chunkSize: 800,
      chunkOverlap: 150,
    },
    retrieval: {
      topK: 5,
      useHybridSearch: true,
      useReranking: true,
      rerankerModel: 'cross-encoder/ms-marco-MiniLM-L-6-v2',
      hybridAlpha: 0.5,
    },
    includeDocker: true,
    includeTests: true,
    includeAPI: true,
    includeUI: false,
  },
  enterprise: {
    complexity: 'enterprise',
    llm: {
      provider: 'ollama',
      model: 'llama3.1:70b',
      temperature: 0.2,
    },
    embedding: {
      provider: 'sentence-transformers',
      model: 'BAAI/bge-m3',
      dimensions: 1024,
    },
    vectorDB: {
      provider: 'qdrant',
      collectionName: 'documents',
      host: 'localhost',
      port: 6333,
    },
    chunking: {
      strategy: 'semantic',
      chunkSize: 1000,
      chunkOverlap: 200,
    },
    retrieval: {
      topK: 7,
      useHybridSearch: true,
      useReranking: true,
      rerankerModel: 'cross-encoder/ms-marco-MiniLM-L-6-v2',
      hybridAlpha: 0.5,
    },
    includeDocker: true,
    includeTests: true,
    includeAPI: true,
    includeUI: true,
  },
};

// Modelos disponibles por proveedor
export const AVAILABLE_MODELS: Record<LLMProvider, string[]> = {
  ollama: ['llama3.1:8b', 'llama3.1:70b', 'mistral:7b', 'mixtral:8x7b', 'qwen2.5:7b', 'qwen2.5:72b', 'gemma2:9b', 'phi3:14b'],
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229', 'claude-3-haiku-20240307'],
  huggingface: ['meta-llama/Llama-3.1-8B-Instruct', 'mistralai/Mistral-7B-Instruct-v0.2', 'Qwen/Qwen2.5-7B-Instruct'],
  local: ['custom'],
};

export const EMBEDDING_MODELS: Record<EmbeddingProvider, string[]> = {
  'sentence-transformers': [
    'paraphrase-multilingual-MiniLM-L12-v2',
    'BAAI/bge-m3',
    'intfloat/multilingual-e5-large',
    'BAAI/bge-large-en-v1.5',
  ],
  openai: ['text-embedding-3-small', 'text-embedding-3-large', 'text-embedding-ada-002'],
  huggingface: ['BAAI/bge-m3', 'intfloat/e5-large-v2'],
  ollama: ['nomic-embed-text', 'mxbai-embed-large'],
};
