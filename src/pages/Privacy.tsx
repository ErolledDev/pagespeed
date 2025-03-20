import React from 'react';
import { Shield } from 'lucide-react';

function Privacy() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We take your privacy seriously. This policy describes what personal information we collect and how we use it.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 prose prose-blue max-w-none">
        <h2>Information We Collect</h2>
        <p>
          When you use PageSpeed Insights, we collect certain information about your use of the service:
        </p>
        <ul>
          <li>URLs you submit for analysis</li>
          <li>Performance metrics and analysis results</li>
          <li>Browser type and version</li>
          <li>Time and date of access</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Analyze usage patterns</li>
          <li>Maintain and improve site performance</li>
          <li>Prevent fraud and abuse</li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain your data for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You can request deletion of your data by contacting us.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We use third-party services to help us provide and improve our service. These services may collect information about you when you use our website.
        </p>

        <h2>Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Object to processing of your information</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@pagespeed.example.com.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 15, 2024
        </p>
      </div>
    </div>
  );
}

export default Privacy;