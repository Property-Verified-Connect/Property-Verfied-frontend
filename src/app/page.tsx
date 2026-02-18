"use client"
import Nav from "@/components/layout/nav";
import FeatureCard from "@/components/shared/VedioCard";
import {motion , AnimatePresence} from "framer-motion"
import { useEffect , useState } from "react";
import Image from "next/image";
import { Fullscreen } from "lucide-react";

export default function Page() {
  
const words = ["Search ! ", "Matching ! ", "Verified !"];

const letterVariants = {
  hidden: { y: 50, opacity: 0, rotateX: -90 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: (i) => ({
    y: -40,
    opacity: 0,
    rotateX: 90,
    transition: {
      delay: i * 0.03,
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  }),
};


const Vedio = [{
     
  video:"./image",
  Name:"Budget Analyzier "
} , 
{
     
  video:"./image",
  Name:"People's Category Choice "
},{
     
  video:"./image",
  Name:" Rent Solution "
},{
     
  video:"./image",
  Name:"Ai Discuss"
}]

const [index, setIndex] = useState(0);
 useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

   const word = words[index];

  return (

    <>
     <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        .heading-font { font-family: 'Playfair Display', Georgia, serif; }
        .word-slot {
          display: inline-flex;
          align-items: flex-end;
          overflow: hidden;
          perspective: 500px;
          min-width: 9ch;
          vertical-align: bottom;
        }
      `}</style>
    <Nav/>
    <div className="min-h-screen mt-20 font-serif">
      {/* Header */}
      <header className="px-10 pt-10 pb-6">
        <div className="flex flex-col">
          {/* Left: Title */}
           <h1 className="heading-font text-5xl font-bold tracking-tight text-stone-900 leading-[1.1]">
        AI Powered
        <br />
        Property{" "}
        <span className="word-slot text-[#2395C5] h-15">
          <AnimatePresence mode="wait">
            <motion.span
              key={word}
              style={{ display: "inline-flex" }}
              aria-label={word}
            >
              {word.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    display: "inline-block",
                    transformOrigin: "top center",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
         
          

          {/* Right: Copyright + Tagline */}
          {/* <div className="text-right max-w-xs">
            <p className="text-xs text-stone-500 mb-4">©2024 BDARCH STUDIO. All Rights Reserved</p>
            <p className="text-sm text-stone-600 leading-relaxed text-left">
              Architects of inspirational environments, we redefine spaces, creating environments that inspire, uplift, and enhance the human experience.
            </p>
          </div> */}
        </div>
      </header>

      {/* Image Grid */}
      <section className="px-10 pb-12">
        <div className="flex gap-2 h-72">
          {/* Large Left Image */}
          <div className="flex items-center justify-center  border-2 overflow-hidden rounded-sm">
                    <Image src={'/image/Logo.png'} className="md:scale-80" height={400} width={900} alt='logo' />
          </div>

          {/* Middle Image */}
          <div className="flex-1 overflow-hidden hidden md:block rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=80"
              alt="Minimalist white exterior architecture"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right Image */}
          <div className="flex-1 overflow-hidden hidden md:block rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&q=80"
              alt="White farmhouse style modern home"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-10 pb-16">
        {/* Divider with label */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-3xl tracking-widest text-stone-700 uppercase">Our Features</span>
         
        </div>

        {/* About Text */}
        <div className="min-h-screen flex-col md:flex-row flex items-center justify-center gap-20">
          {
            Vedio.map((val ,index)=>(
                        <FeatureCard key={index} FeatureName={val.Name}/>
                  
            ))
          }
        </div>
      </section>
    </div>
    </>
  );
}