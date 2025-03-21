import { GoogleGenerativeAI } from '@google/generative-ai';
import type { PageSpeedResult, AIAnalysis } from '../types';

export const analyzeWithAI = async (result: PageSpeedResult, apiKey: string): Promise<AIAnalysis> => {
  if (!apiKey) throw new Error('AI API key is required');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const scores = {
    performance: result.lighthouseResult.categories.performance.score * 100,
    accessibility: result.lighthouseResult.categories.accessibility.score * 100,
    bestPractices: result.lighthouseResult.categories['best-practices'].score * 100,
    seo: result.lighthouseResult.categories.seo.score * 100,
  };

  const prompt = `
    Analyze these website performance scores and provide specific, actionable feedback:
    - Performance: ${scores.performance}%
    - Accessibility: ${scores.accessibility}%
    - Best Practices: ${scores.bestPractices}%
    - SEO: ${scores.seo}%

    For each category:
    1. If score >= 90%, provide positive feedback and suggestions to maintain excellence
    2. If score < 90%, provide specific improvement recommendations
    3. Keep responses concise but informative
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Split the analysis into sections
    const sections = text.split('\n\n');
    
    return {
      performance: sections[0] || '',
      accessibility: sections[1] || '',
      bestPractices: sections[2] || '',
      seo: sections[3] || '',
      overall: sections[4] || '',
    };
  } catch (error) {
    console.error('AI analysis failed:', error);
    throw new Error('Failed to generate AI analysis');
  }
};