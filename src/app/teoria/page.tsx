'use client';

import { useState, useEffect } from 'react';
import NotebookViewer from '@/components/NotebookViewer';
import Link from 'next/link';

export default function TeoriaPage() {
  const [notebook, setNotebook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/guia_completa_rag.ipynb')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el notebook');
        return res.json();
      })
      .then(data => {
        setNotebook(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600  hover:text-primary-600 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Builder
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900  mb-2">
              Guia Completa de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                RAG
              </span>
            </h1>
            <p className="text-slate-600 ">
              Teoria, conceptos y ejemplos practicos de Retrieval-Augmented Generation
            </p>
          </div>

          <a
            href="/guia_completa_rag.ipynb"
            download
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar Notebook
          </a>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="bg-white  rounded-xl border border-slate-200  p-6">
          <h2 className="text-lg font-semibold text-slate-900  mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Contenido
          </h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#section-1" className="text-slate-600  hover:text-primary-600 py-1">
              1. Fundamentos Teoricos de RAG
            </a>
            <a href="#section-2" className="text-slate-600  hover:text-primary-600 py-1">
              2. Embeddings: El Corazon Semantico
            </a>
            <a href="#section-3" className="text-slate-600  hover:text-primary-600 py-1">
              3. Chunking: Division Inteligente
            </a>
            <a href="#section-4" className="text-slate-600  hover:text-primary-600 py-1">
              4. Vector Stores: Almacenamiento
            </a>
            <a href="#section-5" className="text-slate-600  hover:text-primary-600 py-1">
              5. Pipeline RAG Completo
            </a>
            <a href="#section-6" className="text-slate-600  hover:text-primary-600 py-1">
              6. Tecnicas Avanzadas de Retrieval
            </a>
            <a href="#section-7" className="text-slate-600  hover:text-primary-600 py-1">
              7. Evaluacion y Metricas
            </a>
            <a href="#section-8" className="text-slate-600  hover:text-primary-600 py-1">
              8. Prompt Engineering para RAG
            </a>
            <a href="#section-9" className="text-slate-600  hover:text-primary-600 py-1">
              9. Soluciones Open Source
            </a>
            <a href="#section-10" className="text-slate-600  hover:text-primary-600 py-1">
              10. Despliegue en Produccion
            </a>
          </div>
        </div>
      </div>

      {/* Notebook Content */}
      <div className="max-w-5xl mx-auto px-4">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50  border border-red-200  rounded-xl p-6 text-center">
            <p className="text-red-600 ">{error}</p>
          </div>
        )}

        {notebook && <NotebookViewer notebook={notebook} />}
      </div>
    </div>
  );
}
