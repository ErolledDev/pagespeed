import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is PageSpeed Insights?",
    answer: "PageSpeed Insights is a tool that analyzes your website's performance on both mobile and desktop devices. It provides detailed metrics and suggestions for improving your website's speed and user experience."
  },

  {
    question: "How do I get a Google Gemini AI API key?",
    answer: "1. Visit Google AI Studio (https://makersuite.google.com/app/apikey)\n2. Sign in with your Google account\n3. Click 'Create API Key'\n4. Copy your new API key\n\nNote: The AI analysis feature is optional and requires a valid Gemini API key."
  },
  {
    question: "What do the scores mean?",
    answer: "Scores are rated on a scale of 0-100:\n- 90-100: Good (green)\n- 50-89: Needs Improvement (orange)\n- 0-49: Poor (red)\n\nWe analyze Performance, Accessibility, Best Practices, and SEO."
  },
  {
    question: "How often should I analyze my website?",
    answer: "We recommend analyzing your website:\n- After major updates or changes\n- Monthly for regular maintenance\n- When you notice performance issues\n- Before major marketing campaigns"
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