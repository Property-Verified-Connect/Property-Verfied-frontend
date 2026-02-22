"use client"
import Nav from '@/components/layout/nav';
import { Button } from '@/components/ui/button';
import {inter} from '@/lib/font/Inter';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function TermsAndConditionsPage() {
  const [termsData, setTermsData] = useState({
    lastUpdated: 'December 28, 2025',
    version: '1.0'
  });

  useEffect(() => {
    const storedTerms = localStorage.getItem('termsData');
    if (storedTerms) {
      try {
        setTermsData(JSON.parse(storedTerms));
      } catch (error) {
        console.error('Error parsing stored terms:', error);
      }
    }
  }, []);

  return (
    <>
      <Nav/>
      <div className={`min-h-screen w-full bg-[#CDE4F9] flex items-center justify-center  p-4 ${inter.className}`}>
        <div className="bg-white rounded-lg shadow-xl mt-10 p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center whitespace-nowrap">Terms and Conditions</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Last Updated: {termsData.lastUpdated} | Version {termsData.version}
          </p>
          
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Use License</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Permission is granted to temporarily access the materials on our platform for personal, non-commercial transitory viewing only. 
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3. User Account</h3>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility 
                for all activities that occur under your account or password. We reserve the right to refuse service, terminate accounts, 
                or remove content at our sole discretion.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4. Privacy Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                Your use of our service is also governed by our Privacy Policy. We collect and use personal information solely for 
                improving the user experience. We do not share your personal information with third parties without your consent.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5. Disclaimer</h3>
              <p className="text-gray-700 leading-relaxed">
                The materials on our platform are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby 
                disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness 
                for a particular purpose, or non-infringement of intellectual property.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6. Limitations</h3>
              <p className="text-gray-700 leading-relaxed">
                In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss 
                of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">7. Modifications</h3>
              <p className="text-gray-700 leading-relaxed">
                We may revise these terms of service at any time without notice. By using this platform, you are agreeing to be bound by 
                the current version of these terms of service.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">8. Contact Information</h3>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us through our support channel.
              </p>
            </section>
          </div>

          <Link href={"/dashboard/user"}>
            <Button className='mt-6 w-full' variant={"selectdashed"}>Go Back</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditionsPage;