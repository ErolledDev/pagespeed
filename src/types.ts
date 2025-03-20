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
    }>;
  };
}