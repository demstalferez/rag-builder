'use client';

import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'checklist' | 'template' | 'guide' | 'code';
  format: string;
  content: string;
}

const RESOURCES: Resource[] = [
  {
    id: 'checklist-compliance',
    title: 'Checklist de Compliance para IA en Investigación',
    description: 'Lista de verificación para cumplir con AI Act y RGPD en proyectos de investigación con IA.',
    type: 'checklist',
    format: 'Markdown',
    content: `# Checklist de Compliance para IA en Investigación

## Antes de Empezar el Proyecto

### Clasificación del Sistema (AI Act)
- [ ] He identificado el nivel de riesgo de mi sistema de IA
- [ ] Mi sistema es de riesgo mínimo/limitado (típico para RAG de consulta)
- [ ] Si es alto riesgo: He documentado los requisitos de conformidad
- [ ] He verificado que mi uso está cubierto por la exención de investigación (Art. 2.6)

### Base Legal para Datos (RGPD)
- [ ] He identificado si proceso datos personales
- [ ] He determinado la base legal aplicable:
  - [ ] Consentimiento explícito
  - [ ] Interés legítimo (con evaluación de balance)
  - [ ] Interés público en investigación científica (Art. 89)
- [ ] He documentado la base legal elegida

### Evaluación de Impacto (EIPD/DPIA)
- [ ] He evaluado si necesito realizar EIPD
- [ ] Si es necesaria: He completado la EIPD antes de iniciar
- [ ] He consultado con el DPO de mi institución si tengo dudas

## Durante el Desarrollo

### Minimización de Datos
- [ ] Solo proceso los datos estrictamente necesarios
- [ ] He eliminado datos personales innecesarios de los documentos
- [ ] He considerado técnicas de anonimización/seudonimización

### Documentación Técnica
- [ ] He documentado la arquitectura del sistema
- [ ] He registrado los modelos y versiones utilizados
- [ ] He documentado las decisiones de diseño y sus justificaciones
- [ ] Mantengo un registro de los datos de entrenamiento/indexación

### Seguridad
- [ ] Los datos están almacenados de forma segura
- [ ] He implementado control de acceso adecuado
- [ ] Uso cifrado para datos sensibles
- [ ] He configurado logging para auditoría

### Supervisión Humana
- [ ] El sistema no toma decisiones automatizadas sin supervisión
- [ ] Los usuarios saben que interactúan con IA
- [ ] Existe mecanismo para revisar y corregir outputs

## Derechos de los Interesados

- [ ] He implementado mecanismo para ejercicio de derechos (acceso, rectificación, supresión)
- [ ] Puedo identificar qué datos de una persona están en el sistema
- [ ] Puedo eliminar datos de una persona si lo solicita
- [ ] He informado a los interesados sobre el tratamiento

## Antes de Publicar/Compartir

- [ ] He verificado que no revelo datos personales en resultados
- [ ] He documentado el uso de IA en la metodología (si aplica)
- [ ] Los datos de entrenamiento cumplen con licencias y permisos
- [ ] He obtenido las autorizaciones institucionales necesarias

## Registro y Mantenimiento

- [ ] Mantengo registro de actividades de tratamiento
- [ ] Reviso periódicamente el cumplimiento
- [ ] Actualizo la documentación cuando hay cambios
- [ ] He definido período de retención de datos

---

**Fecha de revisión:** _______________
**Responsable:** _______________
**Proyecto:** _______________

> Este checklist es orientativo. Consulta con el DPO de tu institución para casos específicos.
`,
  },
  {
    id: 'prompts-investigacion',
    title: 'Plantillas de Prompts para Investigación',
    description: 'Colección de prompts optimizados para revisión bibliográfica, síntesis y análisis de papers.',
    type: 'template',
    format: 'Python',
    content: `"""
Plantillas de Prompts para Investigación Científica
Uso con sistemas RAG - RAG Builder CSIC/Upgrade Hub
"""

# ============================================
# PROMPTS PARA REVISIÓN BIBLIOGRÁFICA
# ============================================

SINTESIS_LITERATURA = """
Basándote en los documentos proporcionados, sintetiza los principales
hallazgos sobre: {topic}

Estructura tu respuesta en:

1. **Consensos**: ¿En qué coinciden los autores?
2. **Debates**: ¿Dónde hay desacuerdos o resultados contradictorios?
3. **Gaps**: ¿Qué aspectos faltan por investigar según los autores?
4. **Tendencias**: ¿Hacia dónde se dirige la investigación?

Cita los autores relevantes para cada punto usando el formato (Autor, año).
Si no encuentras información sobre algún aspecto, indícalo explícitamente.
"""

COMPARACION_METODOLOGIAS = """
Compara las metodologías utilizadas en los papers sobre: {topic}

Para cada estudio relevante, extrae:
- **Diseño**: Tipo de estudio (experimental, observacional, revisión, etc.)
- **Muestra**: Tamaño y características
- **Variables**: Principales variables medidas
- **Análisis**: Métodos estadísticos o analíticos
- **Limitaciones**: Limitaciones reconocidas por los autores

Presenta la comparación en formato estructurado.
"""

IDENTIFICAR_GAPS = """
Analiza la literatura proporcionada sobre {topic} e identifica
oportunidades de investigación:

1. **Preguntas abiertas**: ¿Qué preguntas plantean los autores
   que aún no tienen respuesta?

2. **Limitaciones recurrentes**: ¿Qué limitaciones mencionan
   múltiples estudios que podrían abordarse?

3. **Direcciones futuras**: ¿Qué sugieren explícitamente los
   autores para investigación futura?

4. **Contradicciones**: ¿Hay resultados contradictorios que
   requieran más investigación?

Proporciona citas específicas para cada punto identificado.
"""

# ============================================
# PROMPTS PARA ANÁLISIS DE PAPERS
# ============================================

RESUMEN_PAPER = """
Resume el paper proporcionado siguiendo esta estructura:

**Objetivo**: ¿Cuál es la pregunta de investigación o hipótesis principal?
**Metodología**: ¿Cómo se realizó el estudio? (diseño, muestra, métodos)
**Resultados**: ¿Cuáles son los hallazgos principales? (incluye datos clave)
**Conclusiones**: ¿Qué concluyen los autores?
**Limitaciones**: ¿Qué limitaciones reconocen?
**Implicaciones**: ¿Qué implicaciones tiene para la práctica o investigación futura?

Mantén el resumen objetivo y basado en lo que dice el documento.
"""

EXTRAER_DATOS = """
Del paper proporcionado, extrae la siguiente información en formato estructurado:

- Autores:
- Año de publicación:
- Revista/Fuente:
- Tipo de estudio:
- Tamaño de muestra (n):
- Principales variables:
- Resultados clave (con valores numéricos si los hay):
- Conclusión principal:
- Palabras clave:

Si algún dato no está disponible, indica "No especificado".
"""

ANALISIS_CRITICO = """
Realiza un análisis crítico del paper sobre: {topic}

Evalúa los siguientes aspectos:

1. **Validez interna**: ¿El diseño permite responder la pregunta de investigación?
2. **Validez externa**: ¿Los resultados son generalizables?
3. **Sesgos potenciales**: ¿Qué sesgos podrían afectar los resultados?
4. **Fortalezas**: ¿Qué hace bien este estudio?
5. **Debilidades**: ¿Qué podría mejorarse?
6. **Contribución**: ¿Qué aporta al campo de conocimiento?

Basa tu análisis en evidencia del documento, no en opiniones.
"""

# ============================================
# PROMPTS PARA GENERACIÓN DE CONTENIDO
# ============================================

TABLA_COMPARATIVA = """
Genera una tabla comparativa de los estudios sobre: {topic}

Columnas a incluir:
| Autor(es) | Año | País | Diseño | Muestra (n) | Intervención/Exposición | Resultado principal | Calidad* |

*Calidad: Alta/Media/Baja basada en diseño y tamaño muestral

Incluye todos los estudios relevantes encontrados en los documentos.
"""

ESTADO_DEL_ARTE = """
Redacta una sección de "Estado del Arte" para un paper sobre: {topic}

La sección debe:
- Tener 3-5 párrafos
- Citar los estudios más relevantes
- Seguir un orden lógico (cronológico, temático, o metodológico)
- Identificar el gap que justifica nueva investigación
- Usar tono académico formal
- Incluir citas en formato (Autor, año)

Termina con un párrafo que conecte con la necesidad de más investigación.
"""

HIPOTESIS_INVESTIGACION = """
Basándote en la revisión de literatura sobre: {topic}

Sugiere posibles hipótesis de investigación que:
1. Aborden gaps identificados en la literatura
2. Sean falsificables
3. Sean novedosas pero fundamentadas
4. Sean factibles de investigar

Para cada hipótesis, indica:
- La hipótesis formulada
- El gap que aborda
- Los estudios previos que la fundamentan
- El tipo de estudio necesario para probarla
"""

# ============================================
# PROMPTS DE VERIFICACIÓN
# ============================================

VERIFICAR_CITA = """
Verifica si la siguiente afirmación está respaldada por los documentos:

Afirmación: "{claim}"

Responde:
1. ¿Está respaldada? (Sí/No/Parcialmente)
2. ¿En qué documento(s) se encuentra?
3. ¿Cuál es la cita exacta relevante?
4. ¿Hay matices que la afirmación no capture?
"""

DETECTAR_CONTRADICCIONES = """
Analiza los documentos proporcionados sobre: {topic}

Identifica:
1. Resultados que se contradicen entre estudios
2. Posibles explicaciones para las contradicciones
3. Qué estudio tiene mayor peso metodológico
4. Cómo podría resolverse la contradicción

Sé específico citando los estudios involucrados.
"""

# ============================================
# CONFIGURACIÓN RECOMENDADA
# ============================================

"""
Para usar estos prompts con RAG Builder:

1. Copia el prompt deseado
2. Reemplaza {topic} con tu tema de investigación
3. Usa temperature=0.2-0.3 para respuestas más consistentes
4. Ajusta top_k=8-10 para obtener contexto suficiente
5. Verifica siempre las citas en los documentos originales

Ejemplo de uso:

    prompt = SINTESIS_LITERATURA.format(topic="efectos del cambio climático en biodiversidad")
    response = rag.query(prompt)
"""
`,
  },
  {
    id: 'config-papers',
    title: 'Configuración Óptima para Papers Científicos',
    description: 'Archivo de configuración recomendado para indexar y consultar papers académicos.',
    type: 'code',
    format: '.env',
    content: `# ============================================
# Configuración RAG para Papers Científicos
# RAG Builder - CSIC/Upgrade Hub
# ============================================

# --- PROYECTO ---
PROJECT_NAME=mi-proyecto-papers
LANGUAGE=es

# --- LLM (Modelo de Lenguaje) ---
# Opción 1: Local con Ollama (recomendado para privacidad)
LLM_PROVIDER=ollama
LLM_MODEL=llama3.1:8b
LLM_BASE_URL=http://localhost:11434

# Opción 2: OpenAI (mejor calidad, requiere API key)
# LLM_PROVIDER=openai
# LLM_MODEL=gpt-4-turbo
# OPENAI_API_KEY=sk-...

# Parámetros del LLM
LLM_TEMPERATURE=0.2
LLM_MAX_TOKENS=2048

# --- EMBEDDINGS ---
# Recomendado para papers multilingües
EMBEDDING_PROVIDER=sentence-transformers
EMBEDDING_MODEL=paraphrase-multilingual-MiniLM-L12-v2

# Alternativa para solo inglés (mejor calidad)
# EMBEDDING_MODEL=all-MiniLM-L6-v2

# Para papers científicos específicos
# EMBEDDING_MODEL=allenai/scibert_scivocab_uncased

# --- VECTOR DATABASE ---
VECTORDB_PROVIDER=chromadb
VECTORDB_PATH=./data/vectordb
VECTORDB_COLLECTION=papers

# Para colecciones grandes (1000+ papers)
# VECTORDB_PROVIDER=qdrant
# QDRANT_HOST=localhost
# QDRANT_PORT=6333

# --- CHUNKING (Crítico para papers) ---
CHUNKING_STRATEGY=recursive
CHUNK_SIZE=1000
CHUNK_OVERLAP=200

# Separadores optimizados para papers
# El sistema dividirá primero por secciones, luego párrafos
CHUNK_SEPARATORS=["\\n\\n", "\\n", ". ", " "]

# --- RETRIEVAL ---
TOP_K=8
USE_HYBRID_SEARCH=true
HYBRID_ALPHA=0.5

# Reranking (mejora significativa en precisión)
USE_RERANKING=true
RERANKER_MODEL=cross-encoder/ms-marco-MiniLM-L-6-v2

# --- DOCUMENTOS ---
DOCUMENTS_PATH=./documents
SUPPORTED_EXTENSIONS=.pdf,.txt,.md,.docx

# --- LOGGING (para auditoría) ---
LOG_LEVEL=INFO
LOG_FILE=./logs/rag.log
LOG_QUERIES=true

# --- PROMPT DEL SISTEMA ---
SYSTEM_PROMPT="""Eres un asistente de investigación especializado en análisis de literatura científica.

Reglas:
1. Responde SOLO con información presente en los documentos proporcionados
2. Si no encuentras información, di "No encontré información sobre esto en los documentos indexados"
3. Cita siempre las fuentes usando formato (Autor, año) cuando sea posible
4. Mantén un tono académico y objetivo
5. Si hay información contradictoria, menciona ambas posiciones
6. Responde en español salvo que se indique lo contrario"""

# ============================================
# NOTAS DE USO
# ============================================
#
# 1. Para papers en PDF, asegúrate de que tengan texto seleccionable
# 2. Ajusta CHUNK_SIZE según la densidad de tus documentos:
#    - Papers técnicos densos: 800-1000
#    - Documentos más ligeros: 1000-1500
# 3. TOP_K=8 es buen balance. Sube a 10-12 si necesitas más contexto
# 4. HYBRID_SEARCH mejora resultados cuando buscas términos específicos
# 5. RERANKING añade latencia pero mejora precisión significativamente
#
# Para más información: https://github.com/demstalferez/rag-builder
`,
  },
  {
    id: 'evaluacion-rag',
    title: 'Script de Evaluación de Calidad RAG',
    description: 'Código Python para evaluar la precisión y calidad de tu sistema RAG.',
    type: 'code',
    format: 'Python',
    content: `"""
Script de Evaluación de Calidad RAG
Para verificar la precisión de tu sistema antes de usarlo en investigación

Uso:
    python evaluate_rag.py --config evaluation_dataset.json
"""

import json
import argparse
from dataclasses import dataclass
from typing import List, Optional
import time

# Asume que tienes tu RAG configurado
# from src.rag import RAGPipeline

@dataclass
class TestCase:
    """Caso de prueba para evaluación"""
    question: str
    expected_answer: str
    source_document: Optional[str] = None
    keywords: Optional[List[str]] = None

@dataclass
class EvaluationResult:
    """Resultado de evaluación de un caso"""
    question: str
    expected: str
    actual: str
    retrieval_score: float
    answer_score: float
    latency_ms: float
    sources_found: List[str]

def load_test_cases(filepath: str) -> List[TestCase]:
    """Carga casos de prueba desde JSON"""
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    return [TestCase(**case) for case in data['test_cases']]

def evaluate_retrieval(retrieved_docs: list, expected_source: str, keywords: list) -> float:
    """
    Evalúa la calidad del retrieval

    Returns:
        Score entre 0 y 1
    """
    score = 0.0

    # Verificar si el documento esperado está en los recuperados
    if expected_source:
        sources = [doc.metadata.get('source', '') for doc in retrieved_docs]
        if any(expected_source in s for s in sources):
            score += 0.5

    # Verificar si los keywords aparecen en los chunks recuperados
    if keywords:
        all_text = ' '.join([doc.page_content.lower() for doc in retrieved_docs])
        keywords_found = sum(1 for kw in keywords if kw.lower() in all_text)
        score += 0.5 * (keywords_found / len(keywords))

    return min(score, 1.0)

def evaluate_answer(actual: str, expected: str, keywords: list = None) -> float:
    """
    Evalúa la calidad de la respuesta generada

    Returns:
        Score entre 0 y 1
    """
    actual_lower = actual.lower()
    expected_lower = expected.lower()

    score = 0.0

    # Similitud básica (contiene información clave)
    expected_words = set(expected_lower.split())
    actual_words = set(actual_lower.split())
    overlap = len(expected_words & actual_words) / len(expected_words) if expected_words else 0
    score += 0.5 * overlap

    # Keywords presentes
    if keywords:
        keywords_found = sum(1 for kw in keywords if kw.lower() in actual_lower)
        score += 0.3 * (keywords_found / len(keywords))

    # Penalizar respuestas muy cortas o "no encontré"
    if len(actual) < 50 or "no encontré" in actual_lower:
        score *= 0.5

    # Bonus por citar fuentes
    if "según" in actual_lower or "et al" in actual_lower or "(" in actual:
        score += 0.2

    return min(score, 1.0)

def run_evaluation(rag_pipeline, test_cases: List[TestCase]) -> List[EvaluationResult]:
    """Ejecuta la evaluación completa"""
    results = []

    for i, case in enumerate(test_cases, 1):
        print(f"Evaluando caso {i}/{len(test_cases)}: {case.question[:50]}...")

        # Medir tiempo
        start_time = time.time()

        # Obtener retrieval y respuesta
        retrieved = rag_pipeline.retrieve(case.question)
        response = rag_pipeline.query(case.question)

        latency = (time.time() - start_time) * 1000

        # Evaluar
        retrieval_score = evaluate_retrieval(
            retrieved,
            case.source_document,
            case.keywords or []
        )
        answer_score = evaluate_answer(
            response,
            case.expected_answer,
            case.keywords
        )

        # Guardar resultado
        results.append(EvaluationResult(
            question=case.question,
            expected=case.expected_answer,
            actual=response,
            retrieval_score=retrieval_score,
            answer_score=answer_score,
            latency_ms=latency,
            sources_found=[d.metadata.get('source', 'unknown') for d in retrieved[:3]]
        ))

    return results

def generate_report(results: List[EvaluationResult]) -> str:
    """Genera informe de evaluación en Markdown"""

    avg_retrieval = sum(r.retrieval_score for r in results) / len(results)
    avg_answer = sum(r.answer_score for r in results) / len(results)
    avg_latency = sum(r.latency_ms for r in results) / len(results)

    report = f"""# Informe de Evaluación RAG

**Fecha:** {time.strftime('%Y-%m-%d %H:%M')}
**Casos evaluados:** {len(results)}

## Métricas Generales

| Métrica | Valor |
|---------|-------|
| Retrieval Score (promedio) | {avg_retrieval:.2%} |
| Answer Score (promedio) | {avg_answer:.2%} |
| Latencia promedio | {avg_latency:.0f} ms |

## Interpretación

- **Retrieval > 70%**: El sistema encuentra documentos relevantes
- **Answer > 60%**: Las respuestas contienen información correcta
- **Latencia < 3000ms**: Rendimiento aceptable para uso interactivo

## Resultados por Caso

"""

    for i, r in enumerate(results, 1):
        status = "✅" if r.answer_score > 0.5 else "⚠️" if r.answer_score > 0.3 else "❌"
        report += f"""### Caso {i} {status}

**Pregunta:** {r.question}

**Respuesta esperada:** {r.expected[:200]}...

**Respuesta obtenida:** {r.actual[:200]}...

| Retrieval | Answer | Latencia |
|-----------|--------|----------|
| {r.retrieval_score:.0%} | {r.answer_score:.0%} | {r.latency_ms:.0f}ms |

---

"""

    # Recomendaciones
    report += """## Recomendaciones

"""
    if avg_retrieval < 0.7:
        report += "- ⚠️ **Retrieval bajo**: Considera ajustar chunk_size o usar búsqueda híbrida\\n"
    if avg_answer < 0.6:
        report += "- ⚠️ **Respuestas imprecisas**: Revisa el prompt del sistema o usa reranking\\n"
    if avg_latency > 5000:
        report += "- ⚠️ **Latencia alta**: Considera usar un modelo más pequeño o optimizar índices\\n"
    if avg_retrieval > 0.7 and avg_answer > 0.6:
        report += "- ✅ Sistema funcionando correctamente para uso en investigación\\n"

    return report

# ============================================
# EJEMPLO DE DATASET DE EVALUACIÓN
# ============================================

EXAMPLE_DATASET = {
    "test_cases": [
        {
            "question": "¿Cuál es la tasa de error reportada en el estudio de Smith 2023?",
            "expected_answer": "La tasa de error fue del 2.3% según la Tabla 2",
            "source_document": "smith_2023.pdf",
            "keywords": ["2.3%", "error", "tabla"]
        },
        {
            "question": "¿Qué metodología utilizaron García et al. para medir X?",
            "expected_answer": "Utilizaron análisis de regresión múltiple con una muestra de 500 participantes",
            "source_document": "garcia_2022.pdf",
            "keywords": ["regresión", "500", "participantes"]
        },
        {
            "question": "¿Cuáles son las limitaciones mencionadas en el estudio sobre Y?",
            "expected_answer": "Las principales limitaciones incluyen el tamaño muestral pequeño y la falta de grupo control",
            "keywords": ["limitaciones", "muestra", "control"]
        }
    ]
}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Evaluar calidad del sistema RAG')
    parser.add_argument('--config', type=str, help='Archivo JSON con casos de prueba')
    parser.add_argument('--generate-example', action='store_true',
                        help='Genera archivo de ejemplo')
    args = parser.parse_args()

    if args.generate_example:
        with open('evaluation_dataset.json', 'w', encoding='utf-8') as f:
            json.dump(EXAMPLE_DATASET, f, indent=2, ensure_ascii=False)
        print("Archivo de ejemplo creado: evaluation_dataset.json")
        print("Edítalo con tus propios casos de prueba.")
    else:
        print("Uso: python evaluate_rag.py --config evaluation_dataset.json")
        print("     python evaluate_rag.py --generate-example")
`,
  },
  {
    id: 'guia-privacidad',
    title: 'Guía de Privacidad para Investigadores',
    description: 'Guía práctica para mantener tus datos de investigación seguros usando RAG.',
    type: 'guide',
    format: 'Markdown',
    content: `# Guía de Privacidad para Investigadores

## Por qué importa la privacidad en RAG

Cuando usas un sistema RAG, tus documentos son procesados para generar respuestas.
Dependiendo de cómo configures el sistema, tus datos pueden:

- ✅ Quedarse 100% en tu ordenador (configuración local)
- ⚠️ Enviarse a servidores externos para procesamiento (APIs cloud)

Esta guía te ayuda a elegir la opción correcta según tus necesidades.

## Clasificación de Datos

### Datos que REQUIEREN configuración local:

- 📄 Papers no publicados o en revisión
- 🔬 Datos experimentales sin publicar
- 👥 Datos con información personal (estudios con participantes)
- 🏢 Documentos institucionales confidenciales
- 💊 Datos de salud o historiales médicos
- 🔒 Cualquier dato bajo acuerdo de confidencialidad

### Datos que pueden usar APIs cloud:

- 📚 Papers ya publicados y de acceso público
- 📖 Libros y manuales publicados
- 🌐 Documentación técnica pública
- 📝 Tus propias notas sin datos sensibles

## Configuración 100% Local (Recomendada)

### Componentes locales disponibles:

| Componente | Opción Local | Notas |
|------------|--------------|-------|
| LLM | Ollama (Llama, Mistral) | Descarga una vez, funciona offline |
| Embeddings | Sentence Transformers | Gratuito, sin conexión |
| Vector DB | ChromaDB, FAISS | Todo en tu disco |

### Cómo verificar que es local:

1. **Desconecta Internet** después de instalar
2. Ejecuta una consulta
3. Si funciona → Es 100% local

### Configuración en RAG Builder:

\`\`\`
Paso 3 (LLM): Selecciona "Ollama"
Paso 4 (Embeddings): Selecciona "Sentence Transformers"
Paso 5 (Vector DB): Selecciona "ChromaDB" o "FAISS"
\`\`\`

## Qué hacer con APIs Cloud

Si decides usar OpenAI, Anthropic u otros servicios cloud:

### Antes de usar:

1. **Lee la política de privacidad** del servicio
2. **Verifica si usan tus datos para entrenamiento**
   - OpenAI API: NO usa datos de API para entrenar (a fecha 2024)
   - Consulta políticas actualizadas
3. **Considera términos de uso institucionales**
   - ¿Tu institución permite enviar datos a estos servicios?

### Buenas prácticas:

- ✅ Anonimiza datos antes de enviar
- ✅ Elimina información identificable de documentos
- ✅ Usa pseudónimos si hay nombres de personas
- ✅ Revisa outputs antes de compartir
- ❌ NO envíes datos de participantes de estudios
- ❌ NO envíes datos bajo NDA

## Almacenamiento Seguro

### Tu ordenador:

\`\`\`
✅ Disco cifrado (FileVault en Mac, BitLocker en Windows)
✅ Contraseña de usuario fuerte
✅ Actualizaciones de seguridad al día
✅ Antivirus activo
\`\`\`

### La carpeta del proyecto:

\`\`\`
mi-proyecto-rag/
├── documents/          # Tus PDFs - considera cifrar esta carpeta
├── data/
│   └── vectordb/       # Embeddings - contienen representaciones de tus docs
├── .env                # API keys - NUNCA subas a Git
└── logs/               # Puede contener fragmentos de consultas
\`\`\`

### Qué NO hacer:

- ❌ Subir la carpeta \`documents/\` a GitHub
- ❌ Compartir el archivo \`.env\` con API keys
- ❌ Dejar el proyecto en carpetas compartidas sin cifrar
- ❌ Usar el proyecto en ordenadores públicos

## Para Datos de Participantes (Estudios con Humanos)

Si tus documentos contienen datos de participantes de estudios:

### Requisitos adicionales:

1. **Consentimiento informado** debe mencionar uso de IA
2. **Anonimización** antes de indexar
3. **Registro** del tratamiento según RGPD
4. **EIPD** probablemente requerida
5. **Consulta con tu Comité de Ética**

### Proceso recomendado:

\`\`\`
Datos originales → Anonimización → Datos anonimizados → RAG
         ↓
   (No usar directamente en RAG)
\`\`\`

## Checklist Rápido de Privacidad

Antes de empezar tu proyecto RAG:

- [ ] He clasificado mis datos (públicos vs. sensibles)
- [ ] He elegido configuración local si hay datos sensibles
- [ ] Mi disco está cifrado
- [ ] No subiré \`documents/\` ni \`.env\` a repositorios
- [ ] He informado a participantes si aplica
- [ ] He consultado con mi DPO si tengo dudas

## Recursos

- [AEPD - Guía de IA](https://www.aepd.es)
- [RGPD Art. 89 - Investigación científica](https://gdpr.eu/article-89/)
- [Política de privacidad OpenAI](https://openai.com/policies/privacy-policy)

---

> **Nota:** Esta guía es orientativa. Para casos específicos, consulta con
> el Delegado de Protección de Datos (DPO) de tu institución.
`,
  },
];

