'use client';

import React from 'react';
import { ComplexityLevel } from '@/lib/types';
import { StepComplexityProps } from './types';
import SelectionCard from './SelectionCard';

const COMPLEXITY_LEVELS: { id: ComplexityLevel; name: string; description: string; features: string[] }[] = [
  {
    id: 'basic',
    name: 'Basico',
    description: 'Perfecto para empezar y aprender RAG',
    features: ['ChromaDB local', 'Ollama con Llama 3.1', 'Chunking recursivo', 'Sin reranking'],
  },
  {
    id: 'advanced',
    name: 'Avanzado',
    description: 'Para proyectos de produccion',
    features: ['Qdrant', 'Busqueda hibrida', 'Reranking con Cross-Encoder', 'API FastAPI incluida'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Maxima calidad y escalabilidad',
    features: ['Chunking semantico', 'Modelos grandes', 'UI incluida', 'Tests completos'],
  },
];

export default function StepComplexity({ config, onSelect }: StepComplexityProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        Elige el nivel de complejidad
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Selecciona una configuracion base que se ajuste a tus necesidades
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {COMPLEXITY_LEVELS.map((level, index) => (
          <SelectionCard
            key={level.id}
            selected={config.complexity === level.id}
            onClick={() => onSelect(level.id)}
            title={level.name}
            description={level.description}
            features={level.features}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' && index < COMPLEXITY_LEVELS.length - 1) {
                document.getElementById(`complexity-${COMPLEXITY_LEVELS[index + 1].id}`)?.focus();
              } else if (e.key === 'ArrowLeft' && index > 0) {
                document.getElementById(`complexity-${COMPLEXITY_LEVELS[index - 1].id}`)?.focus();
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
