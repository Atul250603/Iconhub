"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, Sliders, Code, Download } from "lucide-react";
import { motion } from "motion/react";

export default function Features() {
  const features = [
    {
      title: "Massive Icon Library",
      description: "Explore thousands of premium icons sourced from popular libraries like Lucide, Tabler, etc.",
      icon: Library
    },
    {
      title: "Endless Customization",
      description: "Customize the icons to your liking, you can tweak everything from stroke, fill, gradient, size, background to the individual elements of the icon.",
      icon: Sliders
    },
    {
      title: "Smart SVG Engine",
      description: "The SVG engine preserves clean, export-ready SVG code — no extra layers or junk markup. Perfect for developers and designers alike.",
      icon: Code
    },
    {
      title: "Instant Export",
      description: "Export the icons to your project, you can export the icons as SVG and PNG in seconds.",
      icon: Download
    }
  ]
  return (
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2, ease: 'easeInOut'}}
    className="my-20"
    >
      <div className="text-4xl md:text-5xl font-bold text-center mb-10">
        Why Iconhub ?
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <IconComponent className="w-6 h-6 " />
                  <CardTitle className="text-xl font-bold">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </motion.div>
  )
}