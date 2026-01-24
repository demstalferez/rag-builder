'use client';

import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface NotebookCell {
  cell_type: 'markdown' | 'code';
  source: string[];
  outputs?: any[];
  execution_count?: number;
}

interface NotebookData {
  cells: NotebookCell[];
  metadata?: any;
}

interface NotebookViewerProps {
  notebook: NotebookData;
}

function CodeCell({ cell, isDark }: { cell: NotebookCell; isDark: boolean }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const source = cell.source.join('');

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-slate-200 ">
      <div className="bg-slate-100  px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-500 ">
            [{cell.execution_count || ' '}]
          </span>
          <span className="text-xs text-slate-500 ">Python</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-500 hover:text-slate-700"
        >
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <>
          <SyntaxHighlighter
            language="python"
            style={isDark ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '0.875rem',
            }}
          >
            {source}
          </SyntaxHighlighter>

          {cell.outputs && cell.outputs.length > 0 && (
            <div className="border-t border-slate-200  bg-slate-50  p-4">
              <CellOutputs outputs={cell.outputs} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CellOutputs({ outputs }: { outputs: any[] }) {
  return (
    <div className="space-y-2">
      {outputs.map((output, idx) => {
        if (output.output_type === 'stream') {
          return (
            <pre key={idx} className="text-sm font-mono text-slate-700  whitespace-pre-wrap">
              {output.text?.join('') || ''}
            </pre>
          );
        }

        if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
          const data = output.data;

          if (data?.['image/png']) {
            return (
              <img
                key={idx}
                src={`data:image/png;base64,${data['image/png']}`}
                alt="Output"
                className="max-w-full rounded"
              />
            );
          }

          if (data?.['text/html']) {
            const html = Array.isArray(data['text/html'])
              ? data['text/html'].join('')
              : data['text/html'];
            return (
              <div
                key={idx}
                className="overflow-x-auto text-sm"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }

          if (data?.['text/plain']) {
            const text = Array.isArray(data['text/plain'])
              ? data['text/plain'].join('')
              : data['text/plain'];
            return (
              <pre key={idx} className="text-sm font-mono text-slate-700  whitespace-pre-wrap">
                {text}
              </pre>
            );
          }
        }

        if (output.output_type === 'error') {
          return (
            <pre key={idx} className="text-sm font-mono text-red-600  whitespace-pre-wrap">
              {output.traceback?.join('\n') || output.evalue || 'Error'}
            </pre>
          );
        }

        return null;
      })}
    </div>
  );
}

function MarkdownCell({ cell }: { cell: NotebookCell }) {
  const source = cell.source.join('');

  // Check if this is a main section header for anchor links
  const sectionMatch = source.match(/^#\s*(\d+)\./m);
  const sectionId = sectionMatch ? `section-${sectionMatch[1]}` : undefined;

  return (
    <div id={sectionId} className="my-6 prose prose-slate  max-w-none prose-headings:scroll-mt-20">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={oneDark}
                customStyle={{ fontSize: '0.875rem' }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`${className} bg-slate-100  px-1.5 py-0.5 rounded text-sm`} {...props}>
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-slate-200 ">
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th className="px-4 py-2 bg-slate-100  text-left text-sm font-semibold text-slate-900 ">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-4 py-2 text-sm text-slate-700  border-t border-slate-200 ">
                {children}
              </td>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-4 bg-slate-50  rounded-r-lg">
                {children}
              </blockquote>
            );
          },
          h1({ children }) {
            return (
              <h1 className="text-3xl font-bold text-slate-900  mt-12 mb-6 pb-2 border-b border-slate-200 ">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-2xl font-bold text-slate-900  mt-10 mb-4">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-xl font-semibold text-slate-900  mt-8 mb-3">
                {children}
              </h3>
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

export default function NotebookViewer({ notebook }: NotebookViewerProps) {
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useMemo(() => {
    if (typeof window !== 'undefined') {
      const checkDark = () => {
        setIsDark(document.documentElement.classList.contains('dark'));
      };
      checkDark();

      const observer = new MutationObserver(checkDark);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="bg-white  rounded-xl border border-slate-200  p-6 md:p-8">
      {notebook.cells.map((cell, index) => {
        if (cell.cell_type === 'markdown') {
          return <MarkdownCell key={index} cell={cell} />;
        }
        if (cell.cell_type === 'code') {
          return <CodeCell key={index} cell={cell} isDark={isDark} />;
        }
        return null;
      })}
    </div>
  );
}
