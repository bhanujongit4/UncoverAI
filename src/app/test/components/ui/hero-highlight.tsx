"use client";
import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/hero-highlight";

export function HeroHighlightDemo() {
  return (
    <div className="w-fit mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white leading-relaxed lg:leading-snug text-center"
      >
        Welcome to the main is a{" "}
        <Highlight className="text-black dark:text-white">
          Highlight
        </Highlight> of our page!
      </motion.h1>
    </div>
  );
}