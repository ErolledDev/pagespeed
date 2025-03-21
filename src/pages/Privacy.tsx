import React from 'react';
import { Shield } from 'lucide-react';

function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600">
          At WebsiteSpeed Checker, we take your privacy seriously. This policy outlines how we collect, use, and protect your information.
        </p>
      </div>

      <div className="prose prose-blue max-w-none">
        <h2>Information Collection</h2>
        <h3>Data We Collect</h3>
        <ul>
          <li>URLs submitted for analysis</li>
          <li>Performance metrics and analysis results</li>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>IP address and location data</li>
          <li>Time and date of access</li>
          <li>Usage patterns and preferences</li>
        </ul>

        <h3>Automated Data Collection</h3>
        <p>
          We use cookies and similar tracking technologies to collect usage data and maintain your preferences. These technologies help us:
        </p>
        <ul>
          <li>Remember your preferences</li>
          <li>Analyze site usage patterns</li>
          <li>Customize content delivery</li>
          <li>Improve our services</li>
        </ul>

        <h2>Data Usage & Storage</h2>
        <h3>How We Use Your Data</h3>
        <ul>
          <li>Provide and improve our services</li>
          <li>Generate performance reports</li>
          <li>Analyze usage patterns</li>
          <li>Maintain and optimize site performance</li>
          <li>Prevent fraud and abuse</li>
          <li>Send service updates and notifications</li>
        </ul>

        <h3>Data Retention</h3>
        <p>
          We retain your data for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You can request deletion of your data at any time.
        </p>

        <h2>Security Measures</h2>
        <h3>Data Protection</h3>
        <p>
          We implement industry-standard security measures to protect your data:
        </p>
        <ul>
          <li>SSL/TLS encryption for all data transfers</li>
          <li>Regular security audits and updates</li>
          <li>Secure data storage facilities</li>
          <li>Access control and authentication</li>
          <li>Employee security training</li>
        </ul>

        <h2>Your Rights & Choices</h2>
        <h3>Your Data Rights</h3>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request data deletion</li>
          <li>Object to data processing</li>
          <li>Export your data</li>
          <li>Withdraw consent</li>
        </ul>

      

        <div className="text-sm text-gray-500 mt-8 pt-8 border-t">
          Last updated: March 15, 2024
        </div>
      </div>
    </div>
  );
}

export default Privacy;