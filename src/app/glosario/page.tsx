'use client';

import { useState } from 'react';
import Link from 'next/link';

type Category = 'all' | 'rag-core' | 'embeddings' | 'vector-db' | 'llm' | 'retrieval' | 'normativa' | 'investigacion';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: Exclude<Category, 'all'>;
  link?: string;
}

const CATEGORIES: { id: Category; name: string; color: string; bgColor: string; borderColor: string }[] = [
  { id: 'all', name: 'Todos', color: 'text-slate-700', bgColor: 'bg-slate-100', borderColor: 'border-slate-300' },
  { id: 'rag-core', name: 'RAG Core', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-300' },
  { id: 'embeddings', name: 'Embeddings', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-300' },
  { id: 'vector-db', name: 'Vector DBs', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-300' },
  { id: 'llm', name: 'LLMs', color: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-300' },
  { id: 'retrieval', name: 'Retrieval', color: 'text-cyan-700', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-300' },
  { id: 'investigacion', name: 'Investigación', color: 'text-pink-700', bgColor: 'bg-pink-50', borderColor: 'border-pink-300' },
  { id: 'normativa', name: 'Normativa', color: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-300' },
];

const GLOSSARY_TERMS: GlossaryTerm[] = [
  // RAG Core
  {
    id: 'rag',
    term: 'RAG (Retrieval-Augmented Generation)',
    definition: 'Técnica que combina la recuperación de información relevante de una base de conocimientos con la generación de texto mediante LLMs. Permite que los modelos accedan a información actualizada y específica sin necesidad de reentrenamiento.',
    category: 'rag-core',
    link: 'https://arxiv.org/abs/2005.11401',
  },
  {
    id: 'pipeline-rag',
    term: 'Pipeline RAG',
    definition: 'Flujo de trabajo completo que incluye: ingesta de documentos, chunking, generación de embeddings, almacenamiento en vector store, retrieval de contexto relevante y generación de respuesta con el LLM.',
    category: 'rag-core',
  },
  {
    id: 'chunking',
    term: 'Chunking',
    definition: 'Proceso de dividir documentos largos en fragmentos más pequeños (chunks) para su procesamiento. Estrategias comunes incluyen: recursivo, por tamaño fijo, semántico y por estructura del documento.',
    category: 'rag-core',
  },
  {
    id: 'chunk-overlap',
    term: 'Chunk Overlap',
    definition: 'Solapamiento entre chunks consecutivos para preservar el contexto en los límites. Típicamente entre 50-200 caracteres. Ayuda a evitar que información importante se pierda en las divisiones.',
    category: 'rag-core',
  },
  {
    id: 'ingestion',
    term: 'Ingesta de Documentos',
    definition: 'Proceso de cargar, procesar y preparar documentos para su indexación. Incluye extracción de texto, limpieza, chunking y generación de embeddings.',
    category: 'rag-core',
  },
  // Embeddings
  {
    id: 'embedding',
    term: 'Embedding',
    definition: 'Representación vectorial densa de texto en un espacio de alta dimensionalidad (768-1536 dimensiones típicamente). Captura el significado semántico permitiendo comparar similitud entre textos.',
    category: 'embeddings',
    link: 'https://huggingface.co/blog/getting-started-with-embeddings',
  },
  {
    id: 'vector',
    term: 'Vector',
    definition: 'Array de números de punto flotante que representa un texto en el espacio de embeddings. Dos textos semánticamente similares tendrán vectores cercanos en este espacio.',
    category: 'embeddings',
  },
  {
    id: 'cosine-similarity',
    term: 'Similitud Coseno',
    definition: 'Métrica que mide el ángulo entre dos vectores, ignorando su magnitud. Valores van de -1 a 1, donde 1 indica vectores idénticos. Es la métrica más común para comparar embeddings.',
    category: 'embeddings',
  },
  {
    id: 'sentence-transformers',
    term: 'Sentence Transformers',
    definition: 'Biblioteca de Python para generar embeddings de oraciones y párrafos. Modelos populares: all-MiniLM-L6-v2, paraphrase-multilingual-MiniLM-L12-v2 para español.',
    category: 'embeddings',
    link: 'https://www.sbert.net/',
  },
  {
    id: 'dimensionality',
    term: 'Dimensionalidad',
    definition: 'Número de dimensiones del vector de embedding. Modelos pequeños usan 384-768 dimensiones, mientras que modelos grandes pueden usar 1536 o más. Mayor dimensionalidad puede capturar más matices semánticos.',
    category: 'embeddings',
  },
  // Vector DBs
  {
    id: 'vector-db',
    term: 'Base de Datos Vectorial',
    definition: 'Sistema de almacenamiento optimizado para guardar y buscar vectores de alta dimensionalidad. Utiliza índices especializados (HNSW, IVF) para búsquedas eficientes de vecinos más cercanos.',
    category: 'vector-db',
  },
  {
    id: 'chromadb',
    term: 'ChromaDB',
    definition: 'Base de datos vectorial embebida, ideal para desarrollo y proyectos pequeños. Funciona en memoria o con persistencia local. Simple de usar y no requiere servidor.',
    category: 'vector-db',
    link: 'https://docs.trychroma.com/',
  },
  {
    id: 'faiss',
    term: 'FAISS',
    definition: 'Biblioteca de Meta AI para búsqueda eficiente de similitud en vectores densos. Extremadamente rápida, soporta GPU y múltiples tipos de índices. Ideal para grandes volúmenes de datos.',
    category: 'vector-db',
    link: 'https://faiss.ai/',
  },
  {
    id: 'qdrant',
    term: 'Qdrant',
    definition: 'Base de datos vectorial de código abierto con filtrado avanzado, payloads estructurados y soporte para búsqueda híbrida. Buena opción para producción con Docker.',
    category: 'vector-db',
    link: 'https://qdrant.tech/',
  },
  {
    id: 'pinecone',
    term: 'Pinecone',
    definition: 'Servicio de base de datos vectorial gestionado en la nube. Ofrece escalabilidad automática y baja latencia. Plan gratuito disponible para proyectos pequeños.',
    category: 'vector-db',
    link: 'https://www.pinecone.io/',
  },
  {
    id: 'hnsw',
    term: 'HNSW (Hierarchical Navigable Small World)',
    definition: 'Algoritmo de indexación para búsqueda aproximada de vecinos más cercanos. Ofrece excelente balance entre velocidad y precisión. Usado por la mayoría de vector DBs.',
    category: 'vector-db',
  },
  // LLMs
  {
    id: 'llm',
    term: 'LLM (Large Language Model)',
    definition: 'Modelo de lenguaje de gran escala entrenado en enormes cantidades de texto. Ejemplos: GPT-4, Claude, Llama, Mistral. En RAG, genera respuestas usando el contexto recuperado.',
    category: 'llm',
  },
  {
    id: 'prompt',
    term: 'Prompt',
    definition: 'Instrucción o texto de entrada que se envía al LLM. En RAG, el prompt incluye la pregunta del usuario más el contexto recuperado de la base de conocimientos.',
    category: 'llm',
  },
  {
    id: 'token',
    term: 'Token',
    definition: 'Unidad básica de procesamiento de texto para LLMs. Puede ser una palabra, parte de palabra o carácter. En español, una palabra típica equivale a 1-2 tokens.',
    category: 'llm',
  },
  {
    id: 'context-window',
    term: 'Context Window',
    definition: 'Cantidad máxima de tokens que un LLM puede procesar en una sola llamada. GPT-4 soporta hasta 128K tokens, Llama 3 hasta 8K. Limita cuánto contexto RAG puede incluir.',
    category: 'llm',
  },
  {
    id: 'temperature',
    term: 'Temperature',
    definition: 'Parámetro que controla la aleatoriedad de las respuestas del LLM. Valores bajos (0-0.3) producen respuestas más deterministas, valores altos (0.7-1) más creativas.',
    category: 'llm',
  },
  {
    id: 'ollama',
    term: 'Ollama',
    definition: 'Herramienta para ejecutar LLMs de código abierto localmente. Soporta Llama, Mistral, Gemma y más. Ideal para RAG con privacidad total de datos.',
    category: 'llm',
    link: 'https://ollama.ai/',
  },
  // Retrieval
  {
    id: 'top-k',
    term: 'Top-K',
    definition: 'Número de documentos o chunks más relevantes a recuperar de la base de datos vectorial. Valores típicos: 3-10. Más documentos dan más contexto pero aumentan tokens y posible ruido.',
    category: 'retrieval',
  },
  {
    id: 'reranking',
    term: 'Reranking',
    definition: 'Segunda fase de ordenamiento que reordena los resultados del retrieval inicial usando un modelo más preciso (Cross-Encoder). Mejora significativamente la relevancia del contexto.',
    category: 'retrieval',
  },
  {
    id: 'hybrid-search',
    term: 'Búsqueda Híbrida',
    definition: 'Combina búsqueda vectorial (semántica) con búsqueda de palabras clave (BM25). Captura tanto similitud semántica como coincidencias exactas de términos.',
    category: 'retrieval',
  },
  {
    id: 'bm25',
    term: 'BM25',
    definition: 'Algoritmo clásico de ranking basado en frecuencia de términos. Complementa la búsqueda vectorial encontrando documentos con palabras clave exactas.',
    category: 'retrieval',
  },
  {
    id: 'cross-encoder',
    term: 'Cross-Encoder',
    definition: 'Modelo que evalúa la relevancia de un par (query, documento) conjuntamente. Más preciso que bi-encoders pero más lento. Usado en reranking.',
    category: 'retrieval',
    link: 'https://www.sbert.net/examples/applications/cross-encoder/README.html',
  },
  {
    id: 'mmr',
    term: 'MMR (Maximal Marginal Relevance)',
    definition: 'Técnica para diversificar resultados de retrieval. Balancea relevancia con novedad, evitando documentos redundantes en el contexto.',
    category: 'retrieval',
  },
  // Normativa
  {
    id: 'ai-act',
    term: 'AI Act (Reglamento de IA)',
    definition: 'Regulación europea que clasifica sistemas de IA por nivel de riesgo. La investigación científica tiene exenciones específicas, pero los datos de entrenamiento deben cumplir RGPD.',
    category: 'normativa',
    link: 'https://eur-lex.europa.eu/eli/reg/2024/1689',
  },
  {
    id: 'rgpd',
    term: 'RGPD',
    definition: 'Reglamento General de Protección de Datos. Aplica a proyectos RAG que procesan datos personales. Principios clave: minimización, limitación de finalidad, exactitud.',
    category: 'normativa',
    link: 'https://gdpr.eu/',
  },
  {
    id: 'eipd',
    term: 'EIPD (Evaluación de Impacto)',
    definition: 'Evaluación obligatoria cuando el tratamiento de datos puede suponer alto riesgo. Debe realizarse ANTES de iniciar proyectos de IA con datos personales.',
    category: 'normativa',
  },
  {
    id: 'open-source',
    term: 'Modelos Open Source',
    definition: 'Modelos de IA con código y pesos disponibles públicamente (Llama, Mistral). Permiten ejecución local para cumplir requisitos de privacidad y soberanía de datos.',
    category: 'normativa',
  },
  // Investigación
  {
    id: 'revision-bibliografica',
    term: 'Revisión Bibliográfica',
    definition: 'Proceso sistemático de búsqueda, selección y síntesis de literatura científica sobre un tema. RAG puede asistir en la síntesis pero no reemplaza el análisis crítico del investigador.',
    category: 'investigacion',
  },
  {
    id: 'estado-del-arte',
    term: 'Estado del Arte',
    definition: 'Sección de un paper que resume el conocimiento actual sobre un tema. RAG es útil para generar borradores iniciales consultando múltiples papers indexados.',
    category: 'investigacion',
  },
  {
    id: 'alucinacion',
    term: 'Alucinación',
    definition: 'Cuando un LLM genera información que parece correcta pero es inventada. Crítico en investigación: siempre verificar datos, cifras y citas en los documentos originales.',
    category: 'investigacion',
  },
  {
    id: 'proveniencia',
    term: 'Proveniencia/Trazabilidad',
    definition: 'Capacidad de identificar qué documento fuente generó cada parte de una respuesta RAG. Esencial para citar correctamente y verificar información en contextos académicos.',
    category: 'investigacion',
  },
  {
    id: 'scibert',
    term: 'SciBERT',
    definition: 'Modelo de embeddings preentrenado en papers científicos. Mejor rendimiento que modelos genéricos para textos académicos y técnicos.',
    category: 'investigacion',
    link: 'https://github.com/allenai/scibert',
  },
  {
    id: 'zotero',
    term: 'Zotero',
    definition: 'Gestor de referencias bibliográficas gratuito y open source. Permite exportar colecciones de papers que pueden indexarse en un sistema RAG.',
    category: 'investigacion',
    link: 'https://www.zotero.org/',
  },
  {
    id: 'doi',
    term: 'DOI (Digital Object Identifier)',
    definition: 'Identificador único y permanente para documentos académicos. Útil como metadato en RAG para vincular respuestas con papers específicos.',
    category: 'investigacion',
  },
  {
    id: 'reproducibilidad',
    term: 'Reproducibilidad',
    definition: 'Capacidad de obtener los mismos resultados repitiendo un experimento o análisis. En RAG: documentar versiones de modelos, configuración y datos usados.',
    category: 'investigacion',
  },
];

const CATEGORY_ICONS: Record<Exclude<Category, 'all'>, string> = {
  'rag-core': 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  'embeddings': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  'vector-db': 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  'llm': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'retrieval': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  'investigacion': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'normativa': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
};

export default function GlosarioPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredTerms = selectedCategory === 'all'
    ? GLOSSARY_TERMS
    : GLOSSARY_TERMS.filter(term => term.category === selectedCategory);

  const getCategoryInfo = (categoryId: Exclude<Category, 'all'>) => {
    return CATEGORIES.find(c => c.id === categoryId)!;
  };

  return (
    <div className="py-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600 hover:text-primary-600 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Builder
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Glosario{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-upgrade-blue to-primary-400">
                RAG
              </span>
            </h1>
            <p className="text-slate-600">
              Términos y conceptos clave para entender Retrieval-Augmented Generation
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{GLOSSARY_TERMS.length} términos</span>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? `${category.bgColor} ${category.color} border-2 ${category.borderColor}`
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300'
              }`}
            >
              {category.name}
              {category.id !== 'all' && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({GLOSSARY_TERMS.filter(t => t.category === category.id).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Grid */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {filteredTerms.map((term) => {
            const categoryInfo = getCategoryInfo(term.category);
            return (
              <div
                key={term.id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 ${categoryInfo.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <svg className={`w-5 h-5 ${categoryInfo.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={CATEGORY_ICONS[term.category]} />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900 leading-tight">
                        {term.term}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryInfo.bgColor} ${categoryInfo.color} flex-shrink-0`}>
                        {categoryInfo.name}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {term.definition}
                    </p>

                    {term.link && (
                      <a
                        href={term.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Saber más
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No hay términos en esta categoría.</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="bg-gradient-to-r from-upgrade-blue to-primary-400 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">¿Listo para crear tu proyecto RAG?</h3>
          <p className="text-white/80 mb-4">Aplica estos conceptos y genera tu sistema personalizado</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-white text-upgrade-blue rounded-lg font-semibold hover:bg-slate-50 transition-colors"
          >
            Ir al Builder
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
