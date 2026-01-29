'use client';

import { useState } from 'react';
import Link from 'next/link';

type TutorialLevel = 'beginner' | 'intermediate' | 'advanced';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  level: TutorialLevel;
  duration: string;
  steps: {
    title: string;
    content: string;
    code?: string;
    tip?: string;
  }[];
  tags: string[];
}

const TUTORIALS: Tutorial[] = [
  {
    id: 'primer-rag',
    title: 'Tu Primer RAG con Papers Científicos',
    description: 'Aprende a crear un sistema RAG básico para consultar tus papers de investigación en menos de 30 minutos.',
    level: 'beginner',
    duration: '30 min',
    tags: ['Principiante', 'Papers', 'Local'],
    steps: [
      {
        title: '1. Prepara tu entorno',
        content: 'Antes de empezar, necesitas tener Python 3.9+ instalado y Ollama para ejecutar modelos localmente. Ollama te permite mantener tus datos 100% privados.',
        code: `# Instalar Ollama (macOS/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Descargar modelo Llama 3.1
ollama pull llama3.1

# Verificar instalación
ollama list`,
        tip: 'Ollama funciona en segundo plano. Una vez instalado, los modelos están disponibles via API local en localhost:11434.'
      },
      {
        title: '2. Genera tu proyecto con RAG Builder',
        content: 'Usa el wizard de RAG Builder para generar tu proyecto. Selecciona: Nivel Básico → Caso de uso "Científico" → Ollama como LLM → ChromaDB como base de datos.',
        tip: 'La configuración "Científico" optimiza el chunking para documentos técnicos con secciones largas.'
      },
      {
        title: '3. Organiza tus papers',
        content: 'Crea una carpeta "documents" dentro de tu proyecto y coloca tus PDFs. El sistema procesará automáticamente todos los archivos.',
        code: `mi-proyecto-rag/
├── src/
├── documents/        # ← Coloca aquí tus PDFs
│   ├── paper1.pdf
│   ├── paper2.pdf
│   └── review.pdf
├── requirements.txt
└── .env`,
        tip: 'Para mejores resultados, usa PDFs con texto seleccionable (no escaneados). Si tienes PDFs escaneados, considera usar OCR primero.'
      },
      {
        title: '4. Instala dependencias y ejecuta',
        content: 'Navega a tu proyecto, instala las dependencias y ejecuta el script de ingesta para indexar tus documentos.',
        code: `# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\\Scripts\\activate

# Instalar dependencias
pip install -r requirements.txt

# Indexar documentos
python src/ingest.py

# Iniciar el sistema RAG
python src/main.py`,
      },
      {
        title: '5. Realiza tu primera consulta',
        content: 'Una vez el sistema está corriendo, puedes hacer preguntas sobre tus papers. El sistema buscará contexto relevante y generará respuestas.',
        code: `# Ejemplo de consulta en Python
from src.rag import RAGPipeline

rag = RAGPipeline()
response = rag.query("¿Cuáles son las principales conclusiones del estudio sobre X?")
print(response)

# La respuesta incluirá:
# - Texto generado por el LLM
# - Referencias a los documentos fuente
# - Fragmentos relevantes encontrados`,
        tip: 'Formula preguntas específicas para obtener mejores respuestas. "¿Qué metodología usaron?" es mejor que "Háblame del paper".'
      }
    ]
  },
  {
    id: 'indexar-tesis',
    title: 'Indexar tu Tesis Doctoral',
    description: 'Cómo crear un asistente personal para consultar tu propia tesis y literatura relacionada.',
    level: 'beginner',
    duration: '45 min',
    tags: ['Tesis', 'Personal', 'Búsqueda'],
    steps: [
      {
        title: '1. Estructura recomendada',
        content: 'Organiza tu tesis y documentos relacionados en carpetas separadas para mejor organización y búsqueda.',
        code: `documents/
├── tesis/
│   └── mi_tesis_completa.pdf
├── bibliografia/
│   ├── paper_citado_1.pdf
│   ├── paper_citado_2.pdf
│   └── ...
└── notas/
    └── notas_investigacion.md`,
        tip: 'Separar por carpetas permite filtrar búsquedas: "buscar solo en bibliografía" o "buscar en mi tesis".'
      },
      {
        title: '2. Configuración óptima para tesis',
        content: 'Para documentos largos como una tesis, ajusta el tamaño de chunk y overlap para mantener contexto.',
        code: `# En config.py o .env
CHUNK_SIZE=1000        # Chunks más grandes para contexto
CHUNK_OVERLAP=200      # Más overlap para no perder información
CHUNKING_STRATEGY=recursive  # Mejor para documentos estructurados`,
        tip: 'Una tesis de 200 páginas generará aproximadamente 500-800 chunks con esta configuración.'
      },
      {
        title: '3. Añadir metadatos',
        content: 'Enriquece tus documentos con metadatos para búsquedas más precisas.',
        code: `# En src/ingest.py, modifica el loader
from langchain.schema import Document

def load_with_metadata(file_path):
    # Extraer metadatos del nombre o contenido
    metadata = {
        "source": file_path,
        "type": "tesis" if "tesis" in file_path else "bibliografia",
        "chapter": extract_chapter(file_path),  # Si aplica
    }
    return Document(page_content=text, metadata=metadata)`,
      },
      {
        title: '4. Consultas útiles para tu tesis',
        content: 'Ejemplos de preguntas que puedes hacer a tu asistente de tesis.',
        code: `# Preguntas de ejemplo
queries = [
    "¿Cuál es la hipótesis principal de mi tesis?",
    "Resume el capítulo de metodología",
    "¿Qué autores cito sobre el tema X?",
    "¿Qué limitaciones menciono en las conclusiones?",
    "Compara mi enfoque con el de [Autor] en mi bibliografía",
]`,
        tip: 'Usa este sistema para preparar la defensa de tu tesis: practica respondiendo preguntas del tribunal.'
      }
    ]
  },
  {
    id: 'revision-bibliografica',
    title: 'RAG para Revisión Bibliográfica',
    description: 'Automatiza la síntesis de literatura científica y encuentra conexiones entre papers.',
    level: 'intermediate',
    duration: '1 hora',
    tags: ['Literatura', 'Síntesis', 'Avanzado'],
    steps: [
      {
        title: '1. Recopila tu corpus',
        content: 'Descarga los papers relevantes de fuentes como Google Scholar, PubMed, arXiv o tu gestor de referencias (Zotero, Mendeley).',
        code: `# Si usas Zotero, exporta con "Better BibTeX"
# Estructura recomendada:
literature_review/
├── papers/           # PDFs descargados
├── references.bib    # Archivo BibTeX con metadatos
└── notes.md          # Tus notas iniciales`,
        tip: 'Zotero puede descargar PDFs automáticamente. Usa el plugin "Zotero Connector" en tu navegador.'
      },
      {
        title: '2. Configuración para múltiples papers',
        content: 'Para revisiones bibliográficas, usa búsqueda híbrida y reranking para mejor precisión.',
        code: `# Configuración recomendada en RAG Builder:
# - Nivel: Avanzado
# - Búsqueda híbrida: Activada (combina semántica + keywords)
# - Reranking: Activado (mejora relevancia)
# - Top-K: 8-10 (más contexto de múltiples fuentes)

# En .env
USE_HYBRID_SEARCH=true
USE_RERANKING=true
TOP_K=10`,
      },
      {
        title: '3. Prompts para síntesis de literatura',
        content: 'Usa prompts estructurados para obtener síntesis académicas de calidad.',
        code: `# Prompts útiles para revisión bibliográfica

SYNTHESIS_PROMPT = """
Basándote en los documentos proporcionados, sintetiza
los principales hallazgos sobre: {topic}

Estructura tu respuesta:
1. Consensos: ¿En qué coinciden los autores?
2. Debates: ¿Dónde hay desacuerdos?
3. Gaps: ¿Qué falta por investigar?

Cita los autores relevantes para cada punto.
"""

COMPARISON_PROMPT = """
Compara las metodologías utilizadas en los papers
sobre {topic}. Incluye:
- Diseño experimental
- Muestra/datos utilizados
- Métricas de evaluación
- Limitaciones mencionadas
"""`,
        tip: 'Guarda tus prompts favoritos en un archivo prompts.py para reutilizarlos.'
      },
      {
        title: '4. Generar tabla comparativa',
        content: 'Usa RAG para extraer información estructurada de múltiples papers.',
        code: `TABLE_PROMPT = """
Extrae la siguiente información de cada paper mencionado
y preséntala en formato de tabla:

| Autor(es) | Año | Metodología | Muestra | Resultados clave |
|-----------|-----|-------------|---------|------------------|

Tema de búsqueda: {topic}
"""

# El sistema buscará en todos los papers y generará la tabla`,
      },
      {
        title: '5. Detectar gaps de investigación',
        content: 'Identifica oportunidades de investigación analizando la literatura existente.',
        code: `GAP_ANALYSIS_PROMPT = """
Analiza la literatura proporcionada sobre {topic} e identifica:

1. **Preguntas sin responder**: ¿Qué preguntas plantean
   los autores que aún no se han investigado?

2. **Limitaciones comunes**: ¿Qué limitaciones mencionan
   múltiples estudios?

3. **Direcciones futuras**: ¿Qué sugieren los autores
   para investigación futura?

4. **Contradicciones**: ¿Hay resultados que se contradigan
   entre estudios?

Proporciona citas específicas para cada punto.
"""`,
        tip: 'Esta técnica es excelente para escribir la sección "State of the Art" de tu paper o tesis.'
      }
    ]
  },
  {
    id: 'rag-multilingue',
    title: 'RAG Multilingüe para Investigación',
    description: 'Configura un sistema que entienda papers en español, inglés y otros idiomas.',
    level: 'intermediate',
    duration: '45 min',
    tags: ['Multilingüe', 'Internacional', 'Embeddings'],
    steps: [
      {
        title: '1. Elegir embeddings multilingües',
        content: 'Para trabajar con múltiples idiomas, necesitas embeddings que entiendan varios idiomas en el mismo espacio vectorial.',
        code: `# Opciones de embeddings multilingües:

# 1. Sentence Transformers (gratuito, local)
model = "paraphrase-multilingual-MiniLM-L12-v2"
# Soporta 50+ idiomas incluyendo español

# 2. OpenAI (API, pago)
model = "text-embedding-3-large"
# Excelente calidad multilingüe

# 3. Cohere (API, tier gratuito disponible)
model = "embed-multilingual-v3.0"
# Optimizado para búsqueda multilingüe`,
        tip: 'El modelo multilingual de Sentence Transformers es gratuito y funciona muy bien para español-inglés.'
      },
      {
        title: '2. Configurar en RAG Builder',
        content: 'Selecciona Sentence Transformers como proveedor de embeddings y el modelo multilingüe.',
        code: `# En RAG Builder, selecciona:
# Embeddings → Sentence Transformers

# Luego en .env de tu proyecto:
EMBEDDING_MODEL=paraphrase-multilingual-MiniLM-L12-v2

# O modifica src/embeddings.py:
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')`,
      },
      {
        title: '3. Queries cross-lingüísticas',
        content: 'Con embeddings multilingües puedes preguntar en español y encontrar respuestas en papers en inglés.',
        code: `# Ejemplo: query en español, papers en inglés
query = "¿Cuáles son los efectos del cambio climático en la biodiversidad?"

# El sistema encontrará chunks relevantes de papers en inglés:
# "Climate change effects on biodiversity include..."
# "Species extinction rates have increased due to..."

# Y generará una respuesta en español usando esos chunks`,
        tip: 'Puedes configurar el prompt del LLM para que siempre responda en español, independientemente del idioma de los documentos.'
      },
      {
        title: '4. Organizar por idioma (opcional)',
        content: 'Si prefieres separar búsquedas por idioma, usa metadatos.',
        code: `# Añadir idioma como metadato durante ingesta
from langdetect import detect

def add_language_metadata(doc):
    doc.metadata["language"] = detect(doc.page_content[:500])
    return doc

# Filtrar por idioma en búsqueda
results = vectorstore.similarity_search(
    query,
    filter={"language": "en"}  # Solo papers en inglés
)`,
      }
    ]
  },
  {
    id: 'evaluacion-rag',
    title: 'Evaluar la Calidad de tu RAG',
    description: 'Mide y mejora la precisión de tu sistema RAG con métricas científicas.',
    level: 'advanced',
    duration: '1.5 horas',
    tags: ['Evaluación', 'Métricas', 'Calidad'],
    steps: [
      {
        title: '1. Por qué evaluar',
        content: 'En investigación científica, no basta con que el RAG "funcione". Necesitas métricas objetivas para reportar en papers y garantizar reproducibilidad.',
        tip: 'Un RAG sin evaluar puede generar "alucinaciones" que parezcan correctas pero sean inventadas. Esto es crítico en ciencia.'
      },
      {
        title: '2. Crear dataset de evaluación',
        content: 'Crea un conjunto de preguntas con respuestas conocidas basadas en tus documentos.',
        code: `# evaluation_dataset.json
{
  "test_cases": [
    {
      "question": "¿Cuál es la tasa de error reportada en el estudio X?",
      "expected_answer": "2.3% según la Tabla 2",
      "source_document": "paper_x.pdf",
      "relevant_chunks": ["chunk_id_1", "chunk_id_2"]
    },
    {
      "question": "¿Qué metodología usa el autor Y?",
      "expected_answer": "Análisis de regresión múltiple con n=500",
      "source_document": "paper_y.pdf"
    }
  ]
}`,
        tip: 'Crea al menos 20-30 preguntas cubriendo diferentes tipos: factuales, comparativas, de síntesis.'
      },
      {
        title: '3. Métricas de retrieval',
        content: 'Evalúa si el sistema encuentra los documentos correctos.',
        code: `from sklearn.metrics import precision_score, recall_score

def evaluate_retrieval(test_cases, rag_system):
    """Evalúa la calidad del retrieval"""
    results = []

    for case in test_cases:
        # Obtener chunks recuperados
        retrieved = rag_system.retrieve(case["question"])
        retrieved_ids = [c.id for c in retrieved]

        # Comparar con chunks esperados
        expected_ids = case.get("relevant_chunks", [])

        # Calcular hit rate
        hits = len(set(retrieved_ids) & set(expected_ids))
        results.append({
            "precision": hits / len(retrieved_ids) if retrieved_ids else 0,
            "recall": hits / len(expected_ids) if expected_ids else 0
        })

    # Promedios
    avg_precision = sum(r["precision"] for r in results) / len(results)
    avg_recall = sum(r["recall"] for r in results) / len(results)

    return {"precision": avg_precision, "recall": avg_recall}`,
      },
      {
        title: '4. Métricas de generación',
        content: 'Evalúa la calidad de las respuestas generadas.',
        code: `# Usar un LLM como evaluador (LLM-as-judge)
EVAL_PROMPT = """
Evalúa la siguiente respuesta del 1 al 5:

Pregunta: {question}
Respuesta esperada: {expected}
Respuesta del sistema: {actual}

Criterios:
- Precisión factual (¿es correcta?)
- Completitud (¿responde toda la pregunta?)
- Relevancia (¿usa información pertinente?)
- Citación (¿menciona fuentes?)

Puntuación (1-5):
Justificación:
"""

def evaluate_generation(test_cases, rag_system, evaluator_llm):
    scores = []
    for case in test_cases:
        response = rag_system.query(case["question"])

        eval_result = evaluator_llm.generate(
            EVAL_PROMPT.format(
                question=case["question"],
                expected=case["expected_answer"],
                actual=response
            )
        )
        scores.append(parse_score(eval_result))

    return sum(scores) / len(scores)`,
      },
      {
        title: '5. Detectar alucinaciones',
        content: 'Verifica que el RAG no invente información.',
        code: `HALLUCINATION_CHECK_PROMPT = """
Dado el siguiente contexto y respuesta, determina si la respuesta
contiene información NO presente en el contexto (alucinación).

Contexto recuperado:
{context}

Respuesta generada:
{response}

¿Contiene alucinaciones? (Sí/No)
Si sí, indica qué parte es inventada:
"""

def check_hallucinations(query, rag_system):
    # Obtener contexto y respuesta por separado
    context_chunks = rag_system.retrieve(query)
    context_text = "\\n".join([c.page_content for c in context_chunks])
    response = rag_system.query(query)

    # Verificar con LLM
    check = evaluator.generate(
        HALLUCINATION_CHECK_PROMPT.format(
            context=context_text,
            response=response
        )
    )
    return check`,
        tip: 'Ejecuta verificación de alucinaciones regularmente, especialmente antes de usar resultados en publicaciones.'
      },
      {
        title: '6. Reportar resultados',
        content: 'Documenta las métricas para reproducibilidad.',
        code: `# evaluation_report.md

## Evaluación del Sistema RAG

### Configuración
- Modelo LLM: Llama 3.1 8B
- Embeddings: paraphrase-multilingual-MiniLM-L12-v2
- Chunk size: 1000, Overlap: 200
- Top-K: 5

### Resultados

| Métrica | Valor |
|---------|-------|
| Retrieval Precision | 0.78 |
| Retrieval Recall | 0.85 |
| Generation Quality (1-5) | 4.2 |
| Hallucination Rate | 3% |

### Dataset
- 30 preguntas de evaluación
- Fuente: Papers sobre [tema]
- Fecha: 2025-01-29
`,
        tip: 'Incluye esta información en la sección de metodología si publicas resultados generados con RAG.'
      }
    ]
  }
];

