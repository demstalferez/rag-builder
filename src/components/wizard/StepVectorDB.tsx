'use client';

import React from 'react';
import { StepProps } from './types';
import { VECTOR_DATABASES } from './constants';
import SelectionCard from './SelectionCard';

export default function StepVectorDB({ config, onUpdate }: StepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        Base de Datos Vectorial
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Donde se almacenan los embeddings para busqueda eficiente
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {VECTOR_DATABASES.map((db) => (
          <SelectionCard
            key={db.id}
            selected={config.vectorDB.provider === db.id}
            onClick={() => onUpdate({
              vectorDB: {
                ...config.vectorDB,
                provider: db.id,
              }
            })}
            title={db.name}
            description={db.description}
            badge={db.local ? 'Local' : 'Cloud'}
            badgeColor={db.local ? 'green' : 'blue'}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="collection-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Nombre de la Coleccion
          </label>
          <input
            id="collection-name"
            type="text"
            value={config.vectorDB.collectionName}
            onChange={(e) => onUpdate({ vectorDB: { ...config.vectorDB, collectionName: e.target.value } })}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="documents"
          />
        </div>

        {(config.vectorDB.provider === 'qdrant' || config.vectorDB.provider === 'milvus') && (
          <div>
            <label htmlFor="db-port" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Puerto
            </label>
            <input
              id="db-port"
              type="number"
              value={config.vectorDB.port || 6333}
              onChange={(e) => onUpdate({ vectorDB: { ...config.vectorDB, port: parseInt(e.target.value) } })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        )}
      </div>

      {config.vectorDB.provider === 'pinecone' && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Nota:</strong> Pinecone requiere una API key y configuracion de environment. Estos valores se configuraran en el archivo <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">.env</code>.
          </p>
        </div>
      )}

      {config.vectorDB.provider === 'pgvector' && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Nota:</strong> pgvector requiere una instancia de PostgreSQL con la extension pgvector instalada. Asegurate de tener PostgreSQL configurado antes de usar esta opcion.
          </p>
        </div>
      )}
    </div>
  );
}
