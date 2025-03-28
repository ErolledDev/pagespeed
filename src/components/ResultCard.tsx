import React from 'react';
import { ScoreGauge } from './ScoreGauge';
import { ChevronRight } from 'lucide-react';

interface ResultCardProps {
  title: string;
  score: number;
  details?: string;
  className?: string;
}

export function ResultCard({ title, score, details, className = '' }: ResultCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-start gap-6">
          <ScoreGauge score={score} label="" size="sm" />
          <div className="flex-1">
            {details && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{details}</p>
            )}
            <a
              href={`https://web.dev/lighthouse-${title.toLowerCase().replace(/\s+/g, '-')}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors gap-1 group"
            >
              Learn more
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}