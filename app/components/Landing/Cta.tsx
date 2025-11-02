"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Cta() {
    return (
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: 'easeInOut'}}
        className="my-20 text-center"
        >
    <div className="bg-gradient-to-br from-muted/80 to-muted/40 border rounded-2xl p-12 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-bold mb-4">
                Ready to find your perfect icons?
            </div>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start browsing thousands of customizable icons. No signup required.
            </div>
            <Button size="lg" className="text-lg px-8">
                <Link href="/icons" className="flex items-center gap-2">
                    <span className="font-semibold">Browse Icons</span>
                    <ArrowRight className="size-5" strokeWidth={2.5} />
                </Link>
            </Button>
        </div>
    </div>
</motion.div>
    )
}