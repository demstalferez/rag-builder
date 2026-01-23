import { RAGConfig } from '../types';

export function generateConfigPy(config: RAGConfig): string {
  return `"""Configuration management for RAG pipeline."""

import os
from pathlib import Path
from pydantic import BaseSettings, Field
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Project
    project_name: str = Field(default="${config.projectName}")

    # LLM Configuration
    llm_provider: str = Field(default="${config.llm.provider}")
    llm_model: str = Field(default="${config.llm.model}")
    llm_temperature: float = Field(default=${config.llm.temperature || 0.7})
    llm_max_tokens: int = Field(default=${config.llm.maxTokens || 2048})
    ${config.llm.provider === 'ollama' ? `ollama_base_url: str = Field(default="${config.llm.baseUrl || 'http://localhost:11434'}")` : ''}
    ${config.llm.provider === 'openai' ? 'openai_api_key: str = Field(default="")' : ''}
    ${config.llm.provider === 'anthropic' ? 'anthropic_api_key: str = Field(default="")' : ''}

    # Embedding Configuration
    embedding_provider: str = Field(default="${config.embedding.provider}")
    embedding_model: str = Field(default="${config.embedding.model}")
    embedding_dimensions: int = Field(default=${config.embedding.dimensions || 384})

    # Vector Database Configuration
    vectordb_provider: str = Field(default="${config.vectorDB.provider}")
    collection_name: str = Field(default="${config.vectorDB.collectionName}")
    ${config.vectorDB.provider === 'chromadb' ? `chroma_persist_path: str = Field(default="${config.vectorDB.persistPath || './chroma_db'}")` : ''}
    ${config.vectorDB.provider === 'qdrant' ? `qdrant_host: str = Field(default="${config.vectorDB.host || 'localhost'}")\n    qdrant_port: int = Field(default=${config.vectorDB.port || 6333})` : ''}
    ${config.vectorDB.provider === 'pinecone' ? 'pinecone_api_key: str = Field(default="")\n    pinecone_environment: str = Field(default="")' : ''}

    # Chunking Configuration
    chunk_size: int = Field(default=${config.chunking.chunkSize})
    chunk_overlap: int = Field(default=${config.chunking.chunkOverlap})

    # Retrieval Configuration
    top_k: int = Field(default=${config.retrieval.topK})
    use_hybrid_search: bool = Field(default=${config.retrieval.useHybridSearch})
    use_reranking: bool = Field(default=${config.retrieval.useReranking})
    ${config.retrieval.useHybridSearch ? `hybrid_alpha: float = Field(default=${config.retrieval.hybridAlpha || 0.5})` : ''}
    ${config.retrieval.useReranking ? `reranker_model: str = Field(default="${config.retrieval.rerankerModel}")` : ''}

    # Paths
    data_dir: Path = Field(default=Path("./data"))
    logs_dir: Path = Field(default=Path("./logs"))

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Global settings instance
settings = Settings()
`;
}

export function generateEmbeddingsPy(config: RAGConfig): string {
  let imports = `"""Embedding models configuration."""

from typing import List
`;

  let code = '';

  if (config.embedding.provider === 'sentence-transformers') {
    imports += `from langchain_huggingface import HuggingFaceEmbeddings
`;
    code = `
def get_embedding_model():
    """Initialize and return the embedding model."""
    from .config import settings

    return HuggingFaceEmbeddings(
        model_name=settings.embedding_model,
        model_kwargs={'device': 'cpu'},
        encode_kwargs={'normalize_embeddings': True}
    )
`;
  } else if (config.embedding.provider === 'openai') {
    imports += `from langchain_openai import OpenAIEmbeddings
`;
    code = `
def get_embedding_model():
    """Initialize and return the embedding model."""
    from .config import settings

    return OpenAIEmbeddings(
        model=settings.embedding_model,
        openai_api_key=settings.openai_api_key
    )
`;
  } else if (config.embedding.provider === 'ollama') {
    imports += `from langchain_ollama import OllamaEmbeddings
`;
    code = `
def get_embedding_model():
    """Initialize and return the embedding model."""
    from .config import settings

    return OllamaEmbeddings(
        model=settings.embedding_model,
        base_url=settings.ollama_base_url
    )
`;
  }

  return imports + code;
}

