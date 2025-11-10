"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, MessageSquare } from "lucide-react";
import { handleSubmit } from "@/utils/firebase";

export default function FeedbackPage() {
    const [feedback, setFeedback] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex flex-col justify-center h-full"
        >
          <div className="max-w-2xl mx-auto w-full py-8 sm:py-12">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <MessageSquare className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-balance">
                        We'd Love to Hear From You!
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto text-balance">
                        Your feedback helps us make IconHub better. Share your thoughts, suggestions, or report any issues you've encountered.
                    </p>
                </div>

              
                <Textarea
                    id="feedback"
                    placeholder="Tell us what you think... Share your experience, suggest features, or let us know how we can improve IconHub for you."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[140px]"
                />

                    {/* Submit Button */}
                    <div className="flex items-center justify-end mt-4">
                       
                        <Button
                            className="font-medium min-w-[140px]"
                            disabled={isLoading || feedback.trim().length === 0}
                            onClick={()=>{ handleSubmit({setIsLoading, feedback, setFeedback}) }}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner/>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit Feedback
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </div>
                {/* Footer Note */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                    We read every piece of feedback and use it to improve IconHub.
                </p>
            </div>
        </motion.div>
    )
}