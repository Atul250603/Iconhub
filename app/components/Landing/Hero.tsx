"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Hero() {
return (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: 'easeInOut'}}
        className="pt-[10vh] mb-20 max-w-5xl mx-auto"
    >
        <div className="md:text-6xl text-5xl font-bold text-center text-balance tracking-tight px-4">
          Find, Customize & Export Icons Effortlessly
        </div>
        <div className="text-lg sm:text-xl text-muted-foreground text-center text-balance mt-7 font-medium">
          Iconhub lets you explore thousands of SVG icons, customize every detail, and export instantly — no design tools required.
        </div>
        <div className="flex justify-center mt-10">
           <Button size="lg" className="text-lg px-8">
                <Link href="/icons" className="flex items-center gap-2">
                    <span className="font-semibold">Browse Icons</span>
                    <ArrowRight className="size-5" strokeWidth={2.5} />
                </Link>
            </Button>
        </div>
        <div className="mt-20">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/video-placeholder.png"
              className="w-full h-auto rounded-2xl shadow-md border aspect-video"
            >
                <source src="/demo.webm" type="video/webm" />
                <source src="/demo.mp4" type="video/mp4" />
            </video>
        </div>
      </motion.div>
)
}