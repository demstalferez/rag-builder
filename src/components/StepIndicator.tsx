'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  icon: LucideIcon;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Progreso del wizard" className="relative">
      {/* Progress bar background */}
      <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true" />

      {/* Progress bar fill */}
      <div
        className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        aria-hidden="true"
      />

      {/* Steps */}
      <ol className="relative flex justify-between">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <li key={step.id} className="flex flex-col items-center">
              {/* Step circle */}
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300 border-2
                  ${isCompleted
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : isCurrent
                    ? 'bg-white dark:bg-slate-800 border-primary-500 text-primary-500 shadow-lg dark:shadow-primary-500/20'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500'
                  }
                `}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <Icon className="w-5 h-5" aria-hidden="true" />
                )}
              </div>

              {/* Step label */}
              <span
                className={`
                  mt-2 text-xs font-medium transition-colors duration-300
                  ${isCompleted || isCurrent
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-400 dark:text-slate-500'
                  }
                `}
              >
                {step.name}
                <span className="sr-only">
                  {isCompleted ? ' (completado)' : isCurrent ? ' (paso actual)' : ' (pendiente)'}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      {/* Screen reader summary */}
      <div className="sr-only" aria-live="polite">
        Paso {currentStep} de {steps.length}: {steps[currentStep - 1]?.name}
      </div>
    </nav>
  );
}
