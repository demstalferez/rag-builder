'use client';

import React from 'react';
import { UseCaseType, InfrastructureType } from '@/lib/types';
import { StepProps } from './types';
import { USE_CASE_INFO, INFRASTRUCTURE_INFO } from './constants';
import SelectionCard from './SelectionCard';

export default function StepUseCase({ config, onUpdate }: StepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        Cual es tu caso de uso?
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Esto nos ayuda a optimizar la configuracion para tu tipo de documentos
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {(Object.keys(USE_CASE_INFO) as UseCaseType[]).map((useCase) => {
          const info = USE_CASE_INFO[useCase];
          return (
            <SelectionCard
              key={useCase}
              selected={config.useCase === useCase}
              onClick={() => onUpdate({ useCase })}
              title={info.name}
              description={info.description}
              icon={info.icon}
            />
          );
        })}
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Tipo de infraestructura
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {(Object.keys(INFRASTRUCTURE_INFO) as InfrastructureType[]).map((infra) => {
          const info = INFRASTRUCTURE_INFO[infra];
          return (
            <SelectionCard
              key={infra}
              selected={config.infrastructure === infra}
              onClick={() => onUpdate({ infrastructure: infra })}
              title={info.name}
              description={info.description}
              icon={info.icon}
            />
          );
        })}
      </div>
    </div>
  );
}
