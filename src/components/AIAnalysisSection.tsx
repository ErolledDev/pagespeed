import React from 'react';
import { Bot } from 'lucide-react';

interface AIAnalysisSectionProps {
  analysis: {
    performance: string;
    accessibility: string;
    bestPractices: string;
    seo: string;
    overall: string;
  };
}

export function AIAnalysisSection({ analysis }: AIAnalysisSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Analysis</h2>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          {Object.entries(analysis).map(([key, value]) => (
            key !== 'overall' && (
              <div key={key} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                  {key === 'bestPractices' ? 'Best Practices' : key}
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{value}</p>
              </div>
            )
          ))}
        </div>
        {analysis.overall && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Overall Analysis</h3>
            <p className="text-blue-800">{analysis.overall}</p>
          </div>
        )}
      </div>
    </div>
  );
}