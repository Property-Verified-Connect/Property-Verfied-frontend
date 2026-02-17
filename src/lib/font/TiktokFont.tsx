"use client"
import { Poppins } from "next/font/google";


const tiktok = Poppins({
  subsets: ["latin"],
  variable: "--font-tiktok", // optional CSS variable
  weight:"900"
});

export default tiktok   