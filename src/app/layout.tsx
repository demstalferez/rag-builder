import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'RAG Builder - Generador de Proyectos RAG | Upgrade Hub & CSIC',
  description: 'Crea proyectos RAG personalizados con configuracion visual. Elige tu base de datos vectorial, modelo de lenguaje, y descarga un proyecto listo para usar. Programa de formacion Upgrade Hub y CSIC.',
  keywords: ['RAG', 'Retrieval-Augmented Generation', 'LLM', 'Vector Database', 'AI', 'Machine Learning', 'Upgrade Hub', 'CSIC'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido principal
        </a>

        <div className="min-h-screen flex flex-col bg-upgrade-gray-light">
          <Header />

          <main id="main-content" className="flex-grow" tabIndex={-1}>
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-upgrade-black text-white border-t border-upgrade-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Main footer content */}
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* About */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-upgrade-yellow rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-upgrade-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-upgrade-yellow">RAG Builder</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Generador visual de proyectos RAG. Parte del programa de formacion en IA del CSIC.
                  </p>
                </div>

                {/* Links */}
                <div>
                  <h3 className="font-semibold text-upgrade-yellow mb-3">Recursos</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/teoria" className="text-gray-300 hover:text-upgrade-yellow transition-colors">
                        Guia de RAG
                      </Link>
                    </li>
                    <li>
                      <Link href="/normativa" className="text-gray-300 hover:text-upgrade-yellow transition-colors">
                        Normativa IA
                      </Link>
                    </li>
                    <li>
                      <a href="/guia_completa_rag.ipynb" download className="text-gray-300 hover:text-upgrade-yellow transition-colors">
                        Descargar Notebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/demstalferez/rag-builder"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-upgrade-yellow transition-colors"
                      >
                        GitHub
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Collaboration */}
                <div>
                  <h3 className="font-semibold text-upgrade-yellow mb-3">Colaboracion</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <Image
                      src="/logoupgradehub.svg"
                      alt="Upgrade Hub"
                      width={100}
                      height={24}
                      className="h-6 w-auto invert opacity-90 hover:opacity-100 transition-opacity"
                    />
                    <Image
                      src="/1-CSIC-Logotipo-COLOR-TRANSPARENTE.png"
                      alt="CSIC"
                      width={70}
                      height={24}
                      className="h-6 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    Protocolo de actuacion 2025-2030 para impulsar el talento en competencias digitales.
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="pt-6 border-t border-upgrade-gray flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-gray-400">
                  2025 RAG Builder. Proyecto Open Source bajo licencia MIT.
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <a
                    href="https://github.com/demstalferez/rag-builder/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-upgrade-yellow transition-colors"
                  >
                    MIT License
                  </a>
                  <a
                    href="https://github.com/demstalferez/rag-builder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-upgrade-yellow transition-colors"
                  >
                    Contribuir
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
