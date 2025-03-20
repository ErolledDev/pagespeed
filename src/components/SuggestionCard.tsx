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
    ? 'text-emerald-500 border-emerald-200 bg-emerald-50' 
    : percentage >= 50 
    ? 'text-amber-500 border-amber-200 bg-amber-50' 
    : 'text-rose-500 border-rose-200 bg-rose-50';

  return (
    <div className={`rounded-xl border p-6 ${color}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{category}</h3>
        <span className="font-bold">{percentage}%</span>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}