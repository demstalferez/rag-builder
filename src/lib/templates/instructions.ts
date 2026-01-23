import { RAGConfig } from '../types';

export function generateInstructions(config: RAGConfig): string {
  const projectName = config.projectName.replace(/\s+/g, '-').toLowerCase();

  return `# Instrucciones Completas - ${config.projectName}

## Indice

1. [Introduccion](#introduccion)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalacion](#instalacion)
4. [Configuracion](#configuracion)
5. [Uso del Sistema](#uso-del-sistema)
6. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
7. [Personalizacion](#personalizacion)
8. [Solucion de Problemas](#solucion-de-problemas)

---

## Introduccion

Este proyecto implementa un sistema **RAG (Retrieval-Augmented Generation)** que combina la recuperacion de informacion con la generacion de lenguaje natural. El sistema permite:

- Indexar documentos de diferentes formatos (PDF, TXT, MD, DOCX)
- Buscar informacion relevante usando embeddings vectoriales
- Generar respuestas contextualizadas usando un modelo de lenguaje

### Configuracion Seleccionada

| Componente | Seleccion |
|------------|-----------|
| **LLM** | ${config.llm.provider} (${config.llm.model}) |
| **Embeddings** | ${config.embedding.provider} (${config.embedding.model}) |
| **Base de Datos Vectorial** | ${config.vectorDB.provider} |
| **Tamano de Chunk** | ${config.chunking.chunkSize} caracteres |
| **Overlap** | ${config.chunking.chunkOverlap} caracteres |
| **Top-K Resultados** | ${config.retrieval.topK} |
| **Busqueda Hibrida** | ${config.retrieval.useHybridSearch ? 'Si' : 'No'} |
| **Reranking** | ${config.retrieval.useReranking ? 'Si' : 'No'} |

---

## Requisitos Previos

### Software Necesario

${config.llm.provider === 'ollama' ? `
#### Ollama (Requerido)
1. Descarga Ollama desde [ollama.ai](https://ollama.ai)
2. Instala siguiendo las instrucciones de tu sistema operativo
3. Verifica la instalacion:
   \`\`\`bash
   ollama --version
   \`\`\`
4. Descarga el modelo configurado:
   \`\`\`bash
   ollama pull ${config.llm.model}
   \`\`\`
${config.embedding.provider === 'ollama' ? `5. Descarga el modelo de embeddings:
   \`\`\`bash
   ollama pull ${config.embedding.model}
   \`\`\`` : ''}
` : ''}

#### Python
- **Version requerida**: Python 3.9 o superior
- Verifica tu version:
  \`\`\`bash
  python --version
  \`\`\`

${config.includeDocker ? `
#### Docker (Opcional pero Recomendado)
- Instala Docker Desktop desde [docker.com](https://docker.com)
- Verifica la instalacion:
  \`\`\`bash
  docker --version
  docker-compose --version
  \`\`\`
` : ''}

${config.vectorDB.provider === 'qdrant' ? `
#### Qdrant
Si usas Qdrant en modo servidor:
\`\`\`bash
docker run -p 6333:6333 qdrant/qdrant
\`\`\`
` : ''}

${config.vectorDB.provider === 'milvus' ? `
#### Milvus
Levanta Milvus con Docker:
\`\`\`bash
docker-compose -f docker-compose-milvus.yml up -d
\`\`\`
` : ''}

${config.vectorDB.provider === 'pinecone' ? `
#### Pinecone
1. Crea una cuenta en [pinecone.io](https://pinecone.io)
2. Crea un indice con la dimension correcta para tus embeddings
3. Obtiene tu API key y environment
` : ''}

---

## Instalacion

### Opcion 1: Instalacion Manual

1. **Crear entorno virtual**:
   \`\`\`bash
   python -m venv venv
   \`\`\`

2. **Activar entorno virtual**:
   - Windows:
     \`\`\`bash
     venv\\Scripts\\activate
     \`\`\`
   - macOS/Linux:
     \`\`\`bash
     source venv/bin/activate
     \`\`\`

3. **Instalar dependencias**:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. **Configurar variables de entorno**:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Edita el archivo \`.env\` con tus configuraciones.

${config.includeDocker ? `
### Opcion 2: Usando Docker

1. **Construir la imagen**:
   \`\`\`bash
   docker-compose build
   \`\`\`

2. **Levantar los servicios**:
   \`\`\`bash
   docker-compose up -d
   \`\`\`
` : ''}

