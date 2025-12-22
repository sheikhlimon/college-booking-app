import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">College Booking</h3>
            <p className="text-gray-600 text-sm">
              Your gateway to finding the perfect college. Compare institutions,
              read reviews, and make informed decisions about your education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/colleges" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  All Colleges
                </a>
              </li>
              <li>
                <a href="/admission" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Admission
                </a>
              </li>
              <li>
                <a href="/my-college" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  My College
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  College Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Admission Process
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Scholarships
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Career Guidance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact</h4>
            <div className="space-y-2 text-gray-600 text-sm">
              <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@collegebooking.com</p>
              <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +880 1234-567890</p>
              <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Dhanmondi, Road 8</p>
              <p>Dhaka, Bangladesh 1209</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 College Booking. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;