'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { Timeline } from "@/components/ui/timeline";
import { Herohome } from '../components/ui/Hero-home';
import ImageGallery from "@/components/ui/ImageGallery";

// TimelineDemo component defined within the file
function TimelineDemo() {
  const data = [
    {
      title: "Step 1",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            You can <Link href="/test">
              <span className="underline text-blue-600 hover:text-blue-800">go here</span>
            </Link> and upload the image/video you want to test
          </p>
          <div className="flex justify-center">
            <div className="relative w-44 h-44 md:w-60 md:h-60 lg:w-80 lg:h-80 overflow-hidden rounded-lg">
              <Image
                src="/upload-image.jpg"
                alt="Startup Template"
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-300 transform hover:scale-110 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            You can go here and upload the image/video you want to test
          </p>
          <div className="flex justify-center">
            <div className="relative w-44 h-44 md:w-60 md:h-60 lg:w-80 lg:h-80 overflow-hidden rounded-lg">
              <Image
                src="/validation-image.jpg"
                alt="Validation Image"
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-300 transform hover:scale-110 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            All we ask for is a little patience :)
          </p>
        </div>
      ),
    },
    {
      title: "And that's it!",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            You'll get your output like this 
          </p>
          <div className="flex justify-center">
            <div className="relative w-44 h-44 md:w-60 md:h-60 lg:w-80 lg:h-80 overflow-hidden rounded-lg">
              <Image
                src="/result-dark.jpg"
                alt="Result"
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-300 transform hover:scale-110 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return <Timeline data={data} />;
}

// Main Home component as the default export
export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  };

  return (
    <ThemeProvider>
      <ThemeToggle />
      
      <Herohome />
    
      <div className="flex flex-col overflow-hidden">
        <div className="py-10">
          <h2 className="text-3xl font-bold text-center">Watch Our <a className="inline-flex items-center gap-x-2 text-lg text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="https://youtu.be/8Rr0O1MOx6A?si=gy_dwHt6uFwwaMG4"target='blank'>
            Introduction
              <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a></h2>
        </div>

        <div className="py-10" id="timeline-section">
          <div className="mt-8 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-5xl md:text-7xl lg:text-6xl dark:text-neutral-200">
              A detailed walkthrough is{" "}
              <span className="text-lime-500 underline decoration-2 decoration-lime-400 hover:decoration-lime-600 transition duration-200">
                all you need
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-neutral-400">
              Discover step-by-step instructions and insights to guide you through the process effectively.
            </p>
          </div>

          <TimelineDemo />
        </div>

        <div className="py-10">

        </div>
        
        <div className="h-[1000px]"></div>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .container-scroll {
          transition: transform 0.5s ease-in-out;
        }
      `}</style>
    </ThemeProvider>
  );
}
