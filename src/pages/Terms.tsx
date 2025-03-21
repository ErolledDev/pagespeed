import React from 'react';
import { FileText, Book, Shield, Scale, AlertTriangle, Link, RefreshCw, Gavel } from 'lucide-react';

function Terms() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using WebsiteSpeed Checker. By accessing our service, you agree to be bound by these terms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Book className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Service Terms</h2>
            </div>
            <div className="prose prose-blue max-w-none">
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing WebsiteSpeed Checker, you agree to be bound by these terms of service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the service.
              </p>

              <h3>2. Use License</h3>
              <p>
                We grant you a limited, non-exclusive, non-transferable license to:
              </p>
              <ul>
                <li>Access and use the service for personal or business use</li>
                <li>Generate and download performance reports</li>
                <li>Access our API within specified rate limits</li>
              </ul>

              <p>You may not:</p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose without proper licensing</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person or mirror the materials</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">User Obligations</h2>
            </div>
            <div className="prose prose-blue max-w-none">
              <h3>3. Account Responsibilities</h3>
              <ul>
                <li>Maintain accurate account information</li>
                <li>Protect account credentials</li>
                <li>Notify us of unauthorized access</li>
                <li>Comply with usage limits and guidelines</li>
              </ul>

              <h3>4. Acceptable Use</h3>
              <p>You agree not to:</p>
              <ul>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Interfere with service operation</li>
                <li>Engage in abusive or harmful behavior</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Disclaimers & Limitations</h2>
            </div>
            <div className="prose prose-blue max-w-none">
              <h3>5. Disclaimer of Warranties</h3>
              <p>
                The service is provided "as is" without warranties of any kind, either express or implied, including but not limited to:
              </p>
              <ul>
                <li>Merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy of results</li>
                <li>Reliability of service</li>
              </ul>

              <h3>6. Limitation of Liability</h3>
              <p>
                We shall not be liable for any damages arising from:
              </p>
              <ul>
                <li>Use or inability to use the service</li>
                <li>Cost of procurement of substitute goods</li>
                <li>Loss of data or profits</li>
                <li>Business interruption</li>
                <li>Any indirect, special, or consequential damages</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Gavel className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Legal Provisions</h2>
            </div>
            <div className="prose prose-blue max-w-none">
              <h3>7. Governing Law</h3>
              <p>
                These terms shall be governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.
              </p>

              <h3>8. Changes to Terms</h3>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service constitutes acceptance of the modified terms.
              </p>

              <h3>9. Contact Information</h3>
              <p>
                For any questions regarding these terms, please contact us at:
                <br />
                legal@websitespeedchecker.com
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

export default Terms;