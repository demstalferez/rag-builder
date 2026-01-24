'use client';

import Link from 'next/link';

export default function NormativaPage() {
  return (
    <div className="py-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Builder
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Regulacion Europea:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                AI Act y RGPD
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Marco normativo para el uso de IA en investigacion cientifica
            </p>
          </div>
        </div>
      </div>

      {/* Collaboration Banner */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 text-white overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/30">
                Colaboracion Institucional
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/30">
                Protocolo 2025-2030
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              CSIC + Upgrade Hub: Impulsando el Talento Digital
            </h2>

            <p className="text-slate-300 mb-6 max-w-3xl">
              Esta herramienta surge del <strong className="text-white">Protocolo General de Actuacion</strong> firmado entre el
              Consejo Superior de Investigaciones Cientificas (CSIC) y Upgrade Hub, con el objetivo de capacitar a
              investigadores y tecnicos en competencias digitales avanzadas, incluyendo IA, ciencia de datos y tecnologias RAG.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">380h</p>
                    <p className="text-xs text-slate-400">Bootcamp Intensivo</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">Data Analytics & IA para investigadores del programa Momentum</p>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">17.000+</p>
                    <p className="text-xs text-slate-400">Profesionales CSIC</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">Acceso gratuito al programa "Despierta tu instinto Tech"</p>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">5 anos</p>
                    <p className="text-xs text-slate-400">Vigencia Protocolo</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">Formacion continua hasta 2030</p>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-amber-400 mb-1">¿Por que esta herramienta?</h4>
                  <p className="text-sm text-slate-300">
                    RAG Builder nace para que investigadores y tecnicos del CSIC puedan crear sus propias herramientas de IA
                    de forma autonoma, cumpliendo con la normativa europea y aprovechando modelos open source.
                    Forma parte del contenido formativo del Bootcamp Data Analytics & IA, donde los alumnos aprenden
                    tecnicas como <strong className="text-white">ETL, RAG, Machine Learning y LLMs</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Contenido
          </h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#introduccion" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 py-1">
              1. Contexto: IA en el CSIC
            </a>
            <a href="#ai-act" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 py-1">
              2. Reglamento de IA (AI Act)
            </a>
            <a href="#rgpd" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 py-1">
              3. RGPD en Proyectos de IA
            </a>
            <a href="#checklist" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 py-1">
              4. Checklist de Cumplimiento
            </a>
            <a href="#recursos" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 py-1">
              5. Recursos y Referencias
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 space-y-8">

        {/* Section 1: Introduccion */}
        <section id="introduccion" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mr-3 text-amber-600 dark:text-amber-400 text-sm font-bold">1</span>
            Contexto: IA en el CSIC
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400">
              El CSIC, como mayor organismo publico de investigacion de Espana, esta en una posicion unica para
              liderar la adopcion responsable de la IA en el ambito cientifico. En colaboracion con <strong>Upgrade Hub</strong>,
              estamos formando a investigadores y tecnicos en el uso de tecnologias como RAG, LLMs y ciencia de datos.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 my-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                "El 89% de las organizaciones cientificas europeas no estan completamente preparadas para cumplir con el AI Act."
              </p>
            </div>

            <p className="text-slate-600 dark:text-slate-400">
              Europa se ha posicionado como lider mundial en regulacion tecnologica. Comprender este marco normativo es crucial para:
            </p>

            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Equilibrar innovacion cientifica con proteccion de derechos fundamentales</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Gestionar adecuadamente datos personales y sensibles en investigacion</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cumplir con las obligaciones legales al desarrollar sistemas de IA</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Mantener la soberania sobre los datos usando modelos open source locales</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
              <h4 className="font-semibold text-primary-800 dark:text-primary-300 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Competencias del Bootcamp Data Analytics & IA
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded text-primary-700 dark:text-primary-400">Python & SQL</span>
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded text-primary-700 dark:text-primary-400">Machine Learning</span>
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded text-primary-700 dark:text-primary-400">ETL & RAG</span>
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded text-primary-700 dark:text-primary-400">LLMs & Vision</span>
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded text-primary-700 dark:text-primary-400">Azure Cloud</span>
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded text-primary-700 dark:text-primary-400">Power BI</span>
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded text-primary-700 dark:text-primary-400">n8n Automation</span>
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded text-primary-700 dark:text-primary-400">Microsoft Fabric</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: AI Act */}
        <section id="ai-act" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mr-3 text-amber-600 dark:text-amber-400 text-sm font-bold">2</span>
            Reglamento de Inteligencia Artificial (AI Act)
          </h2>

          <div className="space-y-6">
            {/* Vision General */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Vision General</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-slate-100">Entrada en vigor:</strong> Agosto 2024, con implementacion gradual hasta 2027
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-slate-100">Alcance:</strong> Primer marco legal integral sobre IA a nivel mundial
                  </p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mt-4">
                El AI Act utiliza un <strong>enfoque basado en riesgos</strong>: no prohibe la IA, sino que la regula segun su potencial impacto en los derechos fundamentales.
              </p>
            </div>

            {/* Clasificacion por Riesgo */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Clasificacion por Niveles de Riesgo</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-slate-100 rounded-tl-lg">Nivel</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">Descripcion</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-slate-100 rounded-tr-lg">Ejemplos en Investigacion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr className="bg-red-50 dark:bg-red-900/20">
                      <td className="px-4 py-3 font-medium text-red-700 dark:text-red-400">Inaceptable</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Prohibido en la UE</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Puntuacion social, manipulacion subliminal, identificacion biometrica masiva</td>
                    </tr>
                    <tr className="bg-orange-50 dark:bg-orange-900/20">
                      <td className="px-4 py-3 font-medium text-orange-700 dark:text-orange-400">Alto Riesgo</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Requisitos estrictos de conformidad</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">IA diagnostica medica, seleccion de candidatos, analisis de datos biometricos</td>
                    </tr>
                    <tr className="bg-yellow-50 dark:bg-yellow-900/20">
                      <td className="px-4 py-3 font-medium text-yellow-700 dark:text-yellow-400">Riesgo Limitado</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Obligaciones de transparencia</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Chatbots, sistemas de recomendacion, generacion de contenido</td>
                    </tr>
                    <tr className="bg-green-50 dark:bg-green-900/20">
                      <td className="px-4 py-3 font-medium text-green-700 dark:text-green-400">Riesgo Minimo</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Sin restricciones especificas</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Filtros de spam, videojuegos, herramientas de productividad</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Obligaciones Alto Riesgo */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Obligaciones para Sistemas de Alto Riesgo</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: "Sistema de gestion de riesgos documentado" },
                  { icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4", text: "Gobernanza de datos: calidad, representatividad, trazabilidad" },
                  { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: "Documentacion tecnica completa" },
                  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", text: "Registro de actividades (logging)" },
                  { icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", text: "Transparencia y provision de informacion a usuarios" },
                  { icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z", text: "Supervision humana efectiva" },
                  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "Precision, robustez y ciberseguridad" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                    <svg className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exenciones Investigacion */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Exenciones para Investigacion Cientifica (Art. 2.6)
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• Exencion para IA desarrollada <strong>exclusivamente</strong> con fines de investigacion cientifica</li>
                <li>• <strong>IMPORTANTE:</strong> La exencion NO aplica si el sistema se comercializa o se pone a disposicion de terceros</li>
                <li>• Los datos de entrenamiento SI deben cumplir con RGPD aunque sea investigacion</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: RGPD */}
        <section id="rgpd" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mr-3 text-amber-600 dark:text-amber-400 text-sm font-bold">3</span>
            RGPD y su Aplicacion en Proyectos de IA
          </h2>

          <div className="space-y-6">
            {/* Principios Fundamentales */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Principios Fundamentales del RGPD en IA</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Minimizacion de datos", desc: "Usar solo los datos estrictamente necesarios" },
                  { title: "Limitacion de la finalidad", desc: "Los datos recogidos para un fin no pueden usarse para otro incompatible" },
                  { title: "Exactitud", desc: "Obligacion de mantener datos actualizados y corregir inexactitudes" },
                  { title: "Limitacion del plazo", desc: "No mantener datos mas tiempo del necesario" },
                  { title: "Integridad y confidencialidad", desc: "Seguridad adecuada de los datos" },
                  { title: "Responsabilidad proactiva", desc: "Demostrar cumplimiento activamente" },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bases Legales */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Bases Legales para el Tratamiento</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">Consentimiento explicito</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Especialmente relevante para datos sensibles</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">Interes legitimo</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Puede aplicar en investigacion, pero requiere ponderacion</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">Interes publico en investigacion cientifica (Art. 89)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Base legal especifica con garantias adicionales</p>
                </div>
              </div>
            </div>

            {/* Derechos de los Interesados */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Derechos de los Interesados Relevantes para IA</h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-bold rounded mr-3 flex-shrink-0">22</span>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">Articulo 22</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Derecho a no ser objeto de decisiones automatizadas con efectos juridicos significativos</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">Derecho de acceso</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Incluye la logica aplicada en decisiones automatizadas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">Derecho de rectificacion y supresion</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Impacto en modelos ya entrenados</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">Derecho a la portabilidad</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Formatos interoperables</p>
                  </div>
                </div>
              </div>
            </div>

            {/* EIPD */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Evaluacion de Impacto (EIPD/DPIA)</h4>
              <p className="text-sm text-purple-700 dark:text-purple-400 mb-3">
                <strong>Obligatoria</strong> cuando el tratamiento puede entranar alto riesgo para los derechos y libertades de las personas.
              </p>
              <div className="text-sm text-purple-700 dark:text-purple-400">
                <p className="font-medium mb-1">Contenido minimo:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Descripcion sistematica del tratamiento</li>
                  <li>Evaluacion de necesidad y proporcionalidad</li>
                  <li>Riesgos identificados para derechos y libertades</li>
                  <li>Medidas de mitigacion previstas</li>
                </ul>
              </div>
              <p className="text-sm text-purple-800 dark:text-purple-300 font-medium mt-3">
                Recomendacion: Realizar EIPD ANTES de iniciar cualquier proyecto de IA con datos personales
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Checklist */}
        <section id="checklist" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mr-3 text-amber-600 dark:text-amber-400 text-sm font-bold">4</span>
            Checklist de Cumplimiento Normativo
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Utiliza esta lista para verificar el cumplimiento normativo de tu proyecto de IA:
          </p>

          <div className="space-y-3">
            {[
              "Clasificar el sistema segun nivel de riesgo del AI Act",
              "Identificar la base legal para el tratamiento de datos",
              "Realizar EIPD si corresponde",
              "Documentar todas las decisiones de diseno",
              "Establecer procedimientos de supervision humana",
              "Implementar medidas de seguridad tecnicas y organizativas",
              "Definir periodo de retencion de datos",
              "Establecer mecanismos para ejercicio de derechos",
            ].map((item, i) => (
              <label key={i} className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-amber-600 border-slate-300 dark:border-slate-600 rounded focus:ring-amber-500 dark:bg-slate-700" />
                <span className="ml-3 text-slate-700 dark:text-slate-300">{item}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Section 5: Recursos */}
        <section id="recursos" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mr-3 text-amber-600 dark:text-amber-400 text-sm font-bold">5</span>
            Recursos y Referencias
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Documentacion Oficial</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://eur-lex.europa.eu" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    AI Act (texto completo) - EUR-Lex
                  </a>
                </li>
                <li>
                  <a href="https://gdpr.eu/tag/gdpr/" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    RGPD - gdpr.eu
                  </a>
                </li>
                <li>
                  <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Guia AEPD sobre IA
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Lecturas Recomendadas</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  Anthropic Prompt Engineering Guide - docs.anthropic.com
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  OpenAI Cookbook - cookbook.openai.com
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">¿Listo para crear tu proyecto RAG?</h3>
          <p className="text-white/80 mb-4">Ahora que conoces la normativa, crea un sistema que cumpla con todas las regulaciones</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
          >
            Ir al Builder
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
