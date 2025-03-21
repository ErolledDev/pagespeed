import React, { useState } from 'react';
import { Search, Globe, Loader2, ExternalLink, Info, Lightbulb, ChevronRight } from 'lucide-react';
import type { PageSpeedResult } from '../types';
import { ScoreGauge } from '../components/ScoreGauge';
import { SuggestionCard } from '../components/SuggestionCard';

const API_KEY = 'AIzaSyCxxLVr0o8c0lK-1CvnzPhrkv2q_YB5b6A';

function PageSpeed() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PageSpeedResult | null>(null);
  const [error, setError] = useState('');

  const analyzeWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${API_KEY}&strategy=mobile&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&screenshot=true`
      );
      
      if (!response.ok) {
        throw new Error('Failed to analyze website');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze website. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getImprovementSuggestions = (result: PageSpeedResult) => {
    const suggestions = [];
    const { categories, audits } = result.lighthouseResult;

    // Performance suggestions
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

    // Accessibility suggestions
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

    // Best Practices suggestions
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

    // SEO suggestions
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
          Website Performance Analysis
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Get comprehensive insights about your website's performance, accessibility, best practices, and SEO. 
          Our tool provides detailed metrics and actionable recommendations.
        </p>
      </div>

      {/* URL Input Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 backdrop-blur-lg bg-opacity-90 border border-gray-100">
        <form onSubmit={analyzeWebsite} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Website URL
            </label>
            <div className="relative">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="block w-full rounded-xl border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-12 h-14 text-lg"
                required
              />
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="self-end px-8 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Search className="w-6 h-6" />
            )}
            Analyze
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
          <p className="text-red-800 text-center">{error}</p>
        </div>
      )}

      {/* Results */}
      {result?.lighthouseResult && (
        <div className="space-y-12">
          {/* Screenshot */}
          {result.lighthouseResult.fullPageScreenshot && (
            <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Page Screenshot</h2>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                <img
                  src={`data:image/jpeg;base64,${result.lighthouseResult.fullPageScreenshot.screenshot.data}`}
                  alt="Website screenshot"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scores */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-90 border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900">Performance Scores</h2>
                  <a
                    href="https://web.dev/performance-scoring/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    Learn about scoring
                  </a>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <ScoreGauge 
                      score={result.lighthouseResult.categories.performance.score}
                      label="Performance"
                    />
                  </div>
                  <div>
                    <ScoreGauge 
                      score={result.lighthouseResult.categories.accessibility.score}
                      label="Accessibility"
                    />
                  </div>
                  <div>
                    <ScoreGauge 
                      score={result.lighthouseResult.categories['best-practices'].score}
                      label="Best Practices"
                    />
                  </div>
                  <div>
                    <ScoreGauge 
                      score={result.lighthouseResult.categories.seo.score}
                      label="SEO"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-90 border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Quick Improvements</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
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

          {/* Detailed Metrics Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-90 border border-gray-100">
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Detailed Metrics</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/4">Metric</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 w-24">Score</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
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
                        <tr key={key} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {audit.title}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`text-sm font-bold ${scoreColor}`}>
                              {score}%
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="max-w-2xl">
                              <p className="text-sm text-gray-600 mb-2">{audit.description}</p>
                              <a
                                href={`https://web.dev/lighthouse-${key}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1 transition-colors"
                              >
                                Learn more
                                <ChevronRight className="w-4 h-4" />
                              </a>
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