const LEVEL_INFO: Record<TutorialLevel, { name: string; color: string; bgColor: string }> = {
  beginner: { name: 'Principiante', color: 'text-green-700', bgColor: 'bg-green-100' },
  intermediate: { name: 'Intermedio', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  advanced: { name: 'Avanzado', color: 'text-red-700', bgColor: 'bg-red-100' },
};

export default function TutorialesPage() {
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([0]));

  const tutorial = TUTORIALS.find(t => t.id === selectedTutorial);

  const toggleStep = (index: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSteps(newExpanded);
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

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Tutoriales para{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
            Investigadores
          </span>
        </h1>
        <p className="text-slate-600">
          Guías paso a paso para crear sistemas RAG adaptados a tu investigación
        </p>
      </div>

      {!selectedTutorial ? (
        /* Tutorial List */
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid gap-4">
            {TUTORIALS.map((tut) => {
              const levelInfo = LEVEL_INFO[tut.level];
              return (
                <button
                  key={tut.id}
                  onClick={() => {
                    setSelectedTutorial(tut.id);
                    setExpandedSteps(new Set([0]));
                  }}
                  className="bg-white rounded-xl border border-slate-200 p-6 text-left hover:border-primary-300 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${levelInfo.bgColor} ${levelInfo.color}`}>
                          {levelInfo.name}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {tut.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors mb-2">
                        {tut.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">
                        {tut.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tut.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-slate-400 group-hover:text-primary-600 transition-colors">
                      <span className="text-sm font-medium mr-2">{tut.steps.length} pasos</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Coming Soon */}
          <div className="mt-8 bg-slate-50 rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-2">Próximamente</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• RAG con datos experimentales (CSV, Excel)</li>
              <li>• Integración con Zotero y Mendeley</li>
              <li>• Despliegue en servidor del CSIC</li>
              <li>• RAG para análisis de patentes</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Tutorial Detail */
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => setSelectedTutorial(null)}
            className="inline-flex items-center text-sm text-slate-600 hover:text-primary-600 mb-6"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a tutoriales
          </button>

          {tutorial && (
            <>
              <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${LEVEL_INFO[tutorial.level].bgColor} ${LEVEL_INFO[tutorial.level].color}`}>
                    {LEVEL_INFO[tutorial.level].name}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tutorial.duration}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{tutorial.title}</h2>
                <p className="text-slate-600">{tutorial.description}</p>
              </div>

              <div className="space-y-4">
                {tutorial.steps.map((step, index) => (
                  <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleStep(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          expandedSteps.has(index) ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="font-medium text-slate-900">{step.title}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-slate-400 transition-transform ${expandedSteps.has(index) ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expandedSteps.has(index) && (
                      <div className="px-6 pb-6 border-t border-slate-100">
                        <div className="pt-4">
                          <p className="text-slate-600 mb-4">{step.content}</p>

                          {step.code && (
                            <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm mb-4">
                              <code>{step.code}</code>
                            </pre>
                          )}

                          {step.tip && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              <div>
                                <p className="font-medium text-amber-800 text-sm">Consejo</p>
                                <p className="text-amber-700 text-sm">{step.tip}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => setSelectedTutorial(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ← Todos los tutoriales
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Crear mi proyecto RAG
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
