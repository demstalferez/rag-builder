import Link from 'next/link';
import ConfigWizard from '@/components/ConfigWizard';

export default function Home() {
  return (
    <div className="py-6 md:py-8">
      {/* Hero Section - Compact */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-upgrade-black mb-3">
          Crea tu Proyecto{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-upgrade-yellow to-upgrade-blue">
            RAG
          </span>{' '}
          en Minutos
        </h1>
        <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
          Configura visualmente tu sistema de Retrieval-Augmented Generation.
          Elige componentes y descarga un proyecto listo para usar.
        </p>

        {/* Feature badges - inline */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['100% Local', 'Docker Ready', 'FastAPI', 'Open Source'].map((feature) => (
            <span key={feature} className="inline-flex items-center px-3 py-1 rounded-full bg-upgrade-yellow/20 text-upgrade-black text-xs font-medium">
              <svg className="w-3 h-3 mr-1.5 text-upgrade-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Wizard - Main content */}
      <ConfigWizard />

      {/* Learning Resources - Compact cards */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <h2 className="text-lg font-semibold text-upgrade-black text-center mb-6">
          Recursos de Aprendizaje
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Teoria Card */}
          <Link
            href="/teoria"
            className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-upgrade-blue hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-upgrade-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-upgrade-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-upgrade-black group-hover:text-upgrade-blue transition-colors">
                  Guia Completa de RAG
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  Teoria, embeddings, chunking, vector stores y ejemplos practicos con codigo.
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-500">10 secciones</span>
                  <span className="text-xs text-gray-500">Notebook incluido</span>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-upgrade-blue group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Normativa Card */}
          <Link
            href="/normativa"
            className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-upgrade-yellow hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-upgrade-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-upgrade-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-upgrade-black group-hover:text-upgrade-black transition-colors">
                  Normativa: AI Act y RGPD
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  Marco regulatorio europeo, cumplimiento y buenas practicas para investigacion.
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-upgrade-black font-medium">CSIC + Upgrade Hub</span>
                  <span className="text-xs text-gray-500">Checklist incluido</span>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-upgrade-yellow group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-upgrade-gray-light rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-medium text-upgrade-black mb-1">Configuracion Rapida</h3>
            <p className="text-sm text-gray-700">
              Proyecto RAG completo en menos de 5 minutos.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 bg-upgrade-gray-light rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-upgrade-black mb-1">Totalmente Configurable</h3>
            <p className="text-sm text-gray-700">
              Multiples LLMs, embeddings y vector stores.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 bg-upgrade-gray-light rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-medium text-upgrade-black mb-1">Cumple Normativa EU</h3>
            <p className="text-sm text-gray-700">
              Modelos open source, datos 100% locales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
