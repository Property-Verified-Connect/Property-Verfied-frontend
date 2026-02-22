"use client"
import Nav from '@/components/layout/nav';
import { Button } from '@/components/ui/button';
import {inter} from '@/lib/font/Inter';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function HelpAndSupportPage() {
  const [supportData, setSupportData] = useState({
    email: 'support@example.com',
    phone: '+1 (555) 987-6543',
    hours: 'Monday - Friday, 9:00 AM - 6:00 PM EST'
  });

  useEffect(() => {
    const storedSupport = localStorage.getItem('supportData');
    if (storedSupport) {
      try {
        setSupportData(JSON.parse(storedSupport));
      } catch (error) {
        console.error('Error parsing stored support data:', error);
      }
    }
  }, []);

  const faqData = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on 'Forgot Password' on the login page. Enter your email address and we'll send you instructions to create a new password."
    },
    {
      question: "How can I update my personal information?",
      answer: "Navigate to your profile settings from the dashboard. Click on 'Edit Profile' and update your information. Don't forget to save your changes."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. All data is encrypted both in transit and at rest. We follow industry-standard security practices to protect your information."
    },
    {
      question: "How do I delete my account?",
      answer: "To delete your account, go to Settings > Account > Delete Account. Please note that this action is irreversible and all your data will be permanently removed."
    },
    {
      question: "Can I use the service on mobile devices?",
      answer: "Yes, our platform is fully responsive and works on all mobile devices including smartphones and tablets through your web browser."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us via email or phone during business hours. For urgent issues, please call our support line. You can also use the contact form below."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Nav/>
      <div className={`min-h-screen w-full bg-prv flex items-center justify-center p-4 ${inter.className}`}>
        <div className="bg-white rounded-lg shadow-xl p-8 w-full mt-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Help & Support</h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            We're here to help you with any questions or concerns
          </p>
          
          <div className="space-y-8 h-96 overflow-auto">
            {/* Contact Information Section */}
            <section className="bg-gray-50 rounded-lg mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">Email</span>
                  </div>
                  <p className="text-gray-800">{supportData.email}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">Phone</span>
                  </div>
                  <p className="text-gray-800">{supportData.phone}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">Hours</span>
                  </div>
                  <p className="text-gray-800 text-sm">{supportData.hours}</p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqData.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-800 text-left ">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === index && (
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Links Section */}
            {/* <section className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <Link href="/documentation" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-800">Documentation</span>
                </Link>

                <Link href="/tutorials" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-800">Video Tutorials</span>
                </Link>

                <Link href="/community" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-gray-800">Community Forum</span>
                </Link>

                <Link href="/status" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-800">System Status</span>
                </Link>
              </div>
            </section> */}
          </div>

          <Link href={"/dashboard/user"}>
            <Button className='mt-6 w-full' variant={"selectdashed"}>Go Back</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HelpAndSupportPage;