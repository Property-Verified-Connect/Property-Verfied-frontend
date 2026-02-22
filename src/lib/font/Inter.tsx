"use client"
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional CSS variable
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins", // optional CSS variable
  weight:"700"
});

export {poppins,inter}  