export function generateVectorstorePy(config: RAGConfig): string {
  let imports = `"""Vector store configuration and operations."""

from typing import List, Optional
from langchain.schema import Document
`;

  let code = '';

  if (config.vectorDB.provider === 'chromadb') {
    imports += `from langchain_community.vectorstores import Chroma
`;
    code = `
def get_vectorstore(embedding_model, collection_name: Optional[str] = None):
    """Initialize and return the vector store."""
    from .config import settings

    return Chroma(
        collection_name=collection_name or settings.collection_name,
        embedding_function=embedding_model,
        persist_directory=settings.chroma_persist_path
    )


def create_vectorstore_from_documents(documents: List[Document], embedding_model, collection_name: Optional[str] = None):
    """Create a new vector store from documents."""
    from .config import settings

    vectorstore = Chroma.from_documents(
        documents=documents,
        embedding=embedding_model,
        collection_name=collection_name or settings.collection_name,
        persist_directory=settings.chroma_persist_path
    )
    return vectorstore
`;
  } else if (config.vectorDB.provider === 'faiss') {
    imports += `from langchain_community.vectorstores import FAISS
`;
    code = `
def get_vectorstore(embedding_model, index_path: str = "./faiss_index"):
    """Load an existing FAISS index."""
    return FAISS.load_local(index_path, embedding_model, allow_dangerous_deserialization=True)


def create_vectorstore_from_documents(documents: List[Document], embedding_model, index_path: str = "./faiss_index"):
    """Create a new FAISS index from documents."""
    vectorstore = FAISS.from_documents(documents, embedding_model)
    vectorstore.save_local(index_path)
    return vectorstore
`;
  } else if (config.vectorDB.provider === 'qdrant') {
    imports += `from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient
`;
    code = `
def get_qdrant_client():
    """Get Qdrant client."""
    from .config import settings
    return QdrantClient(host=settings.qdrant_host, port=settings.qdrant_port)


def get_vectorstore(embedding_model, collection_name: Optional[str] = None):
    """Initialize and return the vector store."""
    from .config import settings

    client = get_qdrant_client()

    return Qdrant(
        client=client,
        collection_name=collection_name or settings.collection_name,
        embeddings=embedding_model
    )


def create_vectorstore_from_documents(documents: List[Document], embedding_model, collection_name: Optional[str] = None):
    """Create a new vector store from documents."""
    from .config import settings

    return Qdrant.from_documents(
        documents=documents,
        embedding=embedding_model,
        collection_name=collection_name or settings.collection_name,
        host=settings.qdrant_host,
        port=settings.qdrant_port
    )
`;
  }

  return imports + code;
}

export function generateLLMPy(config: RAGConfig): string {
  let imports = `"""LLM configuration and initialization."""

`;

  let code = '';

  if (config.llm.provider === 'ollama') {
    imports += `from langchain_ollama import OllamaLLM
`;
    code = `
def get_llm():
    """Initialize and return the LLM."""
    from .config import settings

    return OllamaLLM(
        model=settings.llm_model,
        base_url=settings.ollama_base_url,
        temperature=settings.llm_temperature
    )
`;
  } else if (config.llm.provider === 'openai') {
    imports += `from langchain_openai import ChatOpenAI
`;
    code = `
def get_llm():
    """Initialize and return the LLM."""
    from .config import settings

    return ChatOpenAI(
        model=settings.llm_model,
        temperature=settings.llm_temperature,
        max_tokens=settings.llm_max_tokens,
        openai_api_key=settings.openai_api_key
    )
`;
  } else if (config.llm.provider === 'anthropic') {
    imports += `from langchain_anthropic import ChatAnthropic
`;
    code = `
def get_llm():
    """Initialize and return the LLM."""
    from .config import settings

    return ChatAnthropic(
        model=settings.llm_model,
        temperature=settings.llm_temperature,
        max_tokens=settings.llm_max_tokens,
        anthropic_api_key=settings.anthropic_api_key
    )
`;
  } else if (config.llm.provider === 'huggingface') {
    imports += `from langchain_huggingface import HuggingFacePipeline
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
`;
    code = `
def get_llm():
    """Initialize and return the LLM."""
    from .config import settings

    tokenizer = AutoTokenizer.from_pretrained(settings.llm_model)
    model = AutoModelForCausalLM.from_pretrained(
        settings.llm_model,
        device_map="auto",
        torch_dtype="auto"
    )

    pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_new_tokens=settings.llm_max_tokens,
        temperature=settings.llm_temperature
    )

    return HuggingFacePipeline(pipeline=pipe)
`;
  }

  return imports + code;
}

