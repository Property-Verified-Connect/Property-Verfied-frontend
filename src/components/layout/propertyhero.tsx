"use client";

import {inter, poppins} from "@/lib/font/Inter";
import Image from "next/image";
import ImageSlider2 from "../shared/ImageSlider";
import Link from "next/link";

export default function PropertyHero() {
  return (
    <div className="w-full min-h-screen bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="px-6 md:px-20 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          
          {/* Left Heading */}
          <div className="max-w-2xl">
            <h1 className={`text-4xl md:text-6xl font-semibold leading-tighter text-gray-500 ${poppins.className}`}>
              Buy, rent, or sell your <br />
              Property Digitaly
            </h1>
          </div>

          {/* Right Content */}
          <div className="max-w-md">
            <p className={`${inter.className} text-gray-600 mb-6 text-lg`}>
              A great platform to buy, sell, or even rent your properties
              without any commissions.
            </p>
    <Link href={"/dashboard/auth/login"}>
    
            <button className="bg-[#2395C5] hover:bg-white  hover:text-black hover:border-2 hover:border-gray-300 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md">
              Browse Properties →
            </button>
    </Link>
          </div>
        </div>
      </section>

      {/* ================= IMAGE SECTION ================= */}
      <section >
        {/* <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=867&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"   // put your image inside public/image/
            alt="Property"
            fill
            className="object-cover"
          />
        </div> */}

        <ImageSlider2/>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className={`bg-[#2395C5] text-white mt-10 py-12 ${poppins.className}`}>
        <div className="px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          <div>
            <h2 className="text-3xl font-bold">850+</h2>
            <p className="text-white mt-2">Properties for Rent</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">950+</h2>
            <p className="text-white mt-2">Homes for Sale</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">18k</h2>
            <p className="text-white mt-2">Satisfied Clients</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">4k</h2>
            <p className="text-white mt-2">Properties Sold</p>
          </div>

        </div>
      </section>

    </div>
  );
}