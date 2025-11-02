// ResetButton.tsx
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

export default function ResetButton({ showResetButton, onClick, text = "Reset" }: { showResetButton: boolean, onClick: () => void, text?: string }) {
  return (
    <AnimatePresence initial={false}>
      {showResetButton && (
        <motion.div
          layout
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ 
            opacity: 1, 
            height: "auto",
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            height: 0,
            y: -10
          }}
          transition={{ 
            duration: 0.2,
            layout: { duration: 0.2, ease: "easeInOut" },
            height: { duration: 0.2 }
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Button variant="outline" size="sm" onClick={onClick}>{text}</Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}