export function generateRetrieverPy(config: RAGConfig): string {
  let code = `"""Document retrieval with optional hybrid search and reranking."""

from typing import List, Optional
from langchain.schema import Document
`;

  if (config.retrieval.useHybridSearch) {
    code += `from rank_bm25 import BM25Okapi
import numpy as np
import re
`;
  }

  if (config.retrieval.useReranking) {
    code += `from sentence_transformers import CrossEncoder
`;
  }

  code += `

class Retriever:
    """Document retriever with optional hybrid search and reranking."""

    def __init__(self, vectorstore, documents: Optional[List[str]] = None):
        """
        Initialize the retriever.

        Args:
            vectorstore: The vector store to use for retrieval
            documents: List of document texts (required for hybrid search)
        """
        from .config import settings

        self.vectorstore = vectorstore
        self.settings = settings
        self.documents = documents

`;

  if (config.retrieval.useHybridSearch) {
    code += `        # Initialize BM25 if hybrid search is enabled
        if settings.use_hybrid_search and documents:
            tokenized_docs = [self._tokenize(doc) for doc in documents]
            self.bm25 = BM25Okapi(tokenized_docs)
        else:
            self.bm25 = None
`;
  }

  if (config.retrieval.useReranking) {
    code += `
        # Initialize reranker if enabled
        if settings.use_reranking:
            self.reranker = CrossEncoder(settings.reranker_model)
        else:
            self.reranker = None
`;
  }

  code += `

    def _tokenize(self, text: str) -> List[str]:
        """Simple tokenization for BM25."""
        return re.findall(r'\\w+', text.lower())

    def retrieve(self, query: str, k: Optional[int] = None) -> List[Document]:
        """
        Retrieve relevant documents for a query.

        Args:
            query: The search query
            k: Number of documents to retrieve (uses settings.top_k if not provided)

        Returns:
            List of relevant documents
        """
        k = k or self.settings.top_k

`;

  if (config.retrieval.useHybridSearch) {
    code += `        if self.settings.use_hybrid_search and self.bm25 is not None:
            # Hybrid search: combine vector and BM25 scores

            # Get more candidates for reranking
            vector_k = k * 3 if self.settings.use_reranking else k * 2

            # Vector search
            vector_results = self.vectorstore.similarity_search_with_score(query, k=vector_k)

            # BM25 search
            tokenized_query = self._tokenize(query)
            bm25_scores = self.bm25.get_scores(tokenized_query)

            # Combine scores
            alpha = self.settings.hybrid_alpha
            combined_results = self._combine_scores(vector_results, bm25_scores, alpha)

            # Take top results
            docs = [doc for doc, _ in combined_results[:k * 2]]
        else:
`;
  }

  code += `        # Standard vector search
        retrieval_k = k * 2 if self.settings.use_reranking else k
        docs = self.vectorstore.similarity_search(query, k=retrieval_k)
`;

  if (config.retrieval.useReranking) {
    code += `
        # Rerank if enabled
        if self.settings.use_reranking and self.reranker is not None:
            docs = self._rerank(query, docs, k)
`;
  }

  code += `
        return docs[:k]
`;

  if (config.retrieval.useHybridSearch) {
    code += `
    def _combine_scores(self, vector_results, bm25_scores, alpha: float):
        """Combine vector and BM25 scores."""
        # Normalize scores
        vector_scores = {doc.page_content: score for doc, score in vector_results}

        # Normalize BM25 scores
        bm25_min, bm25_max = min(bm25_scores), max(bm25_scores)
        if bm25_max - bm25_min > 0:
            bm25_normalized = {
                self.documents[i]: (score - bm25_min) / (bm25_max - bm25_min)
                for i, score in enumerate(bm25_scores)
            }
        else:
            bm25_normalized = {self.documents[i]: 0 for i in range(len(bm25_scores))}

        # Combine
        combined = {}
        for doc, v_score in vector_results:
            content = doc.page_content
            b_score = bm25_normalized.get(content, 0)
            combined[content] = (doc, alpha * (1 - v_score) + (1 - alpha) * b_score)

        # Sort by combined score
        sorted_results = sorted(combined.values(), key=lambda x: x[1], reverse=True)
        return sorted_results
`;
  }

  if (config.retrieval.useReranking) {
    code += `
    def _rerank(self, query: str, docs: List[Document], k: int) -> List[Document]:
        """Rerank documents using cross-encoder."""
        if not docs:
            return docs

        pairs = [[query, doc.page_content] for doc in docs]
        scores = self.reranker.predict(pairs)

        # Sort by reranker score
        doc_scores = list(zip(docs, scores))
        doc_scores.sort(key=lambda x: x[1], reverse=True)

        return [doc for doc, _ in doc_scores[:k]]
`;
  }

  return code;
}

