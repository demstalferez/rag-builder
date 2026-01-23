import { RAGConfig } from '../types';

export function generateAPIMain(config: RAGConfig): string {
  return `"""FastAPI application for RAG service."""

import os
import time
from collections import defaultdict
from functools import wraps
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

from ..rag_pipeline import RAGPipeline
from ..config import settings

# Initialize FastAPI app
app = FastAPI(
    title="${config.projectName} API",
    description="RAG-powered question answering API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Configuration - customize these for production
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:8000").split(",")
CORS_ALLOW_ALL = os.getenv("CORS_ALLOW_ALL", "false").lower() == "true"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if CORS_ALLOW_ALL else [origin.strip() for origin in CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# Rate limiting configuration
RATE_LIMIT_REQUESTS = int(os.getenv("RATE_LIMIT_REQUESTS", "60"))  # requests per window
RATE_LIMIT_WINDOW = int(os.getenv("RATE_LIMIT_WINDOW", "60"))  # window in seconds

# In-memory rate limit store (use Redis in production)
rate_limit_store: Dict[str, List[float]] = defaultdict(list)


def get_client_ip(request: Request) -> str:
    """Get client IP address from request."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def check_rate_limit(client_ip: str) -> bool:
    """Check if client has exceeded rate limit."""
    current_time = time.time()
    window_start = current_time - RATE_LIMIT_WINDOW

    # Clean old entries
    rate_limit_store[client_ip] = [
        ts for ts in rate_limit_store[client_ip] if ts > window_start
    ]

    if len(rate_limit_store[client_ip]) >= RATE_LIMIT_REQUESTS:
        return False

    rate_limit_store[client_ip].append(current_time)
    return True


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    """Rate limiting middleware."""
    # Skip rate limiting for health checks
    if request.url.path in ["/", "/health"]:
        return await call_next(request)

    client_ip = get_client_ip(request)

    if not check_rate_limit(client_ip):
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={
                "detail": "Rate limit exceeded. Please try again later.",
                "retry_after": RATE_LIMIT_WINDOW
            }
        )

    response = await call_next(request)
    return response

# Initialize RAG pipeline (lazy loading)
_pipeline: Optional[RAGPipeline] = None


def get_pipeline() -> RAGPipeline:
    """Get or create the RAG pipeline instance."""
    global _pipeline
    if _pipeline is None:
        _pipeline = RAGPipeline()
    return _pipeline


# Request/Response models
class QueryRequest(BaseModel):
    question: str
    k: Optional[int] = None
    collection: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "question": "What are protein chaperones?",
                "k": 3
            }
        }


class SourceDocument(BaseModel):
    content: str
    metadata: dict


class QueryResponse(BaseModel):
    answer: str
    sources: List[SourceDocument]

    class Config:
        json_schema_extra = {
            "example": {
                "answer": "Protein chaperones are...",
                "sources": [
                    {
                        "content": "Chaperones assist in protein folding...",
                        "metadata": {"source": "document.pdf", "page": 1}
                    }
                ]
            }
        }


class HealthResponse(BaseModel):
    status: str
    version: str


# API Routes
@app.get("/", response_model=HealthResponse)
async def root():
    """Health check endpoint."""
    return HealthResponse(status="healthy", version="1.0.0")


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(status="healthy", version="1.0.0")


@app.post("/query", response_model=QueryResponse)
async def query(request: QueryRequest):
    """
    Query the RAG system.

    Args:
        request: Query request with question and optional parameters

    Returns:
        Answer with source documents
    """
    try:
        pipeline = get_pipeline()
        result = pipeline.query(
            question=request.question,
            k=request.k
        )

        return QueryResponse(
            answer=result['answer'],
            sources=[
                SourceDocument(content=s['content'], metadata=s['metadata'])
                for s in result.get('sources', [])
            ]
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class BatchQueryRequest(BaseModel):
    questions: List[str]
    k: Optional[int] = None


class BatchQueryResponse(BaseModel):
    results: List[QueryResponse]


@app.post("/batch-query", response_model=BatchQueryResponse)
async def batch_query(request: BatchQueryRequest):
    """
    Query the RAG system with multiple questions.

    Args:
        request: Batch query request with list of questions

    Returns:
        List of answers with source documents
    """
    try:
        pipeline = get_pipeline()
        results = pipeline.batch_query(
            questions=request.questions,
            k=request.k
        )

        return BatchQueryResponse(
            results=[
                QueryResponse(
                    answer=r['answer'],
                    sources=[
                        SourceDocument(content=s['content'], metadata=s['metadata'])
                        for s in r.get('sources', [])
                    ]
                )
                for r in results
            ]
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`;
}

export function generateAPIInit(): string {
  return `"""API package."""

from .main import app

__all__ = ['app']
`;
}
