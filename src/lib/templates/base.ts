import { RAGConfig } from '../types';

export function generateRequirements(config: RAGConfig): string {
  const deps: string[] = [
    '# Core dependencies',
    'langchain>=0.1.0',
    'langchain-community>=0.0.10',
  ];

  // Embedding provider
  if (config.embedding.provider === 'sentence-transformers') {
    deps.push('sentence-transformers>=2.2.0');
    deps.push('langchain-huggingface>=0.0.1');
  } else if (config.embedding.provider === 'openai') {
    deps.push('langchain-openai>=0.0.2');
  }

  // Vector DB
  deps.push('', '# Vector Database');
  switch (config.vectorDB.provider) {
    case 'chromadb':
      deps.push('chromadb>=0.4.0');
      break;
    case 'faiss':
      deps.push('faiss-cpu>=1.7.0');
      break;
    case 'qdrant':
      deps.push('qdrant-client>=1.7.0');
      break;
    case 'milvus':
      deps.push('pymilvus>=2.3.0');
      break;
    case 'pinecone':
      deps.push('pinecone-client>=2.2.0');
      break;
    case 'pgvector':
      deps.push('pgvector>=0.2.0');
      deps.push('psycopg2-binary>=2.9.0');
      break;
  }

  // LLM Provider
  deps.push('', '# LLM Provider');
  switch (config.llm.provider) {
    case 'ollama':
      deps.push('langchain-ollama>=0.0.1');
      break;
    case 'openai':
      deps.push('langchain-openai>=0.0.2');
      break;
    case 'anthropic':
      deps.push('langchain-anthropic>=0.0.1');
      break;
    case 'huggingface':
      deps.push('transformers>=4.36.0');
      deps.push('torch>=2.0.0');
      deps.push('accelerate>=0.25.0');
      break;
  }

  // Advanced features
  if (config.retrieval.useHybridSearch) {
    deps.push('', '# Hybrid Search');
    deps.push('rank-bm25>=0.2.0');
  }

  if (config.retrieval.useReranking) {
    deps.push('', '# Reranking');
    deps.push('sentence-transformers>=2.2.0');
  }

  // Document processing
  deps.push('', '# Document Processing');
  deps.push('pypdf>=3.0.0');
  deps.push('python-docx>=1.0.0');
  deps.push('unstructured>=0.10.0');

  // Utilities
  deps.push('', '# Utilities');
  deps.push('python-dotenv>=1.0.0');
  deps.push('pydantic>=2.0.0');
  deps.push('tqdm>=4.66.0');

  if (config.includeAPI) {
    deps.push('', '# API');
    deps.push('fastapi>=0.104.0');
    deps.push('uvicorn>=0.24.0');
  }

  if (config.includeTests) {
    deps.push('', '# Testing');
    deps.push('pytest>=7.4.0');
    deps.push('pytest-asyncio>=0.21.0');
  }

  return deps.join('\n');
}

