import type { Metadata } from 'next'
import Image from 'next/image'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

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
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('rag-builder-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark) || (theme === 'system' && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido principal
        </a>

        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
          {/* Header */}
          <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  {/* Logos institucionales */}
                  <div className="flex items-center space-x-3 pr-4 border-r border-slate-200 dark:border-slate-700">
                    <Image
                      src="/logoupgradehub.svg"
                      alt="Upgrade Hub"
                      width={120}
                      height={28}
                      className="h-7 w-auto dark:invert"
                      priority
                    />
                    <Image
                      src="/1-CSIC-Logotipo-COLOR-TRANSPARENTE.png"
                      alt="CSIC"
                      width={80}
                      height={28}
                      className="h-7 w-auto"
                      priority
                    />
                  </div>
                  {/* App branding */}
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">RAG Builder</h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Generador de Proyectos RAG</p>
                    </div>
                  </div>
                </div>
                <nav className="flex items-center space-x-4">
                  <div className="hidden md:flex items-center space-x-6">
                    <a href="/teoria" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Teoria RAG
                    </a>
                    <a href="/guia_completa_rag.ipynb" download className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Notebook
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  </div>
                  <ThemeToggle />
                </nav>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main id="main-content" className="flex-grow" tabIndex={-1}>
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Logos institucionales */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6 pb-6 border-b border-slate-800">
                <span className="text-sm text-slate-500">Proyecto desarrollado en colaboracion con:</span>
                <div className="flex items-center gap-6">
                  <Image
                    src="/logoupgradehub.svg"
                    alt="Upgrade Hub"
                    width={140}
                    height={32}
                    className="h-8 w-auto invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <Image
                    src="/1-CSIC-Logotipo-COLOR-TRANSPARENTE.png"
                    alt="CSIC - Consejo Superior de Investigaciones Cientificas"
                    width={100}
                    height={32}
                    className="h-8 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-center md:text-left">
                  <p>2024 RAG Builder - Programa de Formacion en IA</p>
                  <p className="text-xs text-slate-500 mt-1">Upgrade Hub & CSIC</p>
                </div>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    MIT License
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
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
