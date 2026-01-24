'use client';

import React from 'react';
import { AVAILABLE_MODELS } from '@/lib/types';
import { StepProps } from './types';
import { LLM_PROVIDERS } from './constants';
import SelectionCard from './SelectionCard';

export default function StepLLM({ config, onUpdate }: StepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900  mb-2">
        Modelo de Lenguaje (LLM)
      </h2>
      <p className="text-slate-600  mb-8">
        Elige el proveedor y modelo para generar respuestas
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {LLM_PROVIDERS.map((provider) => (
          <SelectionCard
            key={provider.id}
            selected={config.llm.provider === provider.id}
            onClick={() => onUpdate({
              llm: {
                ...config.llm,
                provider: provider.id,
                model: AVAILABLE_MODELS[provider.id][0],
              }
            })}
            title={provider.name}
            description={provider.description}
            badge={provider.local ? 'Local' : undefined}
            badgeColor="green"
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="llm-model" className="block text-sm font-medium text-slate-700  mb-2">
            Modelo
          </label>
          <select
            id="llm-model"
            value={config.llm.model}
            onChange={(e) => onUpdate({ llm: { ...config.llm, model: e.target.value } })}
            className="w-full px-4 py-3 rounded-lg border border-slate-300  bg-white  text-slate-900  focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {AVAILABLE_MODELS[config.llm.provider].map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="llm-temperature" className="block text-sm font-medium text-slate-700  mb-2">
            Temperatura: {config.llm.temperature}
          </label>
          <input
            id="llm-temperature"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={config.llm.temperature}
            onChange={(e) => onUpdate({ llm: { ...config.llm, temperature: parseFloat(e.target.value) } })}
            className="w-full h-2 bg-slate-200  rounded-lg appearance-none cursor-pointer accent-primary-600"
            aria-valuemin={0}
            aria-valuemax={1}
            aria-valuenow={config.llm.temperature}
          />
          <div className="flex justify-between text-xs text-slate-500  mt-1">
            <span>Preciso</span>
            <span>Creativo</span>
          </div>
        </div>
      </div>

      {config.llm.provider !== 'ollama' && (
        <div className="mt-6 p-4 bg-amber-50  border border-amber-200  rounded-lg">
          <p className="text-sm text-amber-800 ">
            <strong>Nota:</strong> Necesitaras configurar tu API key en el archivo <code className="bg-amber-100  px-1 rounded">.env</code> despues de descargar el proyecto.
          </p>
        </div>
      )}
    </div>
  );
}
