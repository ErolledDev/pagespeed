export interface PageSpeedResult {
  id: string;
  loadingExperience: {
    overall_category: string;
    metrics: Record<string, {
      category: string;
      percentile: number;
    }>;
  };
  originLoadingExperience: {
    overall_category: string;
    metrics: Record<string, {
      category: string;
      percentile: number;
    }>;
  };
  lighthouseResult: {
    categories: {
      performance: {
        score: number;
      };
      accessibility: {
        score: number;
      };
      'best-practices': {
        score: number;
      };
      seo: {
        score: number;
      };
    };
    audits: Record<string, {
      title: string;
      description: string;
      score: number;
      displayValue?: string;
      details?: {
        type: string;
        items?: Array<{
          url: string;
        }>;
      };
    }>;
    fullPageScreenshot?: {
      screenshot: {
        data: string;
      };
    };
  };
}

export interface AnalysisCache {
  [url: string]: {
    timestamp: number;
    result: PageSpeedResult;
  };
}