---

## Configuracion

### Variables de Entorno

Edita el archivo \`.env\` con los siguientes valores:

\`\`\`env
# Configuracion del LLM
LLM_PROVIDER=${config.llm.provider}
LLM_MODEL=${config.llm.model}
${config.llm.provider === 'openai' ? 'OPENAI_API_KEY=tu-api-key-aqui' : ''}
${config.llm.provider === 'anthropic' ? 'ANTHROPIC_API_KEY=tu-api-key-aqui' : ''}
${config.llm.provider === 'ollama' ? 'OLLAMA_BASE_URL=http://localhost:11434' : ''}

# Configuracion de Embeddings
EMBEDDINGS_PROVIDER=${config.embedding.provider}
EMBEDDINGS_MODEL=${config.embedding.model}

# Configuracion de Vector Store
VECTOR_STORE_PROVIDER=${config.vectorDB.provider}
${config.vectorDB.provider === 'pinecone' ? `PINECONE_API_KEY=tu-api-key-aqui
PINECONE_ENVIRONMENT=tu-environment
PINECONE_INDEX_NAME=tu-indice` : ''}
${config.vectorDB.provider === 'qdrant' ? 'QDRANT_URL=http://localhost:6333' : ''}
${config.vectorDB.provider === 'milvus' ? 'MILVUS_HOST=localhost\nMILVUS_PORT=19530' : ''}

# Configuracion de Chunking
CHUNK_SIZE=${config.chunking.chunkSize}
CHUNK_OVERLAP=${config.chunking.chunkOverlap}

# Configuracion de Retrieval
TOP_K=${config.retrieval.topK}
USE_HYBRID_SEARCH=${config.retrieval.useHybridSearch}
USE_RERANKING=${config.retrieval.useReranking}
\`\`\`

---

## Uso del Sistema

### 1. Indexar Documentos

Coloca tus documentos en la carpeta \`data/\` y ejecuta:

\`\`\`bash
python -m src.indexer
\`\`\`

**Formatos soportados**: PDF, TXT, MD, DOCX

**Ejemplo**:
\`\`\`bash
# Copiar documentos
cp mis_documentos/*.pdf data/

# Indexar
python -m src.indexer
\`\`\`

### 2. Realizar Consultas

#### Via linea de comandos:
\`\`\`bash
python -m src.query "Tu pregunta aqui"
\`\`\`

#### Via codigo Python:
\`\`\`python
from src.rag_pipeline import RAGPipeline

pipeline = RAGPipeline()
respuesta = pipeline.query("¿Cual es el tema principal del documento?")
print(respuesta)
\`\`\`

${config.includeAPI ? `
### 3. Usar la API REST

#### Iniciar el servidor:
\`\`\`bash
uvicorn src.api.main:app --reload --port 8000
\`\`\`

#### Endpoints disponibles:

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | \`/\` | Informacion del sistema |
| GET | \`/health\` | Estado de salud |
| POST | \`/query\` | Realizar consulta |
| POST | \`/index\` | Indexar documentos |
| GET | \`/stats\` | Estadisticas |

#### Ejemplo de consulta:
\`\`\`bash
curl -X POST http://localhost:8000/query \\
  -H "Content-Type: application/json" \\
  -d '{"question": "¿De que trata el documento?"}'
\`\`\`

#### Documentacion interactiva:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
` : ''}

---

## Arquitectura del Proyecto