export function generateEnvFile(config: RAGConfig): string {
  const envVars: string[] = [
    '# RAG Configuration',
    `PROJECT_NAME="${config.projectName}"`,
    '',
  ];

  // LLM config
  envVars.push('# LLM Configuration');
  envVars.push(`LLM_PROVIDER="${config.llm.provider}"`);
  envVars.push(`LLM_MODEL="${config.llm.model}"`);
  envVars.push(`LLM_TEMPERATURE=${config.llm.temperature || 0.7}`);

  if (config.llm.provider === 'ollama') {
    envVars.push(`OLLAMA_BASE_URL="${config.llm.baseUrl || 'http://localhost:11434'}"`);
  } else if (config.llm.provider === 'openai') {
    envVars.push('OPENAI_API_KEY="your-openai-api-key"');
  } else if (config.llm.provider === 'anthropic') {
    envVars.push('ANTHROPIC_API_KEY="your-anthropic-api-key"');
  }

  // Embedding config
  envVars.push('', '# Embedding Configuration');
  envVars.push(`EMBEDDING_PROVIDER="${config.embedding.provider}"`);
  envVars.push(`EMBEDDING_MODEL="${config.embedding.model}"`);

  // Vector DB config
  envVars.push('', '# Vector Database Configuration');
  envVars.push(`VECTORDB_PROVIDER="${config.vectorDB.provider}"`);
  envVars.push(`COLLECTION_NAME="${config.vectorDB.collectionName}"`);

  if (config.vectorDB.provider === 'chromadb') {
    envVars.push(`CHROMA_PERSIST_PATH="${config.vectorDB.persistPath || './chroma_db'}"`);
  } else if (config.vectorDB.provider === 'qdrant') {
    envVars.push(`QDRANT_HOST="${config.vectorDB.host || 'localhost'}"`);
    envVars.push(`QDRANT_PORT=${config.vectorDB.port || 6333}`);
  } else if (config.vectorDB.provider === 'pinecone') {
    envVars.push('PINECONE_API_KEY="your-pinecone-api-key"');
    envVars.push('PINECONE_ENVIRONMENT="your-environment"');
  }

  // Chunking config
  envVars.push('', '# Chunking Configuration');
  envVars.push(`CHUNK_SIZE=${config.chunking.chunkSize}`);
  envVars.push(`CHUNK_OVERLAP=${config.chunking.chunkOverlap}`);

  // Retrieval config
  envVars.push('', '# Retrieval Configuration');
  envVars.push(`TOP_K=${config.retrieval.topK}`);
  envVars.push(`USE_HYBRID_SEARCH=${config.retrieval.useHybridSearch}`);
  envVars.push(`USE_RERANKING=${config.retrieval.useReranking}`);

  if (config.retrieval.useHybridSearch) {
    envVars.push(`HYBRID_ALPHA=${config.retrieval.hybridAlpha || 0.5}`);
  }

  if (config.retrieval.useReranking) {
    envVars.push(`RERANKER_MODEL="${config.retrieval.rerankerModel}"`);
  }

  // API Configuration (if API is included)
  if (config.includeAPI) {
    envVars.push('', '# API Configuration');
    envVars.push('CORS_ORIGINS="http://localhost:3000,http://localhost:8000"');
    envVars.push('CORS_ALLOW_ALL="false"');
    envVars.push('RATE_LIMIT_REQUESTS=60');
    envVars.push('RATE_LIMIT_WINDOW=60');
  }

  return envVars.join('\n');
}

export function generateEnvExample(config: RAGConfig): string {
  return generateEnvFile(config).replace(/="[^"]*"/g, '=""').replace(/=\d+(\.\d+)?/g, '=');
}

export function generateGitignore(): string {
  return `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual environment
venv/
ENV/
env/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# Data
data/
*.pdf
*.docx
*.doc

# Vector stores
chroma_db/
faiss_index/
*.index

# Logs
logs/
*.log

# OS
.DS_Store
Thumbs.db

# Docker
.docker/
`;
}

export function generateDockerfile(config: RAGConfig): string {
  return `FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    build-essential \\
    curl \\
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create directories
RUN mkdir -p data logs ${config.vectorDB.provider === 'chromadb' ? 'chroma_db' : ''}

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

${config.includeAPI ? `
# Expose API port
EXPOSE 8000

# Run the API server
CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
` : `
# Run the main script
CMD ["python", "-m", "src.main"]
`}
`;
}

export function generateDockerCompose(config: RAGConfig): string {
  const services: string[] = [];

  // Main app service
  services.push(`  app:
    build: .
    container_name: ${config.projectName.replace(/\s+/g, '-').toLowerCase()}-app
    env_file:
      - .env
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs${config.vectorDB.provider === 'chromadb' ? '\n      - ./chroma_db:/app/chroma_db' : ''}
    depends_on:${config.llm.provider === 'ollama' ? '\n      - ollama' : ''}${config.vectorDB.provider === 'qdrant' ? '\n      - qdrant' : ''}
    ${config.includeAPI ? 'ports:\n      - "8000:8000"' : ''}`);

  // Ollama service if needed
  if (config.llm.provider === 'ollama') {
    services.push(`
  ollama:
    image: ollama/ollama:latest
    container_name: ${config.projectName.replace(/\s+/g, '-').toLowerCase()}-ollama
    volumes:
      - ollama_data:/root/.ollama
    ports:
      - "11434:11434"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]`);
  }

  // Vector DB service if needed
  if (config.vectorDB.provider === 'qdrant') {
    services.push(`
  qdrant:
    image: qdrant/qdrant:latest
    container_name: ${config.projectName.replace(/\s+/g, '-').toLowerCase()}-qdrant
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - qdrant_data:/qdrant/storage`);
  }

  // Volumes
  const volumes: string[] = [];
  if (config.llm.provider === 'ollama') {
    volumes.push('  ollama_data:');
  }
  if (config.vectorDB.provider === 'qdrant') {
    volumes.push('  qdrant_data:');
  }

  return `version: '3.8'

services:
${services.join('\n')}

${volumes.length > 0 ? `volumes:\n${volumes.join('\n')}` : ''}
`;
}

