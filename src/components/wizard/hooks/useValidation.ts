'use client';

import { useMemo } from 'react';
import { RAGConfig } from '@/lib/types';
import { ValidationErrors } from '../types';

// Validation rules
const PROJECT_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
const COLLECTION_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*$/;

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
  warnings: string[];
}

export function useValidation(config: RAGConfig): ValidationResult {
  return useMemo(() => {
    const errors: ValidationErrors = {};
    const warnings: string[] = [];

    // Validate project name
    if (!config.projectName || config.projectName.trim() === '') {
      errors.projectName = 'El nombre del proyecto es requerido';
    } else if (config.projectName.length < 3) {
      errors.projectName = 'El nombre debe tener al menos 3 caracteres';
    } else if (config.projectName.length > 50) {
      errors.projectName = 'El nombre no puede tener mas de 50 caracteres';
    } else if (!PROJECT_NAME_REGEX.test(config.projectName)) {
      errors.projectName = 'Solo letras, numeros, guiones y guiones bajos. Debe empezar con letra.';
    }

    // Validate collection name
    if (config.vectorDB.collectionName && !COLLECTION_NAME_REGEX.test(config.vectorDB.collectionName)) {
      errors.collectionName = 'Solo letras, numeros y guiones bajos. Debe empezar con letra.';
    }

    // Warnings for potentially problematic configurations

    // pgvector without clear PostgreSQL setup note
    if (config.vectorDB.provider === 'pgvector') {
      warnings.push('pgvector requiere PostgreSQL con la extension instalada');
    }

    // Pinecone without API key warning
    if (config.vectorDB.provider === 'pinecone') {
      warnings.push('Pinecone requiere API key y configuracion de environment');
    }

    // Large chunk size with small overlap
    if (config.chunking.chunkSize > 1000 && config.chunking.chunkOverlap < 100) {
      warnings.push('Con chunks grandes, considera aumentar el overlap para mejor contexto');
    }

    // High temperature with enterprise level
    if (config.complexity === 'enterprise' && (config.llm.temperature ?? 0) > 0.5) {
      warnings.push('Para uso enterprise, considera una temperatura mas baja para respuestas mas consistentes');
    }

    // Using cloud LLM without API note
    if (config.llm.provider !== 'ollama' && config.llm.provider !== 'local') {
      warnings.push(`Recuerda configurar tu API key de ${config.llm.provider} en .env`);
    }

    // Reranking without hybrid search
    if (config.retrieval.useReranking && !config.retrieval.useHybridSearch) {
      warnings.push('El reranking funciona mejor combinado con busqueda hibrida');
    }

    // Very low top_k with reranking
    if (config.retrieval.useReranking && config.retrieval.topK < 5) {
      warnings.push('Con reranking, considera un top_k mayor (5-10) para mejores resultados');
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      warnings,
    };
  }, [config]);
}

export function validateProjectName(name: string): string | undefined {
  if (!name || name.trim() === '') {
    return 'El nombre del proyecto es requerido';
  }
  if (name.length < 3) {
    return 'El nombre debe tener al menos 3 caracteres';
  }
  if (name.length > 50) {
    return 'El nombre no puede tener mas de 50 caracteres';
  }
  if (!PROJECT_NAME_REGEX.test(name)) {
    return 'Solo letras, numeros, guiones y guiones bajos. Debe empezar con letra.';
  }
  return undefined;
}
