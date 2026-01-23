import { RAGConfig, ComplexityLevel, UseCaseType, InfrastructureType } from '@/lib/types';
import { LucideIcon } from 'lucide-react';

export interface StepProps {
  config: RAGConfig;
  onUpdate: (updates: Partial<RAGConfig>) => void;
}

export interface StepComplexityProps {
  config: RAGConfig;
  onSelect: (level: ComplexityLevel) => void;
}

export interface StepDownloadProps extends StepProps {
  onGenerate: () => void;
  isGenerating: boolean;
  validationErrors: ValidationErrors;
}

export interface Step {
  id: number;
  name: string;
  icon: LucideIcon;
}

export interface UseCaseInfo {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface InfrastructureInfo {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface ValidationErrors {
  projectName?: string;
  collectionName?: string;
}
