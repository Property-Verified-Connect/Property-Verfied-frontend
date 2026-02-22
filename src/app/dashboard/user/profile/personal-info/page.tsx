"use client"
import Nav from '@/components/layout/nav';
import { Button } from '@/components/ui/button';
import {inter} from '@/lib/font/Inter';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function PersonalInfoPage() {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    city: 'New York',
    contact: '+1 (555) 123-4567'
  });

  useEffect(() => {
    const storedInfo = localStorage.getItem('userdata');
    if (storedInfo) {
      try {
        setPersonalInfo(JSON.parse(storedInfo));
      } catch (error) {
        console.error('Error parsing stored info:', error);
      }
    }
  }, []);

  return (
    <>
    <Nav/>
    <div className={`min-h-screen w-full bg-prv flex items-center justify-center p-4 ${inter.className}`}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center whitespace-nowrap">Personal Information</h2>
        
        <div className="space-y-5">
          <div className="border-b border-gray-200 pb-4">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Full Name
            </label>
            <p className="text-lg text-gray-800 font-medium">
              {personalInfo.name}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email Address
            </label>
            <p className="text-lg text-gray-800">
              {personalInfo.email}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              City
            </label>
            <p className="text-lg text-gray-800">
              {personalInfo.city}
            </p>
          </div>

          <div className="pb-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Contact Number
            </label>
            <p className="text-lg text-gray-800">
              {personalInfo.contact}
            </p>
          </div>
        </div>
        <Link href={"/dashboard/user"}>
        <Button  className='mt-3 w-full' variant={"selectdashed"}> Go Back </Button>
        </Link>
      </div>
    </div>
    </>
  );
}

export default PersonalInfoPage;