import React, { useState } from 'react';
import { Search, Globe, Loader2, Info, Lightbulb, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { PageSpeedResult } from '../types';
import { ScoreGauge } from '../components/ScoreGauge';
import { SuggestionCard } from '../components/SuggestionCard';
import { FAQSection } from '../components/FAQSection';
import { getFromCache, saveToCache } from '../utils/cache';
import { exportToExcel, exportToCSV } from '../utils/export';

// Use environment variable for API key
const API_KEY = import.meta.env.VITE_PAGESPEED_API_KEY;

const features = [
  {
    title: "Real-time Analysis",
    description: "Get instant insights about your website's performance, accessibility, best practices, and SEO.",
    icon: Globe
  },
  {
    title: "Detailed Metrics",
    description: "Access comprehensive performance metrics and actionable recommendations.",
    icon: Info
  },
  {
    title: "Export Capabilities",
    description: "Download your analysis results in Excel or CSV format for further analysis.",
    icon: Download
  },
  {
    title: "Performance Insights",
    description: "Get detailed insights into your website's performance metrics and optimization opportunities.",
    icon: Lightbulb
  }
];

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
      // Check cache first
      const cachedResult = getFromCache(url);
      if (cachedResult) {
        setResult(cachedResult);
        setLoading(false);
        return;
      }

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
      saveToCache(url, data);
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

  const getPositiveFeedback = (result: PageSpeedResult) => {
    const feedback = [];
    const { categories } = result.lighthouseResult;

    if (categories.performance?.score >= 0.9) {
      feedback.push({
        category: 'Performance',
        score: categories.performance.score,
        message: 'Excellent performance! Your website loads quickly and efficiently.'
      });
    }

    if (categories.accessibility?.score >= 0.9) {
      feedback.push({
        category: 'Accessibility',
        score: categories.accessibility.score,
        message: 'Great job on accessibility! Your website is well-optimized for all users.'
      });
    }

    if (categories['best-practices']?.score >= 0.9) {
      feedback.push({
        category: 'Best Practices',
        score: categories['best-practices'].score,
        message: 'Excellent adherence to web best practices!'
      });
    }

    if (categories.seo?.score >= 0.9) {
      feedback.push({
        category: 'SEO',
        score: categories.seo.score,
        message: 'Outstanding SEO optimization! Your website is well-positioned for search engines.'
      });
    }

    return feedback;
  };

  const exportData = (format: 'excel' | 'csv') => {
    if (!result) return;

    const data = Object.entries(result.lighthouseResult.audits)
      .filter(([_, audit]) => audit && audit.score !== null)
      .map(([key, audit]) => ({
        Metric: audit.title,
        Score: Math.round(audit.score * 100),
        Description: audit.description
      }));

    const filename = `websitespeed-analysis-${new Date().toISOString().split('T')[0]}`;
    
    if (format === 'excel') {
      exportToExcel(data, filename);
    } else {
      exportToCSV(data, filename);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Analyze Your Website Performance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Get comprehensive insights about your website's performance, accessibility, best practices, and SEO with WebsiteSpeed Checker.
          </p>
          
          {/* URL Input Form */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={analyzeWebsite} className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL (e.g., https://example.com)"
                  className="w-full h-14 pl-12 pr-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  required
                  pattern="https?://.*"
                  title="Please enter a valid URL starting with http:// or https://"
                />
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-14 px-8 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-6 h-6" />
                    Analyze Website
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg p-8 text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Website</h2>
            <p className="text-gray-600">Please wait while we gather performance metrics and insights...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <p className="text-red-800 text-center text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result?.lighthouseResult && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Export Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => exportData('excel')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </button>
            <button
              onClick={() => exportData('csv')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Export to CSV
            </button>
          </div>

          {/* Performance Overview */}
          <div className="space-y-8">
            {/* Scores */}
            <div className="bg-white rounded-xl shadow-sm">
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

            {/* Analysis Summary */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Analysis Summary</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {getPositiveFeedback(result).map((feedback, index) => (
                    <div key={index} className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                      <h3 className="font-semibold text-emerald-900 mb-2">{feedback.category}</h3>
                      <p className="text-emerald-800">{feedback.message}</p>
                    </div>
                  ))}
                  
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

            {/* Detailed Metrics Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
        </div>
      )}

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

export default PageSpeed;