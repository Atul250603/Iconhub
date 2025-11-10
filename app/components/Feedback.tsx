"use client";
import { ArrowRight, Bot, X } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { handleSubmit } from "@/utils/firebase";

export default function Feedback() {
  const [isOpen, setIsOpen] = useState(false);

  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="outline-none">
          <div className="p-2 bg-primary text-primary-foreground rounded-full cursor-pointer shadow-lg hover:bg-primary/90 transition-colors">
            {!isOpen ? <Bot className="size-6" /> : <X className="size-6" />}
          </div>
        </PopoverTrigger>
        <PopoverContent side="left" className="mb-4 mr-2">
          <div className="text-lg font-bold">Enjoying Iconhub?</div>
          <div className="text-sm text-muted-foreground mt-1">
            We'd love to hear your feedback!
          </div>
          <div className="mt-4">
            <Textarea
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={6}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              className="font-medium"
              disabled={isLoading || feedback.trim().length === 0}
              onClick={() => handleSubmit({setIsLoading, feedback, setIsOpen, setFeedback})}
            >
              {isLoading ? <><Spinner /> Submitting...</> : <>Submit Feedback <ArrowRight className="ml-2 w-4 h-4" /></>}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}