import React from 'react';
import { FileText } from 'lucide-react';

function Terms() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using PageSpeed Insights.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 prose prose-blue max-w-none">
        <h2>1. Terms</h2>
        <p>
          By accessing PageSpeed Insights, you agree to be bound by these terms of service and agree that you are responsible for compliance with any applicable local laws.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily access PageSpeed Insights for personal, non-commercial use. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Attempt to decompile or reverse engineer any software contained in PageSpeed Insights</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
        </ul>

        <h2>3. Disclaimer</h2>
        <p>
          The materials on PageSpeed Insights are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>4. Limitations</h2>
        <p>
          In no event shall PageSpeed Insights or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use PageSpeed Insights.
        </p>

        <h2>5. Accuracy of Materials</h2>
        <p>
          The materials appearing on PageSpeed Insights could include technical, typographical, or photographic errors. We do not warrant that any of the materials on PageSpeed Insights are accurate, complete, or current.
        </p>

        <h2>6. Links</h2>
        <p>
          We have not reviewed all of the sites linked to PageSpeed Insights and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.
        </p>

        <h2>7. Modifications</h2>
        <p>
          We may revise these terms of service at any time without notice. By using PageSpeed Insights, you are agreeing to be bound by the then current version of these terms of service.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of your country and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 15, 2024
        </p>
      </div>
    </div>
  );
}

export default Terms;