<p align="center">
  <img src="public/logoupgradehub.svg" alt="Upgrade Hub" height="50" />
  &nbsp;&nbsp;&nbsp;
  <img src="public/1-CSIC-Logotipo-COLOR-TRANSPARENTE.png" alt="CSIC" height="50" />
</p>

<h1 align="center">RAG Builder</h1>

<p align="center">
  <strong>Generador Visual de Proyectos RAG</strong><br>
  Crea sistemas de Retrieval-Augmented Generation personalizados en minutos
</p>

<p align="center">
  <a href="#caracteristicas">Caracteristicas</a> •
  <a href="#demo">Demo</a> •
  <a href="#instalacion">Instalacion</a> •
  <a href="#uso">Uso</a> •
  <a href="#teoria-rag">Teoria RAG</a> •
  <a href="#tecnologias">Tecnologias</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

---

## Que es RAG Builder?

**RAG Builder** es una aplicacion web que te permite configurar visualmente un sistema RAG (Retrieval-Augmented Generation) y descargar un proyecto Python completo y listo para usar.

Desarrollado como parte del **Programa de Formacion en IA** de [Upgrade Hub](https://www.upgrade-hub.com/) en colaboracion con el [CSIC](https://www.csic.es/).

### Por que RAG?

Los sistemas RAG combinan la potencia de los modelos de lenguaje (LLMs) con la recuperacion de informacion de tus propios documentos. Esto permite:

- Respuestas basadas en **tu informacion especifica**
- **Reduccion de alucinaciones** al anclar respuestas en documentos reales
- **Actualizacion facil** sin reentrenar modelos
- **Privacidad** al mantener datos sensibles locales

---

## Caracteristicas

### Wizard de Configuracion Intuitivo

Interfaz paso a paso con 7 etapas para configurar todos los componentes:

| Paso | Descripcion |
|------|-------------|
| 1. Complejidad | Basico, Avanzado o Enterprise |
| 2. Caso de Uso | Cientifico, Legal, Codigo, Documentacion, Soporte |
| 3. LLM | Ollama, OpenAI, Anthropic, HuggingFace |
| 4. Embeddings | Sentence-Transformers, OpenAI, Ollama |
| 5. Vector DB | ChromaDB, FAISS, Qdrant, Milvus, Pinecone, pgvector |
| 6. Avanzado | Chunking, Retrieval, Docker, API, Tests |
| 7. Descarga | Preview y descarga del proyecto |

### Multiples Proveedores

<table>
<tr>
<td width="33%">

**LLM Providers**
- Ollama (local)
- OpenAI
- Anthropic
- HuggingFace

</td>
<td width="33%">

**Embeddings**
- Sentence-Transformers
- OpenAI
- Ollama

</td>
<td width="33%">

**Vector Databases**
- ChromaDB
- FAISS
- Qdrant
- Milvus
- Pinecone
- pgvector

</td>
</tr>
</table>

### Tecnicas Avanzadas

- **Busqueda Hibrida**: Combina busqueda semantica (vectores) con lexica (BM25)
- **Reranking**: Cross-Encoder para reordenar y mejorar precision
- **Chunking Configurable**: Recursivo, fijo, semantico o markdown
- **API REST**: FastAPI con documentacion automatica

### Proyecto Generado Completo

El ZIP descargado incluye:

```
mi-proyecto-rag/
├── src/
│   ├── config.py           # Configuracion centralizada
│   ├── embeddings.py       # Modelo de embeddings
│   ├── vectorstore.py      # Base de datos vectorial
│   ├── llm.py              # Modelo de lenguaje
│   ├── retriever.py        # Sistema de recuperacion
│   ├── rag_pipeline.py     # Pipeline principal
│   ├── indexer.py          # Indexacion de documentos
│   ├── query.py            # Interfaz de consultas
│   └── api/                # API REST (opcional)
├── tests/                  # Tests unitarios (opcional)
├── data/                   # Tus documentos
├── requirements.txt
├── .env.example
├── Dockerfile              # Docker (opcional)
├── docker-compose.yml
├── INSTRUCCIONES.md        # Guia completa
├── GUIA_RAPIDA.md          # Quick start
└── README.md
```

---

## Demo

### Pagina Principal

La aplicacion presenta un wizard interactivo para configurar tu proyecto RAG:

1. **Selecciona el nivel de complejidad** segun tu experiencia
2. **Elige el caso de uso** para optimizar configuraciones
3. **Configura cada componente** con opciones visuales
4. **Descarga tu proyecto** listo para ejecutar

### Guia de Teoria RAG

Incluye una **guia completa interactiva** con teoria y ejemplos practicos:

- Fundamentos teoricos de RAG
- Embeddings y busqueda semantica
- Estrategias de chunking
- Vector stores en profundidad
- Pipeline RAG completo
- Tecnicas avanzadas de retrieval
- Evaluacion y metricas
- Prompt engineering para RAG
- Despliegue en produccion

---

## Instalacion

### Requisitos

- Node.js 18 o superior
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/rag-builder.git
cd rag-builder

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en el navegador
open http://localhost:3000
```

### Build de Produccion

```bash
npm run build
npm start
```

---

## Uso

### 1. Configurar tu Proyecto RAG

1. Accede a la aplicacion en `http://localhost:3000`
2. Sigue el wizard paso a paso
3. Configura cada componente segun tus necesidades
4. Descarga el ZIP con tu proyecto

### 2. Ejecutar el Proyecto Generado

```bash
# Descomprimir y acceder
unzip mi-proyecto-rag.zip
cd mi-proyecto-rag

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Si usas Ollama, descargar modelo
ollama pull llama3.1:8b

# Indexar documentos
cp tus_documentos/*.pdf data/
python -m src.indexer

# Hacer consultas
python -m src.query "Tu pregunta aqui"

# (Opcional) Iniciar API
uvicorn src.api.main:app --reload
```

---

## Teoria RAG

La aplicacion incluye una **guia teorica completa** en formato Jupyter Notebook que cubre:

### Contenido del Curso

1. **Fundamentos Teoricos** - Que es RAG y por que usarlo
2. **Embeddings** - El corazon semantico, modelos y practica
3. **Chunking** - Division inteligente de documentos
4. **Vector Stores** - ChromaDB, FAISS, y otros
5. **Pipeline RAG** - Integracion completa
6. **Tecnicas Avanzadas** - Hibrido, reranking, multi-query
7. **Evaluacion** - Metricas y benchmarks
8. **Prompt Engineering** - Optimizacion de prompts
9. **Open Source** - Herramientas disponibles
10. **Produccion** - Despliegue y escalado

### Acceso

- **Web**: Navega a `/teoria` en la aplicacion
- **Notebook**: Descarga `guia_completa_rag.ipynb` desde la app

---

## Tecnologias

### Frontend

| Tecnologia | Version | Uso |
|------------|---------|-----|
| Next.js | 14 | Framework React con App Router |
| React | 18 | UI Components |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Estilos utility-first |
| Lucide React | - | Iconos |
| JSZip | - | Generacion de ZIP |

### Proyecto Generado

| Tecnologia | Uso |
|------------|-----|
| Python 3.9+ | Lenguaje base |
| LangChain | Framework RAG |
| FastAPI | API REST |
| Pydantic | Configuracion |
| Pytest | Testing |
| Docker | Contenedores |

---

## Estructura del Proyecto

```
rag-builder/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout con header/footer
│   │   ├── page.tsx            # Pagina principal
│   │   ├── teoria/
│   │   │   └── page.tsx        # Pagina de teoria RAG
│   │   └── globals.css         # Estilos globales
│   ├── components/
│   │   ├── ConfigWizard.tsx    # Wizard principal
│   │   ├── NotebookViewer.tsx  # Visor de notebook
│   │   ├── StepIndicator.tsx   # Indicador de pasos
│   │   ├── ThemeToggle.tsx     # Toggle dark mode
│   │   └── wizard/             # Componentes del wizard
│   │       ├── steps/          # Componentes de cada paso
│   │       ├── hooks/          # Custom hooks
│   │       ├── types.ts        # Tipos
│   │       └── constants.ts    # Constantes
│   └── lib/
│       ├── types.ts            # Tipos globales
│       ├── generator.ts        # Generador de ZIP
│       └── templates/          # Templates de codigo
│           ├── base.ts         # Requirements, Docker, etc
│           ├── python-code.ts  # Codigo Python
│           ├── api-code.ts     # API FastAPI
│           └── instructions.ts # Instrucciones
├── public/
│   ├── logoupgradehub.svg      # Logo Upgrade Hub
│   ├── 1-CSIC-Logotipo-*.png   # Logo CSIC
│   └── guia_completa_rag.ipynb # Notebook de teoria
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Licencia

Este proyecto esta bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para mas detalles.

---

## Creditos

Desarrollado como parte del **Programa de Formacion en Inteligencia Artificial**:

<p align="center">
  <a href="https://www.upgrade-hub.com/">
    <img src="public/logoupgradehub.svg" alt="Upgrade Hub" height="40" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://www.csic.es/">
    <img src="public/1-CSIC-Logotipo-COLOR-TRANSPARENTE.png" alt="CSIC" height="40" />
  </a>
</p>

<p align="center">
  <strong>Upgrade Hub</strong> & <strong>CSIC</strong> - Consejo Superior de Investigaciones Cientificas
</p>

---

<p align="center">
  Hecho con ❤️ para la comunidad de IA en espanol
</p>
