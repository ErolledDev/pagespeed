import React from 'react';
import { Mail, Phone, MapPin, Globe, Clock, Users, MessageSquare, Building2 } from 'lucide-react';

function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions about WebsiteSpeed Checker? Our team is here to help you optimize your website's performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-gray-600 mb-1">General Support:</p>
                  <p className="text-blue-600 hover:text-blue-800">support@websitespeedchecker.com</p>
                  <p className="text-gray-600 mb-1 mt-2">Business Inquiries:</p>
                  <p className="text-blue-600 hover:text-blue-800">business@websitespeedchecker.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600 mb-1">Technical Support:</p>
                  <p className="text-blue-600 hover:text-blue-800">+1 (555) 123-4567</p>
                  <p className="text-gray-600 mb-1 mt-2">Sales Team:</p>
                  <p className="text-blue-600 hover:text-blue-800">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Office Location</h3>
                  <p className="text-gray-600">
                    123 Performance Street<br />
                    Web City, IN 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Solutions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Enterprise Solutions</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Looking for enterprise-level website performance optimization? Our dedicated team provides customized solutions for large-scale operations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Custom Integration</h3>
              <p className="text-gray-600">Tailored solutions integrated with your existing infrastructure.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Dedicated Support</h3>
              <p className="text-gray-600">24/7 priority support with dedicated account management.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;