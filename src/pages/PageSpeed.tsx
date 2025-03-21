import React, { useState } from 'react';
import { Search, Globe, Loader2, Info, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { PageSpeedResult } from '../types';
import { ScoreGauge } from '../components/ScoreGauge';
import { SuggestionCard } from '../components/SuggestionCard';

// Use environment variable for API key
const API_KEY = import.meta.env.VITE_PAGESPEED_API_KEY || 'AIzaSyDq15ZhJBVLrxXPUDxNJ7Wy-a_SQzQqPHw';

function PageSpeed() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PageSpeedResult | null>(null);
  const [error, setError] = useState('');

  const analyzeWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Validate URL format
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
      apiUrl.searchParams.append('url', url);
      apiUrl.searchParams.append('key', API_KEY);
      apiUrl.searchParams.append('strategy', 'mobile');
      apiUrl.searchParams.append('category', 'PERFORMANCE');
      apiUrl.searchParams.append('category', 'ACCESSIBILITY');
      apiUrl.searchParams.append('category', 'BEST_PRACTICES');
      apiUrl.searchParams.append('category', 'SEO');

      const response = await fetch(apiUrl.toString());
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to analyze website');
      }

      const data = await response.json();
      
      if (!data.lighthouseResult) {
        throw new Error('Invalid response from PageSpeed API');
      }

      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to analyze website. Please check the URL and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getImprovementSuggestions = (result: PageSpeedResult) => {
    const suggestions = [];
    const { categories, audits } = result.lighthouseResult;

    if (categories.performance?.score < 0.9) {
      suggestions.push({
        category: 'Performance',
        score: categories.performance.score,
        items: [
          audits['first-contentful-paint']?.score < 0.9 && 'Optimize First Contentful Paint',
          audits['largest-contentful-paint']?.score < 0.9 && 'Improve Largest Contentful Paint',
          audits['total-blocking-time']?.score < 0.9 && 'Reduce Total Blocking Time',
          audits['cumulative-layout-shift']?.score < 0.9 && 'Minimize Cumulative Layout Shift'
        ].filter(Boolean)
      });
    }

    if (categories.accessibility?.score < 0.9) {
      suggestions.push({
        category: 'Accessibility',
        score: categories.accessibility.score,
        items: [
          audits['color-contrast']?.score < 1 && 'Improve color contrast',
          audits['document-title']?.score < 1 && 'Add proper document title',
          audits['html-has-lang']?.score < 1 && 'Add language attribute to HTML',
          audits['image-alt']?.score < 1 && 'Add alt text to images'
        ].filter(Boolean)
      });
    }

    if (categories['best-practices']?.score < 0.9) {
      suggestions.push({
        category: 'Best Practices',
        score: categories['best-practices'].score,
        items: [
          audits['no-document-write']?.score < 1 && 'Avoid document.write()',
          audits['js-libraries']?.score < 1 && 'Update JavaScript libraries',
          audits['deprecations']?.score < 1 && 'Remove deprecated APIs',
          audits['errors-in-console']?.score < 1 && 'Fix console errors'
        ].filter(Boolean)
      });
    }

    if (categories.seo?.score < 0.9) {
      suggestions.push({
        category: 'SEO',
        score: categories.seo.score,
        items: [
          audits['meta-description']?.score < 1 && 'Add meta description',
          audits['link-text']?.score < 1 && 'Use descriptive link text',
          audits['robots-txt']?.score < 1 && 'Add robots.txt file',
          audits['tap-targets']?.score < 1 && 'Size tap targets appropriately'
        ].filter(Boolean)
      });
    }

    return suggestions;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Section - Simplified */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Website Performance Analysis
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get insights about your website's performance, accessibility, best practices, and SEO.
        </p>
      </div>

      {/* URL Input Form - Streamlined */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <form onSubmit={analyzeWebsite} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              pattern="https?://.*"
              title="Please enter a valid URL starting with http:// or https://"
            />
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="h-12 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Analyze
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8">
          <p className="text-red-800 text-center text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {result?.lighthouseResult && (
        <div className="space-y-8">
          {/* Performance Overview - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scores */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Performance Scores</h2>
                  <a
                    href="https://web.dev/performance-scoring/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Info className="w-4 h-4" />
                    About scoring
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <ScoreGauge 
                      score={result.lighthouseResult.categories.performance.score}
                      label="Performance"
                      size="sm"
                    />
                  </div>
                  <div>
                    <ScoreGauge 
                      score={result.lighthouseResult.categories.accessibility.score}
                      label="Accessibility"
                      size="sm"
                    />
                  </div>
                  <div>
                    <ScoreGauge 
                      score={result.lighthouseResult.categories['best-practices'].score}
                      label="Best Practices"
                      size="sm"
                    />
                  </div>
                  <div>
                    <ScoreGauge 
                      score={result.lighthouseResult.categories.seo.score}
                      label="SEO"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Quick Improvements</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {getImprovementSuggestions(result).map((suggestion, index) => (
                    <SuggestionCard
                      key={index}
                      category={suggestion.category}
                      score={suggestion.score}
                      items={suggestion.items}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metrics Table - Simplified */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Detailed Metrics</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Metric</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 w-24">Score</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Object.entries(result.lighthouseResult.audits)
                    .filter(([_, audit]) => audit && audit.score !== null)
                    .map(([key, audit]) => {
                      const score = Math.round(audit.score * 100);
                      const scoreColor = score >= 90 
                        ? 'text-emerald-600' 
                        : score >= 50 
                        ? 'text-amber-600' 
                        : 'text-rose-600';
                      
                      return (
                        <tr key={key} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {audit.title}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`text-sm font-semibold ${scoreColor}`}>
                              {score}%
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="max-w-xl prose prose-sm">
                              <ReactMarkdown>{audit.description}</ReactMarkdown>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageSpeed;