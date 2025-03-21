import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is WebsiteSpeed Checker?",
    answer: "WebsiteSpeed Checker is a comprehensive tool that analyzes your website's performance on both mobile and desktop devices. It provides detailed metrics and suggestions for improving your website's speed, accessibility, and user experience."
  },
  {
    question: "What do the scores mean?",
    answer: "Scores are rated on a scale of 0-100:\n- 90-100: Good (green)\n- 50-89: Needs Improvement (orange)\n- 0-49: Poor (red)\n\nWe analyze Performance, Accessibility, Best Practices, and SEO."
  },
  {
    question: "How often should I analyze my website?",
    answer: "We recommend analyzing your website:\n- After major updates or changes\n- Monthly for regular maintenance\n- When you notice performance issues\n- Before major marketing campaigns"
  },
  {
    question: "What metrics are analyzed?",
    answer: "We analyze several key metrics including:\n- Loading performance (FCP, LCP, CLS)\n- Accessibility standards (WCAG compliance)\n- SEO optimization (meta tags, structure)\n- Web best practices (security, modern APIs)\n- User experience factors (mobile-friendly)"
  },
  {
    question: "Why is website speed important?",
    answer: "Website speed is crucial because:\n- It affects user experience and engagement\n- Impacts search engine rankings\n- Influences conversion rates\n- Reduces bounce rates\n- Improves mobile performance"
  },
  {
    question: "How can I improve my website's performance?",
    answer: "Common ways to improve performance include:\n- Optimizing images and media\n- Minimizing JavaScript and CSS\n- Using content delivery networks (CDN)\n- Implementing browser caching\n- Reducing server response time"
  },
  {
    question: "What's the difference between mobile and desktop scores?",
    answer: "Mobile and desktop scores can differ due to:\n- Different network conditions\n- Processing power variations\n- Screen size adaptations\n- Touch vs mouse interactions\n- Mobile-specific optimizations"
  },
  {
    question: "How accurate are the results?",
    answer: "Our results are highly accurate as we use Google's PageSpeed Insights API, which:\n- Provides real-world performance data\n- Uses Lighthouse for analysis\n- Considers multiple factors\n- Updates regularly with web standards"
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-start w-full text-left"
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500" />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 prose prose-blue">
                  <p className="text-gray-600 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}