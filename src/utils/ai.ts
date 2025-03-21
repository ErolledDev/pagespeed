import type { PageSpeedResult, AIAnalysis } from '../types';

export const analyzeWithAI = async (result: PageSpeedResult, apiKey: string): Promise<AIAnalysis> => {
  const scores = {
    performance: result.lighthouseResult.categories.performance.score * 100,
    accessibility: result.lighthouseResult.categories.accessibility.score * 100,
    bestPractices: result.lighthouseResult.categories['best-practices'].score * 100,
    seo: result.lighthouseResult.categories.seo.score * 100,
  };

  const getAnalysis = (score: number, category: string) => {
    if (score >= 90) {
      return `Excellent ${category} score! Your website demonstrates strong ${category.toLowerCase()} practices. To maintain this high standard:\n` +
        `• Regularly monitor ${category.toLowerCase()} metrics\n` +
        `• Keep dependencies updated\n` +
        `• Continue following web standards and best practices`;
    } else if (score >= 70) {
      return `Good ${category} score, but there's room for improvement. Consider:\n` +
        `• Reviewing ${category.toLowerCase()} guidelines\n` +
        `• Implementing recommended optimizations\n` +
        `• Regular testing and monitoring`;
    } else {
      return `Your ${category} score needs attention. Priority actions:\n` +
        `• Address critical ${category.toLowerCase()} issues\n` +
        `• Follow ${category.toLowerCase()} best practices\n` +
        `• Consider professional ${category.toLowerCase()} audit`;
    }
  };

  const analysis: AIAnalysis = {
    performance: getAnalysis(scores.performance, 'Performance'),
    accessibility: getAnalysis(scores.accessibility, 'Accessibility'),
    bestPractices: getAnalysis(scores.bestPractices, 'Best Practices'),
    seo: getAnalysis(scores.seo, 'SEO'),
    overall: ''
  };

  // Generate overall analysis
  const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / 4;
  if (avgScore >= 90) {
    analysis.overall = 'Outstanding website performance across all metrics! Your site demonstrates excellent implementation of web standards and best practices. Keep up the great work and continue monitoring for maintaining this high quality.';
  } else if (avgScore >= 70) {
    analysis.overall = 'Your website shows good overall performance with some areas for improvement. Focus on categories scoring below 90 to enhance the user experience and meet modern web standards.';
  } else {
    analysis.overall = 'Your website requires significant improvements across multiple categories. Prioritize addressing low-scoring areas and consider implementing the suggested recommendations to enhance overall performance.';
  }

  return analysis;
};