\`\`\`
${projectName}/
├── src/
│   ├── __init__.py
│   ├── config.py          # Configuracion centralizada
│   ├── embeddings.py      # Modelo de embeddings
│   ├── vectorstore.py     # Base de datos vectorial
│   ├── llm.py             # Modelo de lenguaje
│   ├── retriever.py       # Sistema de recuperacion
│   ├── rag_pipeline.py    # Pipeline principal
│   ├── indexer.py         # Indexacion de documentos
│   ├── query.py           # Interfaz de consultas
${config.includeAPI ? `│   └── api/
│       ├── __init__.py
│       └── main.py        # API FastAPI` : ''}
├── data/                  # Carpeta para documentos
├── requirements.txt       # Dependencias Python
├── .env.example          # Plantilla de configuracion
${config.includeDocker ? `├── Dockerfile            # Imagen Docker
├── docker-compose.yml    # Orquestacion` : ''}
${config.includeTests ? `├── tests/                # Tests unitarios` : ''}
└── README.md             # Documentacion
\`\`\`

### Flujo de Datos

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Documentos │────▶│  Chunking   │────▶│  Embeddings │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Respuesta  │◀────│     LLM     │◀────│  Retriever  │
└─────────────┘     └─────────────┘     └─────────────┘
                           ▲                   │
                           │                   ▼
                    ┌─────────────┐     ┌─────────────┐
                    │   Prompt    │◀────│ Vector Store│
                    └─────────────┘     └─────────────┘
\`\`\`

---

## Personalizacion

### Modificar el Prompt del Sistema

Edita \`src/rag_pipeline.py\`:

\`\`\`python
SYSTEM_PROMPT = """Tu nuevo prompt personalizado aqui.
Puedes incluir instrucciones especificas para tu caso de uso.
"""
\`\`\`

### Ajustar Parametros de Chunking

En \`src/config.py\` o via \`.env\`:

\`\`\`python
# Para documentos tecnicos (chunks mas grandes)
CHUNK_SIZE = 1500
CHUNK_OVERLAP = 200

# Para documentos cortos (chunks mas pequenos)
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50
\`\`\`

### Agregar Nuevos Tipos de Documentos

En \`src/indexer.py\`, modifica los loaders:

\`\`\`python
from langchain_community.document_loaders import UnstructuredHTMLLoader

# Agregar soporte para HTML
if file_path.endswith('.html'):
    loader = UnstructuredHTMLLoader(file_path)
\`\`\`

### Implementar Cache de Respuestas

Agrega caching para mejorar rendimiento:

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=100)
def cached_query(question: str) -> str:
    return pipeline.query(question)
\`\`\`

---

## Solucion de Problemas

### Error: "No module named 'src'"

**Solucion**: Ejecuta desde la raiz del proyecto:
\`\`\`bash
cd ${projectName}
python -m src.indexer
\`\`\`

${config.llm.provider === 'ollama' ? `
### Error: "Connection refused" con Ollama

**Solucion**:
1. Verifica que Ollama este corriendo:
   \`\`\`bash
   ollama list
   \`\`\`
2. Reinicia el servicio:
   \`\`\`bash
   ollama serve
   \`\`\`
` : ''}

### Error: "CUDA out of memory"