export function generateReadme(config: RAGConfig): string {
  return `# ${config.projectName}

${config.description}

## Features

- **LLM Provider**: ${config.llm.provider} (${config.llm.model})
- **Embeddings**: ${config.embedding.provider} (${config.embedding.model})
- **Vector Database**: ${config.vectorDB.provider}
- **Complexity Level**: ${config.complexity}
${config.retrieval.useHybridSearch ? '- **Hybrid Search**: Enabled (semantic + BM25)' : ''}
${config.retrieval.useReranking ? '- **Reranking**: Enabled' : ''}

## Quick Start

### Prerequisites

- Python 3.11+
- Docker & Docker Compose (optional but recommended)
${config.llm.provider === 'ollama' ? '- Ollama installed locally or via Docker' : ''}
${config.llm.provider === 'openai' ? '- OpenAI API key' : ''}
${config.llm.provider === 'anthropic' ? '- Anthropic API key' : ''}

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd ${config.projectName.replace(/\s+/g, '-').toLowerCase()}
   \`\`\`

2. **Create virtual environment**
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   \`\`\`

3. **Install dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. **Configure environment**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

${config.llm.provider === 'ollama' ? `5. **Start Ollama and pull the model**
   \`\`\`bash
   ollama pull ${config.llm.model}
   \`\`\`
` : ''}

### Using Docker (Recommended)

\`\`\`bash
docker-compose up -d
\`\`\`

### Usage

1. **Add documents to index**
   \`\`\`bash
   python -m src.indexer --path ./data/documents
   \`\`\`

2. **Query the system**
   \`\`\`bash
   python -m src.query "Your question here"
   \`\`\`
${config.includeAPI ? `
3. **Start the API server**
   \`\`\`bash
   uvicorn src.api.main:app --reload
   \`\`\`

   API will be available at http://localhost:8000
   Swagger docs at http://localhost:8000/docs
` : ''}

## Project Structure

\`\`\`
${config.projectName.replace(/\s+/g, '-').toLowerCase()}/
├── src/
│   ├── __init__.py
│   ├── config.py          # Configuration management
│   ├── embeddings.py      # Embedding models
│   ├── vectorstore.py     # Vector database operations
│   ├── retriever.py       # Document retrieval
│   ├── llm.py             # LLM integration
│   ├── rag_pipeline.py    # Main RAG pipeline
│   ├── indexer.py         # Document indexing
│   └── query.py           # Query interface
${config.includeAPI ? `│   └── api/
│       ├── __init__.py
│       ├── main.py        # FastAPI application
│       └── routes.py      # API routes
` : ''}├── data/                  # Your documents go here
├── ${config.vectorDB.provider === 'chromadb' ? 'chroma_db/' : ''}                 # Vector store data
├── requirements.txt
├── .env.example
├── docker-compose.yml
└── README.md
\`\`\`

## Configuration

Key configuration options in \`.env\`:

| Variable | Description | Default |
|----------|-------------|---------|
| \`LLM_MODEL\` | LLM model to use | \`${config.llm.model}\` |
| \`EMBEDDING_MODEL\` | Embedding model | \`${config.embedding.model}\` |
| \`CHUNK_SIZE\` | Document chunk size | \`${config.chunking.chunkSize}\` |
| \`TOP_K\` | Number of documents to retrieve | \`${config.retrieval.topK}\` |

## License

MIT License
`;
}
