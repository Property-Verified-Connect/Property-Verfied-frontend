"use client";

import Nav from "@/components/layout/nav";
import FeatureCard from "@/components/shared/VedioCard";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import PropertyHero from "@/components/layout/propertyhero";

export default function Page() {
  /* =========================
     LOADER STATE
  ========================== */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // loader duration (3 sec)

    return () => clearTimeout(timer);
  }, []);

  /* =========================
     WORD ANIMATION
  ========================== */
  const words = ["Search ! ", "Matching ! ", "Verified !"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const word = words[index];

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

  const Vedio = [
    { Name: "Budget Analyzer" },
    { Name: "People's Category Choice" },
    { Name: "Rent Solution" },
    { Name: "AI Discuss" },
  ];

  return (
    <>
      {/* =========================
         STYLES
      ========================== */}
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

      {/* =========================
         LOADER SCREEN
      ========================== */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[999]  flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <video
              src="/image/Propertyloader.mp4"
              autoPlay
              muted
              playsInline
              className="w-[100%] md:w-[40%]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
         MAIN CONTENT
      ========================== */}
      <Nav />

      <div className="min-h-screen mt-20 font-serif">
        {/* Header */}
        {/* <header className="px-10 pt-10 pb-6">
          <h1 className="heading-font text-5xl font-bold tracking-tight text-stone-900 leading-[1.1]">
            AI Powered
            <br />
            Property{" "}
            <span className="word-slot text-[#2395C5] h-15">
              <AnimatePresence mode="wait">
                <motion.span
                  key={word}
                  style={{ display: "inline-flex" }}
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
        </header> */}

        {/* Image Section */}
        {/* <section className="px-10 pb-12">
          <div className="flex gap-2 h-72">
            <div className="flex items-center justify-center border-2 overflow-hidden rounded-sm">
              <Image
                src="/image/Logo.png"
                height={400}
                width={900}
                alt="logo"
              />
            </div>

            <div className="flex-1 overflow-hidden hidden md:block rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=80"
                alt="Architecture"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="flex-1 overflow-hidden hidden md:block rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&q=80"
                alt="Modern Home"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section> */}

        <PropertyHero/>
        

        {/* Features Section */}
        {/* <section className="px-10 pb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-3xl tracking-widest text-stone-700 uppercase">
              Our Features
            </span>
          </div>

          <div className="min-h-screen flex-col md:flex-row flex items-center justify-center gap-20">
            {Vedio.map((val, index) => (
              <FeatureCard key={index} FeatureName={val.Name} />
            ))}
          </div>
        </section> */}
      </div>
    </>
  );
}