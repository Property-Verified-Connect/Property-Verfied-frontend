import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import inter from "@/lib/font/Inter";
import { INDIAN_CITIES } from "@/function/cities";
import SliderImage from "../shared/SliderImage";




interface prop{
  icon:string,
  label : string
}


export default function PropertyDashboard() {
  return (
    <div className="flex flex-col min-h-screen w-full mb-20  bg-prv">
      {/* Header */}
    
   

      {/* Content */}
      <div className="flex flex-col w-full md:items-center md:justify-center overflow-y-auto px-4 py-3 ">
    {/* <h1 className={`text-2xl ${inter.className} font-bold text-gray-600 flex items-center`}>User Dashboard <ChevronRightIcon/></h1> */}
        {/* City Selector */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-1 block">Select City</label>
          <Select>
            <SelectTrigger className="bg-white w-full md:w-[30rem] ">
              <SelectValue placeholder="Not selected" />
            </SelectTrigger>
            <SelectContent>
              {
                INDIAN_CITIES.map((val ,index)=>(
                  <SelectItem key={index} value={val}>val</SelectItem>

                ))
              }
        
            </SelectContent>
          </Select>
        </div>

        {/* Property Image */}
        <div className="rounded-2xl w-full h-50 overflow-hidden md:h-96 md:w-[40rem] flex items-center justify-center mb-4">
          {/* <Image
            src="/image/image-2.jpg"
            alt="Property"
            width={400}
            height={200}
            className="w-full h-48 md:h-96 md:w-[40rem] md:rounded-2xl shadow-md  object-cover"
          /> */}

          <SliderImage Image={[ "/image/diaplay.png","/image/image-2.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yTPYnP18dd01BjwbyB6cyeSJ1QqJzFLCZw&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcqgtsGNO_IfzYM6VPS8lNikw4JWE-gsEBjQ&s"]}/>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link href={"/dashboard/user/propertyai"} >
          <FeatureCard icon={"spark"} label="AI Match Property" />
          </Link>
          <Link href={"/dashboard/user/find-property/filter-property"}> 
          <FeatureCard icon={"Find"} label="Find Property" />
          </Link>
           <Link href={"/dashboard/user/refer-pro"}> 
           <FeatureCard icon={"refer"} label="Refer Pro" />
          </Link>
          <FeatureCard icon={"law"} label="Wishlist" />
          <FeatureCard icon={"safe"} label="Verify your Property" />
         
        </div>
      </div>

      {/* Bottom Navbar */}
     
    </div>
  );
}

function FeatureCard({ icon, label }:prop) {
  return (
    <div className="flex md:w-80 sm:scale-100   flex-col items-center justify-center bg-white rounded-2xl shadow-md py-6 hover:scale-105 transition-transform">
    <img className="h-10 scale-120" src={`/image/${icon}.png`} alt="" />
      <p className="text-sm font-medium mt-2 text-center">{label}</p>
      {icon == "safe" ? <p className="text-xs text-gray-400" >coming soon</p>:"" }
    </div>
  );
}
