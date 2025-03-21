import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SuggestionCardProps {
  category: string;
  score: number;
  items: string[];
}

export function SuggestionCard({ category, score, items }: SuggestionCardProps) {
  const percentage = Math.round(score * 100);
  const color = percentage >= 90 
    ? 'text-emerald-600 border-emerald-100 bg-emerald-50' 
    : percentage >= 50 
    ? 'text-amber-600 border-amber-100 bg-amber-50' 
    : 'text-rose-600 border-rose-100 bg-rose-50';

  return (
    <div className={`rounded-lg border p-4 ${color}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">{category}</h3>
        <span className="font-semibold">{percentage}%</span>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700 text-sm">
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}