'use client';
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound({ message="Oops! We couldn't find the icon you were looking for.", showGoBackButton = true }: { message?: string, showGoBackButton?: boolean }) {
  return (
    <motion.div 
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -10 }}
       transition={{ duration: 0.2, ease: 'easeInOut'}}
       className="flex flex-col items-center justify-center h-full"
    >
      <div>
        <AlertTriangle className="size-20 text-red-500" />
      </div>
      <div className="text-2xl md:text-3xl lg:text-4xl font-semibold my-4 text-balance text-center">
        {message}
      </div>
      <div className="mt-4">
        {showGoBackButton && (
          <Button
            variant="outline"
          >
              <Link href="/icons">
                  <span className="flex items-center gap-2">
                    <ArrowLeftIcon className="size-4" />
                    Go back to the icons page
                  </span>
              </Link>
          </Button>
        )}
      </div>
    </motion.div>
  )
}