export function generateRAGPipelinePy(config: RAGConfig): string {
  return `"""Main RAG pipeline."""

from typing import List, Dict, Optional
from langchain.prompts import PromptTemplate
from langchain.schema import Document

from .config import settings
from .embeddings import get_embedding_model
from .vectorstore import get_vectorstore
from .llm import get_llm
from .retriever import Retriever


# Default RAG prompt template
DEFAULT_PROMPT = """You are a helpful assistant that answers questions based on the provided context.

INSTRUCTIONS:
1. Answer ONLY based on the provided context
2. If the information is not in the context, say "I don't have information about this in the available documents"
3. Cite your sources when possible
4. Be precise and concise

CONTEXT:
{context}

QUESTION: {question}

ANSWER:"""


class RAGPipeline:
    """Complete RAG pipeline for question answering."""

    def __init__(
        self,
        prompt_template: Optional[str] = None,
        collection_name: Optional[str] = None
    ):
        """
        Initialize the RAG pipeline.

        Args:
            prompt_template: Custom prompt template (uses DEFAULT_PROMPT if not provided)
            collection_name: Vector store collection name
        """
        # Initialize components
        self.embedding_model = get_embedding_model()
        self.vectorstore = get_vectorstore(self.embedding_model, collection_name)
        self.llm = get_llm()

        # Initialize retriever
        self.retriever = Retriever(self.vectorstore)

        # Setup prompt
        self.prompt = PromptTemplate(
            template=prompt_template or DEFAULT_PROMPT,
            input_variables=["context", "question"]
        )

    def _format_context(self, documents: List[Document]) -> str:
        """Format retrieved documents into context string."""
        context_parts = []
        for i, doc in enumerate(documents, 1):
            source = doc.metadata.get('source', 'Unknown')
            page = doc.metadata.get('page', 'N/A')
            context_parts.append(f"[Document {i} - Source: {source}, Page: {page}]\\n{doc.page_content}")
        return "\\n\\n".join(context_parts)

    def query(
        self,
        question: str,
        k: Optional[int] = None,
        return_sources: bool = True
    ) -> Dict:
        """
        Answer a question using the RAG pipeline.

        Args:
            question: The user's question
            k: Number of documents to retrieve
            return_sources: Whether to include source documents in response

        Returns:
            Dictionary with 'answer', 'sources' (if return_sources=True), and 'context'
        """
        # Retrieve relevant documents
        documents = self.retriever.retrieve(question, k=k)

        # Format context
        context = self._format_context(documents)

        # Generate prompt
        prompt_text = self.prompt.format(context=context, question=question)

        # Generate answer
        answer = self.llm.invoke(prompt_text)

        # Handle different LLM response types
        if hasattr(answer, 'content'):
            answer_text = answer.content
        else:
            answer_text = str(answer)

        result = {
            'answer': answer_text,
            'context': context
        }

        if return_sources:
            result['sources'] = [
                {
                    'content': doc.page_content[:200] + '...' if len(doc.page_content) > 200 else doc.page_content,
                    'metadata': doc.metadata
                }
                for doc in documents
            ]

        return result

    def batch_query(
        self,
        questions: List[str],
        k: Optional[int] = None
    ) -> List[Dict]:
        """
        Answer multiple questions.

        Args:
            questions: List of questions
            k: Number of documents to retrieve per question

        Returns:
            List of result dictionaries
        """
        return [self.query(q, k=k) for q in questions]
`;
}

