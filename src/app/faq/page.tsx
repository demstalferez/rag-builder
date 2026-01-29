'use client';

import { useState } from 'react';
import Link from 'next/link';

type FAQCategory = 'general' | 'tecnico' | 'privacidad' | 'investigacion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

const CATEGORIES: { id: FAQCategory; name: string; icon: string }[] = [
  { id: 'general', name: 'General', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'tecnico', name: 'Técnico', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  { id: 'privacidad', name: 'Privacidad y Compliance', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { id: 'investigacion', name: 'Para Investigadores', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
];

const FAQS: FAQ[] = [
  // General
  {
    id: 'que-es-rag',
    question: '¿Qué es RAG y por qué lo necesito como investigador?',
    answer: `RAG (Retrieval-Augmented Generation) es una técnica que permite a los modelos de lenguaje (LLMs) acceder a tus documentos específicos para generar respuestas fundamentadas.

Como investigador, RAG te permite:
• Consultar tu bibliografía en lenguaje natural ("¿Qué dice el paper X sobre Y?")
• Sintetizar información de múltiples papers automáticamente
• Encontrar conexiones entre documentos que podrías haber pasado por alto
• Mantener tus datos privados usando modelos locales

A diferencia de ChatGPT, un RAG usa TUS documentos como fuente de verdad, no conocimiento genérico de Internet.`,
    category: 'general',
  },
  {
    id: 'necesito-programar',
    question: '¿Necesito saber programar para usar RAG Builder?',
    answer: `No necesitas ser programador, pero sí tener conocimientos básicos de terminal/línea de comandos para:
• Ejecutar comandos como "pip install" o "python script.py"
• Navegar carpetas en terminal
• Editar archivos de configuración (.env)

RAG Builder genera todo el código por ti. Solo necesitas:
1. Descargar el ZIP
2. Instalar dependencias (un comando)
3. Colocar tus documentos en una carpeta
4. Ejecutar el script

Si nunca has usado terminal, dedica 30 minutos a un tutorial básico de línea de comandos. Con eso es suficiente.`,
    category: 'general',
  },
  {
    id: 'que-hardware',
    question: '¿Qué ordenador necesito para ejecutar RAG localmente?',
    answer: `Depende del modelo que elijas:

**Mínimo (modelos pequeños como Llama 3.1 8B):**
• 16 GB RAM
• CPU moderna (últimos 5 años)
• 20 GB espacio en disco

**Recomendado (modelos medianos):**
• 32 GB RAM
• GPU con 8GB+ VRAM (opcional pero acelera mucho)
• SSD para mejor rendimiento

**Para modelos grandes (70B+):**
• 64 GB RAM o GPU con 24GB+ VRAM
• Alternativamente, usa APIs cloud (OpenAI, Anthropic)

La mayoría de portátiles de investigación modernos pueden ejecutar modelos de 8B sin problemas.`,
    category: 'general',
  },
  {
    id: 'cuanto-cuesta',
    question: '¿Cuánto cuesta usar RAG Builder?',
    answer: `**RAG Builder es 100% gratuito y open source.**

Los costes dependen de las opciones que elijas:

**Opción 100% gratuita (local):**
• Ollama (LLM local): Gratis
• Sentence Transformers (embeddings): Gratis
• ChromaDB/FAISS (vector DB): Gratis
• Coste total: 0€

**Opción con APIs cloud:**
• OpenAI GPT-4: ~0.03$/1K tokens (entrada) + 0.06$/1K tokens (salida)
• OpenAI Embeddings: ~0.0001$/1K tokens
• Para un proyecto típico con 100 papers: ~5-10€/mes de uso moderado

**Recomendación para investigadores:** Empieza con la opción local gratuita. Es suficiente para la mayoría de casos y mantiene tus datos privados.`,
    category: 'general',
  },
  // Técnico
  {
    id: 'que-formatos',
    question: '¿Qué formatos de documento soporta?',
    answer: `El código generado soporta:

**Bien soportados:**
• PDF (texto seleccionable)
• Markdown (.md)
• Texto plano (.txt)
• Word (.docx)

**Requieren configuración adicional:**
• PDF escaneados (necesitan OCR previo)
• PowerPoint (.pptx)
• Excel/CSV (para datos tabulares)
• HTML

**Consejo para papers:** La mayoría de papers de journals vienen en PDF con texto seleccionable. Si tienes PDFs escaneados (libros antiguos, tesis impresas), usa primero una herramienta de OCR como Adobe Acrobat o el gratuito OCRmyPDF.`,
    category: 'tecnico',
  },
  {
    id: 'cuantos-documentos',
    question: '¿Cuántos documentos puedo indexar?',
    answer: `No hay límite fijo. Depende de tu hardware:

**Referencia aproximada (16GB RAM, ChromaDB):**
• 100 papers: Sin problema
• 500 papers: Funciona bien
• 1000+ papers: Considera usar FAISS o Qdrant
• 10,000+ documentos: Usa Qdrant o Milvus con servidor dedicado

**Tiempos de indexación aproximados:**
• 100 papers (~20MB): 5-10 minutos
• 500 papers (~100MB): 30-45 minutos
• Primera vez es más lento (descarga modelos)

**Tip:** Puedes añadir documentos incrementalmente. No necesitas reindexar todo cada vez.`,
    category: 'tecnico',
  },
  {
    id: 'chunk-size',
    question: '¿Qué tamaño de chunk debo usar para papers científicos?',
    answer: `Para papers científicos, recomendamos:

**Configuración recomendada:**
• Chunk size: 800-1200 caracteres
• Overlap: 150-200 caracteres
• Estrategia: Recursiva

**Por qué estos valores:**
• Papers tienen párrafos densos con información importante
• Chunks muy pequeños (<500) pierden contexto
• Chunks muy grandes (>1500) diluyen la relevancia
• El overlap preserva continuidad entre secciones

**Casos especiales:**
• Abstracts: Puedes indexarlos como chunks completos (suelen ser ~300 palabras)
• Tablas/figuras: Mejor extraerlas y describirlas por separado
• Referencias: Considera excluirlas o indexarlas aparte`,
    category: 'tecnico',
  },
  {
    id: 'errores-comunes',
    question: '¿Cuáles son los errores más comunes y cómo solucionarlos?',
    answer: `**Error: "CUDA out of memory"**
Causa: GPU sin suficiente memoria para el modelo
Solución: Usa un modelo más pequeño o ejecuta en CPU (más lento pero funciona)

**Error: "Connection refused localhost:11434"**
Causa: Ollama no está ejecutándose
Solución: Ejecuta "ollama serve" en otra terminal

**Error: "No module named X"**
Causa: Dependencia no instalada
Solución: "pip install X" o reinstala requirements.txt

**Problema: Respuestas irrelevantes**
Causas posibles:
• Chunk size inadecuado → Ajusta tamaño
• Pocos chunks recuperados → Aumenta top_k
• Embeddings no óptimos → Prueba otro modelo

**Problema: Respuestas inventadas (alucinaciones)**
Soluciones:
• Añade "Responde solo con información del contexto" al prompt
• Baja la temperature a 0.1-0.3
• Verifica que el retrieval encuentra documentos relevantes`,
    category: 'tecnico',
  },
  // Privacidad
  {
    id: 'datos-privados',
    question: '¿Mis datos de investigación están seguros?',
    answer: `**Con la configuración local (recomendada), SÍ:**

Cuando usas Ollama + Sentence Transformers + ChromaDB:
• Todo se ejecuta en tu ordenador
• Ningún dato sale de tu máquina
• No hay conexión a servidores externos
• No hay telemetría ni tracking

**Con APIs cloud (OpenAI, Anthropic):**
• Tus documentos se envían a sus servidores para procesamiento
• Revisa sus políticas de privacidad
• OpenAI NO usa datos de API para entrenar (según su política actual)
• Para datos sensibles, usa siempre la opción local

**Recomendación CSIC:** Para datos de investigación no publicados, datos personales de estudios, o información confidencial, usa exclusivamente la configuración 100% local.`,
    category: 'privacidad',
  },
  {
    id: 'cumple-rgpd',
    question: '¿RAG cumple con el RGPD?',
    answer: `**RAG es una tecnología, el cumplimiento depende de cómo la uses:**

**Para cumplir RGPD:**

1. **Minimización de datos:** Solo indexa documentos necesarios
2. **Base legal:** Ten una base legal para procesar los datos (consentimiento, interés legítimo, investigación científica bajo Art. 89)
3. **Derechos:** Implementa mecanismos para eliminar datos si alguien lo solicita
4. **Seguridad:** Usa configuración local para datos personales
5. **Documentación:** Registra qué datos procesas y por qué

**Para investigación científica (Art. 89 RGPD):**
• Existen exenciones para investigación
• Pero debes implementar "garantías adecuadas"
• Consulta con el DPO de tu institución

**Consejo práctico:** Si tus documentos no contienen datos personales (papers publicados, manuales técnicos), el RGPD no aplica directamente.`,
    category: 'privacidad',
  },
  {
    id: 'ai-act-investigacion',
    question: '¿El AI Act aplica a mi proyecto de investigación?',
    answer: `**Probablemente NO, pero hay matices:**

**Exención para investigación (Art. 2.6 AI Act):**
El AI Act NO aplica a sistemas de IA desarrollados exclusivamente para investigación científica.

**PERO la exención NO aplica si:**
• Comercializas el sistema
• Lo pones a disposición de terceros fuera del contexto de investigación
• Lo usas para tomar decisiones que afectan a personas

**Los datos de entrenamiento SÍ deben cumplir RGPD** aunque el sistema esté exento del AI Act.

**Clasificación de riesgo:**
Un RAG típico para consultar papers es "riesgo mínimo" → Sin obligaciones especiales

**Riesgo alto (requiere cumplimiento):**
• RAG para diagnóstico médico
• RAG para selección de candidatos
• RAG que toma decisiones automatizadas sobre personas

**Recomendación:** Documenta que tu uso es exclusivamente para investigación.`,
    category: 'privacidad',
  },
  // Investigación
  {
    id: 'citar-rag',
    question: '¿Cómo cito información generada por RAG en mis papers?',
    answer: `**Importante: NO cites al RAG como fuente. Cita los documentos originales.**

El RAG es una herramienta de búsqueda, no una fuente primaria.

**Flujo correcto:**
1. RAG te dice: "Según Smith et al. (2023), el efecto es X"
2. Verifica en el paper original de Smith et al.
3. Cita a Smith et al., no al RAG

**En metodología, puedes mencionar:**
"Se utilizó un sistema RAG con [modelo] para facilitar la revisión de literatura de [N] papers."

**Transparencia en investigación:**
Si el RAG influyó significativamente en tu análisis, menciónalo en la sección de metodología. La comunidad científica valora la transparencia sobre herramientas usadas.

**Cuidado con:**
• Citar información que el RAG "inventó" (alucinaciones)
• Asumir que el RAG encontró TODOS los papers relevantes
• No verificar las citas que el RAG genera`,
    category: 'investigacion',
  },
  {
    id: 'revision-bibliografica',
    question: '¿Puedo usar RAG para hacer una revisión bibliográfica completa?',
    answer: `**RAG es excelente como ASISTENTE, pero no reemplaza el análisis crítico humano.**

**RAG es útil para:**
• Sintetizar hallazgos de múltiples papers
• Encontrar patrones y temas comunes
• Identificar gaps mencionados por autores
• Comparar metodologías rápidamente
• Generar tablas comparativas iniciales

**RAG NO puede:**
• Evaluar la calidad metodológica de los estudios
• Detectar sesgos en la literatura
• Juzgar la relevancia para tu pregunta de investigación específica
• Garantizar que encontró TODA la literatura relevante
• Reemplazar tu criterio experto

**Flujo recomendado:**
1. Búsqueda tradicional en bases de datos (WoS, Scopus, PubMed)
2. Indexa los papers relevantes en RAG
3. Usa RAG para síntesis y exploración
4. Verifica y complementa con lectura directa
5. Aplica tu análisis crítico como experto`,
    category: 'investigacion',
  },
  {
    id: 'alucinaciones',
    question: '¿Cómo evito que el RAG invente información (alucinaciones)?',
    answer: `**Las alucinaciones son un riesgo real. Así las minimizas:**

**1. Prompt engineering:**
Añade instrucciones explícitas:
"Responde SOLO con información presente en el contexto proporcionado. Si no encuentras la información, di 'No encontré información sobre esto en los documentos'."

**2. Temperatura baja:**
Usa temperature=0.1-0.3 para respuestas más deterministas y menos "creativas".

**3. Verifica el contexto:**
Configura el sistema para mostrar los chunks que usó. Si la respuesta no está en los chunks, es alucinación.

**4. Preguntas específicas:**
"¿Cuál es el tamaño de muestra en Smith 2023?" es mejor que "Háblame del paper de Smith"

**5. Evaluación sistemática:**
Crea un conjunto de preguntas con respuestas conocidas y verifica regularmente.

**En investigación científica:**
SIEMPRE verifica información crítica (datos, estadísticas, citas) en el documento original antes de usarla en tu trabajo.`,
    category: 'investigacion',
  },
  {
    id: 'papers-ingles',
    question: '¿Puedo preguntar en español sobre papers en inglés?',
    answer: `**Sí, con embeddings multilingües funciona muy bien.**

**Configuración recomendada:**
• Embeddings: paraphrase-multilingual-MiniLM-L12-v2 (Sentence Transformers)
• Este modelo entiende 50+ idiomas en el mismo espacio vectorial

**Cómo funciona:**
1. Indexas papers en inglés
2. Preguntas en español: "¿Qué metodología usaron?"
3. El sistema encuentra chunks relevantes en inglés
4. El LLM genera respuesta en español usando esos chunks

**Para mejores resultados:**
Añade al prompt del LLM: "Responde siempre en español, independientemente del idioma de los documentos."

**Limitación:**
La calidad es ligeramente menor que consultar en el mismo idioma del documento. Para análisis crítico, considera leer los pasajes relevantes en el idioma original.`,
    category: 'investigacion',
  },
  {
    id: 'colaborar-equipo',
    question: '¿Cómo comparto mi RAG con mi equipo de investigación?',
    answer: `**Opciones de menor a mayor complejidad:**

**1. Compartir el proyecto (simple):**
• Comprime la carpeta del proyecto
• Comparte vía Google Drive, OneDrive, etc.
• Cada miembro ejecuta localmente
• Limitación: Cada uno tiene su propia copia

**2. Servidor compartido (intermedio):**
• Despliega en un servidor del grupo/departamento
• Usa la API FastAPI incluida
• Todos consultan el mismo índice
• Requiere: Servidor con acceso al equipo

**3. Docker (recomendado para equipos):**
• El proyecto incluye docker-compose.yml
• Despliega con un comando
• Consistencia entre máquinas
• Fácil de actualizar

**Control de acceso:**
El código generado es básico. Para control de acceso real (quién puede consultar qué), necesitarás añadir autenticación. Considera usar herramientas como Authentik o integración con SSO institucional.

**Tip CSIC:** Consulta con el CAU si pueden proporcionar un servidor para tu grupo de investigación.`,
    category: 'investigacion',
  },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | 'all'>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = FAQS.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          Preguntas{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
            Frecuentes
          </span>
        </h1>
        <p className="text-slate-600">
          Respuestas a las dudas más comunes sobre RAG para investigación
        </p>
      </div>

      {/* Search */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar en las preguntas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Todas ({FAQS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
              </svg>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-start justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform ${
                    expandedFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedFAQ === faq.id && (
                <div className="px-6 pb-6 border-t border-slate-100">
                  <div className="pt-4 text-slate-600 whitespace-pre-line text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-slate-500">No se encontraron preguntas con esos criterios.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Still have questions */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">¿No encuentras tu respuesta?</h3>
          <p className="text-slate-300 mb-6">
            Consulta la documentación completa o contacta con el equipo de formación
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tutoriales"
              className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
            >
              Ver tutoriales
            </Link>
            <Link
              href="/glosario"
              className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Consultar glosario
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