function downloadResource(resource: Resource) {
  const blob = new Blob([resource.content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;

  // Determinar extensión
  let ext = '.txt';
  if (resource.format === 'Markdown') ext = '.md';
  else if (resource.format === 'Python') ext = '.py';
  else if (resource.format === '.env') ext = '.env.example';

  a.download = `${resource.id}${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const TYPE_INFO = {
  checklist: { name: 'Checklist', color: 'text-green-700', bgColor: 'bg-green-100', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  template: { name: 'Plantilla', color: 'text-purple-700', bgColor: 'bg-purple-100', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  guide: { name: 'Guía', color: 'text-blue-700', bgColor: 'bg-blue-100', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  code: { name: 'Código', color: 'text-amber-700', bgColor: 'bg-amber-100', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
};

export default function RecursosPage() {
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
          Recursos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Descargables
          </span>
        </h1>
        <p className="text-slate-600">
          Checklists, plantillas y guías para tu investigación con RAG
        </p>
      </div>

      {/* Resources Grid */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid gap-6">
          {RESOURCES.map((resource) => {
            const typeInfo = TYPE_INFO[resource.type];
            return (
              <div
                key={resource.id}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${typeInfo.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <svg className={`w-6 h-6 ${typeInfo.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={typeInfo.icon} />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeInfo.bgColor} ${typeInfo.color}`}>
                            {typeInfo.name}
                          </span>
                          <span className="text-xs text-slate-500">{resource.format}</span>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {resource.description}
                        </p>
                      </div>

                      <button
                        onClick={() => downloadResource(resource)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Recursos Externos Recomendados</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-primary-300 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <p className="font-medium text-slate-900 text-sm">Anthropic Prompt Engineering</p>
                <p className="text-xs text-slate-500">Guía oficial de prompting</p>
              </div>
            </a>
            <a
              href="https://www.sbert.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-primary-300 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <p className="font-medium text-slate-900 text-sm">Sentence Transformers</p>
                <p className="text-xs text-slate-500">Documentación de embeddings</p>
              </div>
            </a>
            <a
              href="https://python.langchain.com/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-primary-300 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <p className="font-medium text-slate-900 text-sm">LangChain Docs</p>
                <p className="text-xs text-slate-500">Framework usado en el código generado</p>
              </div>
            </a>
            <a
              href="https://www.aepd.es/guias/guia-ia-y-proteccion-de-datos.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-primary-300 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <p className="font-medium text-slate-900 text-sm">AEPD - IA y Protección de Datos</p>
                <p className="text-xs text-slate-500">Guía oficial española</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">¿Listo para empezar?</h3>
          <p className="text-white/80 mb-4">Usa estos recursos junto con tu proyecto RAG</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            Crear proyecto RAG
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
