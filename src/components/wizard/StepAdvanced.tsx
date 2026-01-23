'use client';

import React from 'react';
import { StepProps } from './types';

export default function StepAdvanced({ config, onUpdate }: StepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        Configuracion Avanzada
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Ajusta los parametros de chunking y retrieval
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Chunking */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2">
            Chunking
          </h3>

          <div>
            <label htmlFor="chunk-strategy" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Estrategia
            </label>
            <select
              id="chunk-strategy"
              value={config.chunking.strategy}
              onChange={(e) => onUpdate({ chunking: { ...config.chunking, strategy: e.target.value as 'recursive' | 'fixed' | 'semantic' | 'markdown' } })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="recursive">Recursivo</option>
              <option value="fixed">Tamano fijo</option>
              <option value="semantic">Semantico</option>
              <option value="markdown">Markdown</option>
            </select>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {config.chunking.strategy === 'recursive' && 'Divide recursivamente usando separadores jerarquicos'}
              {config.chunking.strategy === 'fixed' && 'Divide en chunks de tamano fijo'}
              {config.chunking.strategy === 'semantic' && 'Agrupa contenido semanticamente relacionado'}
              {config.chunking.strategy === 'markdown' && 'Optimizado para documentos Markdown'}
            </p>
          </div>

          <div>
            <label htmlFor="chunk-size" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tamano de Chunk: {config.chunking.chunkSize} caracteres
            </label>
            <input
              id="chunk-size"
              type="range"
              min="200"
              max="2000"
              step="100"
              value={config.chunking.chunkSize}
              onChange={(e) => onUpdate({ chunking: { ...config.chunking, chunkSize: parseInt(e.target.value) } })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              aria-valuemin={200}
              aria-valuemax={2000}
              aria-valuenow={config.chunking.chunkSize}
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>200</span>
              <span>2000</span>
            </div>
          </div>

          <div>
            <label htmlFor="chunk-overlap" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Overlap: {config.chunking.chunkOverlap} caracteres
            </label>
            <input
              id="chunk-overlap"
              type="range"
              min="0"
              max="500"
              step="50"
              value={config.chunking.chunkOverlap}
              onChange={(e) => onUpdate({ chunking: { ...config.chunking, chunkOverlap: parseInt(e.target.value) } })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              aria-valuemin={0}
              aria-valuemax={500}
              aria-valuenow={config.chunking.chunkOverlap}
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>0</span>
              <span>500</span>
            </div>
          </div>
        </div>

        {/* Retrieval */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2">
            Retrieval
          </h3>

          <div>
            <label htmlFor="top-k" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Top K: {config.retrieval.topK} documentos
            </label>
            <input
              id="top-k"
              type="range"
              min="1"
              max="15"
              step="1"
              value={config.retrieval.topK}
              onChange={(e) => onUpdate({ retrieval: { ...config.retrieval, topK: parseInt(e.target.value) } })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              aria-valuemin={1}
              aria-valuemax={15}
              aria-valuenow={config.retrieval.topK}
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>1</span>
              <span>15</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">Busqueda Hibrida</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Combina vectorial + BM25</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.retrieval.useHybridSearch}
                onChange={(e) => onUpdate({ retrieval: { ...config.retrieval, useHybridSearch: e.target.checked } })}
                className="sr-only peer"
                role="switch"
                aria-checked={config.retrieval.useHybridSearch}
              />
              <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">Reranking</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Cross-Encoder para mejor precision</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.retrieval.useReranking}
                onChange={(e) => onUpdate({ retrieval: { ...config.retrieval, useReranking: e.target.checked } })}
                className="sr-only peer"
                role="switch"
                aria-checked={config.retrieval.useReranking}
              />
              <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          {config.retrieval.useHybridSearch && (
            <div>
              <label htmlFor="hybrid-alpha" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Alpha hibrido: {config.retrieval.hybridAlpha ?? 0.5}
              </label>
              <input
                id="hybrid-alpha"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.retrieval.hybridAlpha ?? 0.5}
                onChange={(e) => onUpdate({ retrieval: { ...config.retrieval, hybridAlpha: parseFloat(e.target.value) } })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>BM25</span>
                <span>Vectorial</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
