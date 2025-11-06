"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Apple, Atom, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SeeTheDiff() {
    const image = 
    [
      {
      before: Apple,
      after: 'apple-after.svg',
      strokeWidth: 1
    },
    {
      before: Instagram,
      after: 'instagram-after.svg',
      strokeWidth: 2
    },{
        before: Atom,
        after: 'atom-after.svg',
        strokeWidth: 2
    }]

    const [currentImage, setCurrentImage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNextImage = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentImage((prev) => (prev + 1) % image.length);
    }
    
    const handlePreviousImage = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentImage((prev) => (prev - 1 + image.length) % image.length);
    }

    const handleDotClick = (index: number) => {
      if (isAnimating || index === currentImage) return;
      setIsAnimating(true);
      setCurrentImage(index);
    }

    const handleAnimationComplete = () => {
      setIsAnimating(false);
    }


    const isMobile = useMediaQuery("(max-width: 550px)");
    return (
      <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeInOut'}}
      className="my-20"
      >
        <div className="text-4xl md:text-5xl font-bold text-center mb-10">
            Transform In Seconds
        </div>
        <div className="flex items-center justify-center gap-8 md:gap-12">
            {/* Before Section */}
            <div className="flex flex-col items-center">
                <div className="text-sm font-medium mb-4 text-muted-foreground">
                    Before
                </div>
                <div className={cn(
                    "relative overflow-hidden",
                    isMobile ? "w-[100px] h-[100px]" : "w-[200px] h-[200px]"
                )}>
                    <motion.div
                        className="flex flex-col h-full"
                        animate={{ y: `-${currentImage * 100}%` }}
                        transition={{ 
                            type: "spring",
                            stiffness: 400,
                            damping: 35
                        }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        {image.map((item, index) => {
                            const IconComponent = item.before;
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-center justify-center flex-shrink-0 w-full h-full",
                                        isMobile ? "min-w-[100px] min-h-[100px]" : "min-w-[200px] min-h-[200px]"
                                    )}
                                >
                                    <IconComponent 
                                        className={cn(
                                            "transition-opacity duration-300",
                                            isMobile ? "w-[100px] h-[100px]" : "w-[200px] h-[200px]"
                                        )} 
                                        strokeWidth={item.strokeWidth}
                                    />
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Separator */}
            <div className={cn(
                "bg-gradient-to-b from-transparent via-border to-transparent rounded-full",
                isMobile ? "h-[180px] w-[1px]" : "h-[280px] w-[1px]"
            )} />

            {/* After Section */}
            <div className="flex flex-col items-center">
                <div className="text-sm font-medium mb-4 text-muted-foreground">
                    After
                </div>
                <div className={cn(
                    "relative overflow-hidden",
                    isMobile ? "w-[100px] h-[100px]" : "w-[200px] h-[200px]"
                )}>
                    <motion.div
                        className="flex flex-col h-full"
                        animate={{ y: `-${currentImage * 100}%` }}
                        transition={{ 
                            type: "spring",
                            stiffness: 400,
                            damping: 35
                        }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        {image.map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-center justify-center flex-shrink-0 w-full h-full",
                                    isMobile ? "min-w-[100px] min-h-[100px]" : "min-w-[200px] min-h-[200px]"
                                )}
                            >
                                <Image 
                                    src={`/${item.after}`} 
                                    alt={`After ${index + 1}`}
                                    className="w-full h-full object-contain" 
                                    width={200} 
                                    height={200}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-12 flex items-center justify-center gap-6">
            <Button
                variant="ghost"
                size="icon"
                onClick={handlePreviousImage}
                disabled={isAnimating}
                className="h-10 w-10 rounded-full hover:bg-accent"
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
                {image.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        disabled={isAnimating}
                        className={cn(
                            "transition-all duration-300 rounded-full cursor-pointer",
                            currentImage === index
                                ? "w-2 h-2 bg-foreground"
                                : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={handleNextImage}
                disabled={isAnimating}
                className="h-10 w-10 rounded-full hover:bg-accent"
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    </motion.div>
    )
}