import { Inter } from 'next/font/google';
import React from 'react'


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional CSS variable
});

function MiddlewareLoader() {
  return (
    
 <div
            className="h-screen w-full flex items-center justify-center flex-col"
       
        >
           <svg id='svg' viewBox="25 25 50 50">
  <circle id='circle' r="20" cy="50" cx="50"></circle>
</svg>
            <span className={`mt-4 text-sm text-gray-700 font-bold ${inter.className} `}>Loading...</span>
        </div>


  )
}

export default MiddlewareLoader