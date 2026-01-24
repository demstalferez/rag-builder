'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  RAGConfig,
  ComplexityLevel,
  DEFAULT_CONFIGS,
} from '@/lib/types';
import { generateProject, downloadProject } from '@/lib/generator';
import StepIndicator from './StepIndicator';
import {
  StepComplexity,
  StepUseCase,
  StepLLM,
  StepEmbeddings,
  StepVectorDB,
  StepAdvanced,
  StepDownload,
  STEPS,
  LOCAL_STORAGE_KEY,
} from './wizard';
import { useLocalStorage } from './wizard/hooks/useLocalStorage';
import { useValidation } from './wizard/hooks/useValidation';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Save,
} from 'lucide-react';

const INITIAL_CONFIG: RAGConfig = {
  projectName: 'mi-proyecto-rag',
  description: 'Proyecto RAG personalizado',
  complexity: 'basic',
  useCase: 'general',
  infrastructure: 'local',
  llm: { ...DEFAULT_CONFIGS.basic!.llm! },
  embedding: { ...DEFAULT_CONFIGS.basic!.embedding! },
  vectorDB: { ...DEFAULT_CONFIGS.basic!.vectorDB! },
  chunking: { ...DEFAULT_CONFIGS.basic!.chunking! },
  retrieval: { ...DEFAULT_CONFIGS.basic!.retrieval! },
  includeDocker: true,
  includeTests: false,
  includeAPI: false,
  includeUI: false,
  language: 'python',
};

export default function ConfigWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [config, setConfig, clearConfig] = useLocalStorage<RAGConfig>(LOCAL_STORAGE_KEY, INITIAL_CONFIG);
  const [isHydrated, setIsHydrated] = useState(false);

  // Validation
  const { isValid, errors, warnings } = useValidation(config);

  // Hydration check to avoid SSR mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const updateConfig = useCallback((updates: Partial<RAGConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, [setConfig]);

  const applyComplexityDefaults = useCallback((complexity: ComplexityLevel) => {
    const defaults = DEFAULT_CONFIGS[complexity];
    setConfig(prev => ({
      ...prev,
      complexity,
      llm: { ...defaults.llm! },
      embedding: { ...defaults.embedding! },
      vectorDB: { ...defaults.vectorDB! },
      chunking: { ...defaults.chunking! },
      retrieval: { ...defaults.retrieval! },
      includeDocker: defaults.includeDocker!,
      includeTests: defaults.includeTests!,
      includeAPI: defaults.includeAPI!,
      includeUI: defaults.includeUI!,
    }));
  }, [setConfig]);

  const handleGenerate = async () => {
    if (!isValid) {
      return;
    }

    setIsGenerating(true);
    try {
      const blob = await generateProject(config);
      const filename = `${config.projectName.replace(/\s+/g, '-').toLowerCase()}.zip`;
      downloadProject(blob, filename);
    } catch (error) {
      console.error('Error generating project:', error);
      alert('Error al generar el proyecto. Por favor intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    clearConfig();
    setConfig(INITIAL_CONFIG);
    setCurrentStep(1);
    setShowResetConfirm(false);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' && e.altKey && currentStep < STEPS.length) {
      nextStep();
    } else if (e.key === 'ArrowLeft' && e.altKey && currentStep > 1) {
      prevStep();
    }
  }, [currentStep]);

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-16 bg-slate-200  rounded-lg mb-8"></div>
          <div className="h-96 bg-slate-200  rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8" onKeyDown={handleKeyDown}>
      {/* Step Indicator */}
      <StepIndicator steps={STEPS} currentStep={currentStep} />

      {/* Persistence indicator & Reset button */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-slate-500 ">
          <Save className="w-4 h-4" aria-hidden="true" />
          <span>Progreso guardado automaticamente</span>
        </div>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center gap-1 text-slate-500  hover:text-red-600 transition-colors"
          aria-label="Reiniciar configuracion"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
        >
          <div className="bg-white  rounded-xl p-6 max-w-md mx-4 shadow-2xl">
            <h3 id="reset-dialog-title" className="text-lg font-semibold text-slate-900  mb-2">
              Reiniciar configuracion?
            </h3>
            <p className="text-slate-600  mb-6">
              Esto eliminara toda tu configuracion guardada y volvera a los valores por defecto.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg text-slate-700  hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && currentStep === STEPS.length && (
        <div className="mt-4 p-4 bg-amber-50  border border-amber-200  rounded-lg">
          <h4 className="font-medium text-amber-800  mb-2">Recomendaciones:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-amber-700 ">
            {warnings.map((warning, i) => (
              <li key={i}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Step Content */}
      <div className="mt-8 bg-white  rounded-xl shadow-lg p-8 border border-slate-200 ">
        {currentStep === 1 && (
          <StepComplexity
            config={config}
            onSelect={applyComplexityDefaults}
          />
        )}

        {currentStep === 2 && (
          <StepUseCase
            config={config}
            onUpdate={updateConfig}
          />
        )}

        {currentStep === 3 && (
          <StepLLM
            config={config}
            onUpdate={updateConfig}
          />
        )}

        {currentStep === 4 && (
          <StepEmbeddings
            config={config}
            onUpdate={updateConfig}
          />
        )}

        {currentStep === 5 && (
          <StepVectorDB
            config={config}
            onUpdate={updateConfig}
          />
        )}

        {currentStep === 6 && (
          <StepAdvanced
            config={config}
            onUpdate={updateConfig}
          />
        )}

        {currentStep === 7 && (
          <StepDownload
            config={config}
            onUpdate={updateConfig}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            validationErrors={errors}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium
            disabled:opacity-50 disabled:cursor-not-allowed
            bg-slate-100  hover:bg-slate-200
            text-slate-700  transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Paso anterior"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          <span>Anterior</span>
        </button>

        {/* Step counter */}
        <span className="text-sm text-slate-500 ">
          Paso {currentStep} de {STEPS.length}
        </span>

        {currentStep < STEPS.length && (
          <button
            onClick={nextStep}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium
              bg-primary-600 hover:bg-primary-700 text-white transition-colors
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Paso siguiente"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        )}

        {currentStep === STEPS.length && (
          <div className="w-[120px]"></div> // Spacer for alignment
        )}
      </div>

      {/* Keyboard shortcuts hint */}
      <p className="mt-4 text-center text-xs text-slate-400 ">
        Usa <kbd className="px-1.5 py-0.5 bg-slate-100  rounded text-xs">Alt</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100  rounded text-xs">&#8592;</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-100  rounded text-xs">&#8594;</kbd> para navegar
      </p>
    </div>
  );
}
