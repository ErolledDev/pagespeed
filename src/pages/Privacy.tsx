import React from 'react';
import { Shield, Lock, Eye, Database, Server, Bell, UserCheck, Scale } from 'lucide-react';

function Privacy() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          At WebsiteSpeed Checker, we take your privacy seriously. This comprehensive policy outlines how we collect, use, and protect your personal information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Information Collection</h2>
            </div>
            <div className="prose prose-blue max-w-none">
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
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Usage & Storage</h2>
            </div>
            <div className="prose prose-blue max-w-none">
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
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Security Measures</h2>
            </div>
            <div className="prose prose-blue max-w-none">
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

              <h3>Third-Party Security</h3>
              <p>
                We carefully select and monitor third-party service providers to ensure they maintain high security standards when handling your data.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Your Rights & Choices</h2>
            </div>
            <div className="prose prose-blue max-w-none">
              <h3>Your Data Rights</h3>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request data deletion</li>
                <li>Object to data processing</li>
                <li>Export your data</li>
                <li>Withdraw consent</li>
              </ul>

              <h3>Contact Information</h3>
              <p>
                For privacy-related inquiries, contact our Data Protection Officer at:
                <br />
                Email: privacy@websitespeedchecker.com
                <br />
                Address: 123 Performance Street, Web City, IN 12345
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Last updated: March 15, 2024
      </div>
    </div>
  );
}

export default Privacy;