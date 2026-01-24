'use client';

import React from 'react';
import { EMBEDDING_MODELS } from '@/lib/types';
import { StepProps } from './types';
import { EMBEDDING_PROVIDERS } from './constants';
import SelectionCard from './SelectionCard';

export default function StepEmbeddings({ config, onUpdate }: StepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900  mb-2">
        Modelo de Embeddings
      </h2>
      <p className="text-slate-600  mb-8">
        Los embeddings convierten texto en vectores para la busqueda semantica
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {EMBEDDING_PROVIDERS.map((provider) => (
          <SelectionCard
            key={provider.id}
            selected={config.embedding.provider === provider.id}
            onClick={() => onUpdate({
              embedding: {
                ...config.embedding,
                provider: provider.id,
                model: EMBEDDING_MODELS[provider.id][0],
              }
            })}
            title={provider.name}
            description={provider.description}
          />
        ))}
      </div>

      <div>
        <label htmlFor="embedding-model" className="block text-sm font-medium text-slate-700  mb-2">
          Modelo de Embeddings
        </label>
        <select
          id="embedding-model"
          value={config.embedding.model}
          onChange={(e) => onUpdate({ embedding: { ...config.embedding, model: e.target.value } })}
          className="w-full px-4 py-3 rounded-lg border border-slate-300  bg-white  text-slate-900  focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {EMBEDDING_MODELS[config.embedding.provider].map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
