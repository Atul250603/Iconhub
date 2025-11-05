"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

export default function Hero() {
  const theme = useTheme();
  const isDark = theme?.resolvedTheme === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="pt-[10vh] mb-20 max-w-5xl mx-auto"
    >
      <div className="md:text-6xl text-5xl font-bold text-center text-balance tracking-tight px-4">
        Find, Customize & Export Icons Effortlessly
      </div>
      <div className="text-lg sm:text-xl text-muted-foreground text-center text-balance mt-7 font-medium">
        Iconhub lets you explore thousands of SVG icons, customize every detail,
        and export instantly — no design tools required.
      </div>
      <div className="flex justify-center mt-10">
        <Button size="lg" className="text-lg px-8">
          <Link href="/icons" className="flex items-center gap-2">
            <span className="font-semibold">Browse Icons</span>
            <ArrowRight className="size-5" strokeWidth={2.5} />
          </Link>
        </Button>
      </div>
      <div className="flex justify-center mt-10 gap-4 items-center">
        <div>
          {isDark ? (
            <a
              href="https://peerlist.io/atul250603/project/iconhub"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://peerlist.io/api/v1/projects/embed/PRJH9OBBB9D8EJRD62DQBNAPDDM6NG?showUpvote=true&theme=dark"
                alt="Iconhub"
                style={{ width: "auto", height: "60px" }}
              />
            </a>
          ) : (
            <a
              href="https://peerlist.io/atul250603/project/iconhub"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://peerlist.io/api/v1/projects/embed/PRJH9OBBB9D8EJRD62DQBNAPDDM6NG?showUpvote=true&theme=light"
                alt="Iconhub"
                style={{ width: "auto", height: "60px" }}
              />
            </a>
          )}
        </div>
        <div>
          {isDark ? (
            <a
              href="https://www.producthunt.com/products/iconhub-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-iconhub&#0045;2"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1033685&theme=dark&t=1762345399095"
                alt="Iconhub - Customize&#0032;&#0038;&#0032;export&#0032;icons&#0032;in&#0032;seconds | Product Hunt"
                style={{ width: "auto", height: "60px" }}
              />
            </a>
          ) : (
            <a
              href="https://www.producthunt.com/products/iconhub-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-iconhub&#0045;2"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1033685&theme=light&t=1762345173796"
                alt="Iconhub - Customize&#0032;&#0038;&#0032;export&#0032;icons&#0032;in&#0032;seconds | Product Hunt"
                style={{ width: "auto", height: "60px" }}
              />
            </a>
          )}
        </div>
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
  );
}
