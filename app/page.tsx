import BuiltFor from "./components/Landing/BuiltFor";
import Cta from "./components/Landing/Cta";
import Features from "./components/Landing/Features";
import Footer from "./components/Landing/Footer";
import Hero from "./components/Landing/Hero";
import SeeTheDiff from "./components/Landing/SeeTheDiff";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iconhub - Customize & Export Icons in Seconds",
  description: "Browse thousands of icons, customize every detail, and export in seconds. The fastest way to find and customize icons for your projects.",
  openGraph: {
    title: "Iconhub - Customize & Export Icons in Seconds",
    description: "Browse thousands of icons, customize every detail, and export in seconds.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <div className="h-full w-full max-w-7xl mx-auto p-4 ">
      <Hero />
      <Features />
      <SeeTheDiff />
      <BuiltFor />
      <Cta />
      <Footer />
    </div>
  );
}
