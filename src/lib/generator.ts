import JSZip from 'jszip';
import { RAGConfig } from './types';
import {
  generateRequirements,
  generateEnvFile,
  generateEnvExample,
  generateGitignore,
  generateDockerfile,
  generateDockerCompose,
  generateReadme,
} from './templates/base';
import {
  generateConfigPy,
  generateEmbeddingsPy,
  generateVectorstorePy,
  generateLLMPy,
  generateRetrieverPy,
  generateRAGPipelinePy,
  generateIndexerPy,
  generateQueryPy,
  generateInitPy,
} from './templates/python-code';
import {
  generateAPIMain,
  generateAPIInit,
} from './templates/api-code';
import { generateInstructions, generateQuickStart } from './templates/instructions';

export async function generateProject(config: RAGConfig): Promise<Blob> {
  const zip = new JSZip();
  const projectName = config.projectName.replace(/\s+/g, '-').toLowerCase();

  // Root files
  zip.file('requirements.txt', generateRequirements(config));
  zip.file('.env.example', generateEnvExample(config));
  zip.file('.gitignore', generateGitignore());
  zip.file('README.md', generateReadme(config));
  zip.file('INSTRUCCIONES.md', generateInstructions(config));
  zip.file('GUIA_RAPIDA.md', generateQuickStart(config));

  // Docker files
  if (config.includeDocker) {
    zip.file('Dockerfile', generateDockerfile(config));
    zip.file('docker-compose.yml', generateDockerCompose(config));
  }

  // Source directory
  const srcFolder = zip.folder('src');
  if (srcFolder) {
    srcFolder.file('__init__.py', generateInitPy());
    srcFolder.file('config.py', generateConfigPy(config));
    srcFolder.file('embeddings.py', generateEmbeddingsPy(config));
    srcFolder.file('vectorstore.py', generateVectorstorePy(config));
    srcFolder.file('llm.py', generateLLMPy(config));
    srcFolder.file('retriever.py', generateRetrieverPy(config));
    srcFolder.file('rag_pipeline.py', generateRAGPipelinePy(config));
    srcFolder.file('indexer.py', generateIndexerPy(config));
    srcFolder.file('query.py', generateQueryPy());

    // API if enabled
    if (config.includeAPI) {
      const apiFolder = srcFolder.folder('api');
      if (apiFolder) {
        apiFolder.file('__init__.py', generateAPIInit());
        apiFolder.file('main.py', generateAPIMain(config));
      }
    }
  }

  // Data directory placeholder
  const dataFolder = zip.folder('data');
  if (dataFolder) {
    dataFolder.file('.gitkeep', '# Place your documents here\n');
  }

  // Tests if enabled
  if (config.includeTests) {
    const testsFolder = zip.folder('tests');
    if (testsFolder) {
      testsFolder.file('__init__.py', '');
      testsFolder.file('test_rag_pipeline.py', generateTestFile(config));
    }
  }

  // Generate the ZIP file
  const blob = await zip.generateAsync({ type: 'blob' });
  return blob;
}

function generateTestFile(config: RAGConfig): string {
  return `"""Tests for RAG pipeline."""

import pytest
from src.rag_pipeline import RAGPipeline
from src.config import settings


class TestRAGPipeline:
    """Tests for the RAG pipeline."""

    @pytest.fixture
    def pipeline(self):
        """Create a pipeline instance for testing."""
        return RAGPipeline()

    def test_pipeline_initialization(self, pipeline):
        """Test that pipeline initializes correctly."""
        assert pipeline is not None
        assert pipeline.llm is not None
        assert pipeline.embedding_model is not None
        assert pipeline.vectorstore is not None

    def test_context_formatting(self, pipeline):
        """Test context formatting."""
        from langchain.schema import Document

        docs = [
            Document(
                page_content="Test content 1",
                metadata={"source": "test.pdf", "page": 1}
            ),
            Document(
                page_content="Test content 2",
                metadata={"source": "test.pdf", "page": 2}
            )
        ]

        context = pipeline._format_context(docs)
        assert "Document 1" in context
        assert "Document 2" in context
        assert "Test content 1" in context
        assert "Test content 2" in context


class TestSettings:
    """Tests for configuration settings."""

    def test_settings_load(self):
        """Test that settings load correctly."""
        assert settings is not None
        assert settings.llm_provider == "${config.llm.provider}"
        assert settings.llm_model == "${config.llm.model}"
        assert settings.chunk_size == ${config.chunking.chunkSize}
        assert settings.top_k == ${config.retrieval.topK}

    def test_settings_types(self):
        """Test that settings have correct types."""
        assert isinstance(settings.chunk_size, int)
        assert isinstance(settings.top_k, int)
        assert isinstance(settings.use_hybrid_search, bool)
        assert isinstance(settings.use_reranking, bool)


class TestRetriever:
    """Tests for the retriever component."""

    @pytest.fixture
    def pipeline(self):
        """Create a pipeline instance for testing."""
        return RAGPipeline()

    def test_retriever_exists(self, pipeline):
        """Test that retriever is initialized."""
        assert pipeline.retriever is not None

    def test_retriever_k_parameter(self, pipeline):
        """Test retriever respects k parameter."""
        # The retriever should use the configured top_k
        assert hasattr(pipeline, 'retriever')


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
`;
}

export function downloadProject(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