export function generateIndexerPy(config: RAGConfig): string {
  return `"""Document indexing utilities."""

import os
from pathlib import Path
from typing import List, Optional
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader,
    TextLoader,
    DirectoryLoader,
)
from tqdm import tqdm

from .config import settings
from .embeddings import get_embedding_model
from .vectorstore import create_vectorstore_from_documents


def load_documents(path: str) -> List[Document]:
    """
    Load documents from a file or directory.

    Args:
        path: Path to file or directory

    Returns:
        List of loaded documents
    """
    path = Path(path)
    documents = []

    if path.is_file():
        documents = _load_single_file(path)
    elif path.is_dir():
        documents = _load_directory(path)
    else:
        raise ValueError(f"Path does not exist: {path}")

    print(f"Loaded {len(documents)} documents from {path}")
    return documents


def _load_single_file(file_path: Path) -> List[Document]:
    """Load a single file."""
    suffix = file_path.suffix.lower()

    loaders = {
        '.pdf': PyPDFLoader,
        '.docx': Docx2txtLoader,
        '.txt': TextLoader,
        '.md': TextLoader,
    }

    loader_class = loaders.get(suffix)
    if loader_class is None:
        print(f"Warning: Unsupported file type {suffix}, skipping {file_path}")
        return []

    loader = loader_class(str(file_path))
    return loader.load()


def _load_directory(dir_path: Path) -> List[Document]:
    """Load all supported files from a directory."""
    documents = []

    for file_path in tqdm(list(dir_path.rglob("*")), desc="Loading files"):
        if file_path.is_file() and file_path.suffix.lower() in ['.pdf', '.docx', '.txt', '.md']:
            try:
                docs = _load_single_file(file_path)
                documents.extend(docs)
            except Exception as e:
                print(f"Error loading {file_path}: {e}")

    return documents


def chunk_documents(documents: List[Document]) -> List[Document]:
    """
    Split documents into chunks.

    Args:
        documents: List of documents to chunk

    Returns:
        List of chunked documents
    """
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
        length_function=len,
        separators=["\\n\\n", "\\n", ". ", " ", ""]
    )

    chunks = text_splitter.split_documents(documents)
    print(f"Created {len(chunks)} chunks from {len(documents)} documents")

    return chunks


def index_documents(
    path: str,
    collection_name: Optional[str] = None
):
    """
    Complete indexing pipeline: load, chunk, and store documents.

    Args:
        path: Path to documents
        collection_name: Vector store collection name
    """
    print(f"\\n{'='*60}")
    print(f"Indexing documents from: {path}")
    print(f"{'='*60}\\n")

    # Load documents
    print("Step 1/3: Loading documents...")
    documents = load_documents(path)

    if not documents:
        print("No documents found to index.")
        return

    # Chunk documents
    print("\\nStep 2/3: Chunking documents...")
    chunks = chunk_documents(documents)

    # Create vector store
    print("\\nStep 3/3: Creating vector store...")
    embedding_model = get_embedding_model()
    vectorstore = create_vectorstore_from_documents(
        chunks,
        embedding_model,
        collection_name=collection_name
    )

    print(f"\\n{'='*60}")
    print(f"Indexing complete!")
    print(f"  - Documents loaded: {len(documents)}")
    print(f"  - Chunks created: {len(chunks)}")
    print(f"  - Collection: {collection_name or settings.collection_name}")
    print(f"{'='*60}\\n")

    return vectorstore


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Index documents for RAG")
    parser.add_argument("--path", "-p", required=True, help="Path to documents")
    parser.add_argument("--collection", "-c", help="Collection name")

    args = parser.parse_args()
    index_documents(args.path, args.collection)
`;
}

export function generateQueryPy(): string {
  return `"""Command-line query interface."""

import argparse
from .rag_pipeline import RAGPipeline


def main():
    parser = argparse.ArgumentParser(description="Query the RAG system")
    parser.add_argument("question", nargs="?", help="Question to ask")
    parser.add_argument("--interactive", "-i", action="store_true", help="Interactive mode")
    parser.add_argument("--collection", "-c", help="Collection name")
    parser.add_argument("--k", "-k", type=int, help="Number of documents to retrieve")

    args = parser.parse_args()

    # Initialize pipeline
    print("Initializing RAG pipeline...")
    pipeline = RAGPipeline(collection_name=args.collection)
    print("Ready!\\n")

    if args.interactive:
        # Interactive mode
        print("Interactive mode. Type 'quit' or 'exit' to stop.\\n")
        while True:
            try:
                question = input("Question: ").strip()
                if question.lower() in ['quit', 'exit', 'q']:
                    break
                if not question:
                    continue

                result = pipeline.query(question, k=args.k)
                print(f"\\nAnswer: {result['answer']}\\n")

                if result.get('sources'):
                    print("Sources:")
                    for i, source in enumerate(result['sources'], 1):
                        print(f"  {i}. {source['metadata'].get('source', 'Unknown')}")
                print()

            except KeyboardInterrupt:
                break

    elif args.question:
        # Single question mode
        result = pipeline.query(args.question, k=args.k)
        print(f"Answer: {result['answer']}\\n")

        if result.get('sources'):
            print("Sources:")
            for i, source in enumerate(result['sources'], 1):
                print(f"  {i}. {source['metadata'].get('source', 'Unknown')}")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
`;
}

export function generateInitPy(): string {
  return `"""RAG Pipeline Package."""

from .rag_pipeline import RAGPipeline
from .config import settings

__all__ = ['RAGPipeline', 'settings']
`;
}
