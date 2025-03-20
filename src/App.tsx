import React, { useState } from 'react';
import { Search, Globe, Loader2, ExternalLink, Info, Lightbulb, ArrowRight } from 'lucide-react';
import type { PageSpeedResult } from './types';
import { ScoreGauge } from './components/ScoreGauge';
import { ResultCard } from './components/ResultCard';
import { SuggestionCard } from './components/SuggestionCard';

const API_KEY = 'AIzaSyCxxLVr0o8c0lK-1CvnzPhrkv2q_YB5b6A';

function App() {
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
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${API_KEY}`
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                PageSpeed Insights
              </h1>
            </div>
            <a
              href="https://developers.google.com/speed/docs/insights/v5/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              Documentation <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Analyze Your Website Performance
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get insights about your website's performance, accessibility, best practices, and SEO. 
            Our tool provides detailed metrics and actionable recommendations to improve your site.
          </p>
        </div>

        {/* URL Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 backdrop-blur-lg bg-opacity-90">
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
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-10 h-12"
                  required
                />
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="self-end px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2 transition-colors h-12"
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
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results */}
        {result?.lighthouseResult && (
          <div className="space-y-8">
            {/* Overall Scores */}
            <div className="bg-white rounded-xl shadow-lg p-8 backdrop-blur-lg bg-opacity-90">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Performance Scores</h2>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {result.lighthouseResult.categories.performance && (
                  <ScoreGauge 
                    score={result.lighthouseResult.categories.performance.score}
                    label="Performance"
                  />
                )}
                {result.lighthouseResult.categories.accessibility && (
                  <ScoreGauge 
                    score={result.lighthouseResult.categories.accessibility.score}
                    label="Accessibility"
                  />
                )}
                {result.lighthouseResult.categories['best-practices'] && (
                  <ScoreGauge 
                    score={result.lighthouseResult.categories['best-practices'].score}
                    label="Best Practices"
                  />
                )}
                {result.lighthouseResult.categories.seo && (
                  <ScoreGauge 
                    score={result.lighthouseResult.categories.seo.score}
                    label="SEO"
                  />
                )}
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-white rounded-xl shadow-lg p-8 backdrop-blur-lg bg-opacity-90">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Suggested Improvements</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(result.lighthouseResult.audits)
                .filter(([_, audit]) => audit && audit.score !== null)
                .map(([key, audit]) => (
                  <ResultCard
                    key={key}
                    title={audit.title}
                    score={audit.score}
                    details={audit.description}
                  />
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;