'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: 'green' | 'blue' | 'yellow';
  features?: string[];
  className?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function SelectionCard({
  selected,
  onClick,
  title,
  description,
  icon: Icon,
  badge,
  badgeColor = 'green',
  features,
  className = '',
  tabIndex = 0,
  onKeyDown,
}: SelectionCardProps) {
  const badgeColors = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-upgrade-yellow/20 text-upgrade-black',
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
    onKeyDown?.(e);
  };

  return (
    <div
      role="button"
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-pressed={selected}
      className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-upgrade-yellow focus:ring-offset-2
        ${selected
          ? 'border-upgrade-yellow bg-upgrade-yellow/10 shadow-lg'
          : 'border-gray-200 hover:border-upgrade-yellow hover:shadow-md'
        }
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon className={`w-8 h-8 ${selected ? 'text-upgrade-black' : 'text-gray-400'}`} />
          )}
          <h3 className="font-semibold text-upgrade-black">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeColors[badgeColor]}`}>
              {badge}
            </span>
          )}
          {selected && (
            <div className="w-6 h-6 bg-upgrade-yellow rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-upgrade-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-700 mt-1">{description}</p>
      )}

      {features && features.length > 0 && (
        <ul className="space-y-2 mt-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
