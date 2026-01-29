'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { StepDownloadProps } from './types';
import { USE_CASE_INFO } from './constants';

export default function StepDownload({
  config,
  onUpdate,
  onGenerate,
  isGenerating,
  validationErrors,
}: StepDownloadProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900  mb-2">
        Revisa y Descarga
      </h2>
      <p className="text-slate-600  mb-8">
        Configura los últimos detalles y descarga tu proyecto
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Project details */}
        <div className="space-y-6">
          <div>
            <label htmlFor="project-name" className="block text-sm font-medium text-slate-700  mb-2">
              Nombre del Proyecto
            </label>
            <input
              id="project-name"
              type="text"
              value={config.projectName}
              onChange={(e) => onUpdate({ projectName: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border bg-white  text-slate-900  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                validationErrors.projectName
                  ? 'border-red-500 '
                  : 'border-slate-300 '
              }`}
              placeholder="mi-proyecto-rag"
              aria-invalid={!!validationErrors.projectName}
              aria-describedby={validationErrors.projectName ? 'project-name-error' : undefined}
            />
            {validationErrors.projectName && (
              <p id="project-name-error" className="mt-1 text-sm text-red-600 ">
                {validationErrors.projectName}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-500 ">
              Solo letras, números, guiones y guiones bajos
            </p>
          </div>

          <div>
            <label htmlFor="project-description" className="block text-sm font-medium text-slate-700  mb-2">
              Descripción
            </label>
            <textarea
              id="project-description"
              value={config.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300  bg-white  text-slate-900  focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              placeholder="Describe tu proyecto RAG..."
            />
          </div>

          <div className="space-y-3">
            <p className="font-medium text-slate-900 ">Incluir en el proyecto:</p>

            {[
              { key: 'includeDocker', label: 'Docker (Dockerfile + docker-compose)', description: 'Facilita el despliegue con contenedores' },
              { key: 'includeTests', label: 'Tests con pytest', description: 'Pruebas unitarias para el pipeline' },
              { key: 'includeAPI', label: 'API REST con FastAPI', description: 'Endpoints para consultas via HTTP' },
            ].map(({ key, label, description }) => (
              <label key={key} className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={config[key as keyof typeof config] as boolean}
                  onChange={(e) => onUpdate({ [key]: e.target.checked })}
                  className="w-5 h-5 mt-0.5 rounded border-slate-300  text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <span className="text-slate-900  font-medium">{label}</span>
                  <p className="text-xs text-slate-500 ">{description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-slate-50  rounded-xl p-6">
          <h3 className="font-semibold text-slate-900  mb-4">Resumen de Configuración</h3>

          <div className="space-y-3 text-sm">
            <SummaryRow label="Nivel" value={config.complexity} capitalize />
            <SummaryRow label="Caso de uso" value={USE_CASE_INFO[config.useCase].name} />
            <SummaryRow label="LLM" value={`${config.llm.provider} / ${config.llm.model}`} />
            <SummaryRow label="Embeddings" value={config.embedding.provider} />
            <SummaryRow label="Vector DB" value={config.vectorDB.provider} />
            <SummaryRow label="Chunk size" value={String(config.chunking.chunkSize)} />
            <SummaryRow label="Top K" value={String(config.retrieval.topK)} />
            <SummaryRow label="Búsqueda híbrida" value={config.retrieval.useHybridSearch ? 'Sí' : 'No'} />
            <SummaryRow label="Reranking" value={config.retrieval.useReranking ? 'Sí' : 'No'} />
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 ">
            <h4 className="font-medium text-slate-900  mb-2">Archivos incluidos:</h4>
            <ul className="text-sm text-slate-600  space-y-1">
              <li>- Código fuente Python completo</li>
              <li>- requirements.txt</li>
              <li>- .env.example</li>
              <li>- README.md con instrucciones</li>
              {config.includeDocker && <li>- Dockerfile + docker-compose.yml</li>}
              {config.includeTests && <li>- Tests con pytest</li>}
              {config.includeAPI && <li>- API FastAPI</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !!validationErrors.projectName}
          className="flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg
            bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800
            text-white shadow-lg hover:shadow-xl transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-4 focus:ring-primary-300"
          aria-busy={isGenerating}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generando...</span>
            </>
          ) : (
            <>
              <Download className="w-6 h-6" aria-hidden="true" />
              <span>Descargar Proyecto ZIP</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, capitalize = false }: { label: string; value: string; capitalize?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-600 ">{label}:</span>
      <span className={`font-medium text-slate-900  ${capitalize ? 'capitalize' : ''}`}>
        {value}
      </span>
    </div>
  );
}