**Solucion**: Reduce el tamano del batch o usa CPU:
\`\`\`python
# En embeddings.py
model_kwargs={'device': 'cpu'}
\`\`\`

### Los resultados no son relevantes

**Soluciones**:
1. Aumenta \`TOP_K\` para obtener mas contexto
2. Reduce \`CHUNK_SIZE\` para chunks mas precisos
3. Aumenta \`CHUNK_OVERLAP\` para mejor continuidad
4. Activa \`USE_HYBRID_SEARCH\` para combinar busqueda semantica y lexica
5. Activa \`USE_RERANKING\` para reordenar resultados

### El sistema es lento

**Soluciones**:
1. Usa embeddings mas rapidos (ej: all-MiniLM-L6-v2)
2. Reduce \`TOP_K\`
3. Implementa cache de consultas frecuentes
4. Usa GPU si esta disponible

---

## Recursos Adicionales

- [Documentacion de LangChain](https://python.langchain.com/)
- [Guia de RAG](https://www.pinecone.io/learn/retrieval-augmented-generation/)
${config.llm.provider === 'ollama' ? '- [Documentacion de Ollama](https://ollama.ai/docs)' : ''}
${config.vectorDB.provider === 'chromadb' ? '- [Documentacion de ChromaDB](https://docs.trychroma.com/)' : ''}
${config.vectorDB.provider === 'pinecone' ? '- [Documentacion de Pinecone](https://docs.pinecone.io/)' : ''}
${config.vectorDB.provider === 'qdrant' ? '- [Documentacion de Qdrant](https://qdrant.tech/documentation/)' : ''}
${config.vectorDB.provider === 'milvus' ? '- [Documentacion de Milvus](https://milvus.io/docs)' : ''}

---

*Generado con RAG Builder - Programa de Formacion Upgrade Hub & CSIC*
`;
}

export function generateQuickStart(config: RAGConfig): string {
  return `# Guia Rapida - ${config.projectName}

## Inicio en 5 Pasos

### 1. Preparar el Entorno

\`\`\`bash
# Crear y activar entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\\Scripts\\activate

# Instalar dependencias
pip install -r requirements.txt
\`\`\`

### 2. Configurar Variables

\`\`\`bash
# Copiar plantilla de configuracion
cp .env.example .env

# Editar con tus valores (si es necesario)
nano .env  # o usa tu editor preferido
\`\`\`

${config.llm.provider === 'ollama' ? `
### 3. Iniciar Ollama

\`\`\`bash
# Descargar modelo LLM
ollama pull ${config.llm.model}

${config.embedding.provider === 'ollama' ? `# Descargar modelo de embeddings
ollama pull ${config.embedding.model}` : ''}

# Verificar que Ollama este corriendo
ollama list
\`\`\`
` : `
### 3. Configurar API Keys

Edita \`.env\` y agrega tu API key:
\`\`\`
${config.llm.provider === 'openai' ? 'OPENAI_API_KEY=sk-...' : ''}
${config.llm.provider === 'anthropic' ? 'ANTHROPIC_API_KEY=sk-ant-...' : ''}
\`\`\`
`}

### 4. Indexar Documentos

\`\`\`bash
# Agregar documentos a la carpeta data/
cp tus_documentos/*.pdf data/

# Ejecutar indexacion
python -m src.indexer
\`\`\`

### 5. Hacer Consultas

\`\`\`bash
# Consulta por linea de comandos
python -m src.query "¿De que trata este documento?"
\`\`\`

${config.includeAPI ? `
## Usar la API

\`\`\`bash
# Iniciar servidor
uvicorn src.api.main:app --reload --port 8000

# En otra terminal, hacer consulta
curl -X POST http://localhost:8000/query \\
  -H "Content-Type: application/json" \\
  -d '{"question": "Tu pregunta aqui"}'
\`\`\`

Documentacion interactiva: http://localhost:8000/docs
` : ''}

${config.includeDocker ? `
## Alternativa: Usar Docker

\`\`\`bash
# Construir y levantar
docker-compose up -d

# Ver logs
docker-compose logs -f
\`\`\`
` : ''}

---

## Comandos Utiles

| Comando | Descripcion |
|---------|-------------|
| \`python -m src.indexer\` | Indexar documentos |
| \`python -m src.query "pregunta"\` | Hacer consulta |
${config.includeAPI ? '| `uvicorn src.api.main:app --reload` | Iniciar API |' : ''}
${config.includeTests ? '| `pytest tests/` | Ejecutar tests |' : ''}

---

## Siguiente Paso

Lee \`INSTRUCCIONES.md\` para documentacion completa.

*Generado con RAG Builder - Upgrade Hub & CSIC*
`;
}
