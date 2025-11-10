import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "toastrr";

interface HandleSubmitProps {
    setIsLoading?: (isLoading: boolean) => void;
    feedback: string;
    setIsOpen?: (isOpen: boolean) => void;
    setFeedback: (feedback: string) => void;
}

const defaultProps = {
    setIsLoading: () => {},
    feedback: "",
    setIsOpen: () => {},
    setFeedback: () => {}
}



export const handleSubmit = async ({
    setIsLoading = defaultProps.setIsLoading,
    feedback = defaultProps.feedback,
    setIsOpen = defaultProps.setIsOpen,
    setFeedback = defaultProps.setFeedback
}: HandleSubmitProps) => {
    setIsLoading(true);
    try {
      const feedbackRef = collection(db, "feedback");
      await addDoc(feedbackRef, {
        feedback: feedback,
        createdAt: new Date(),
      });
      toast.success("Thank you for your feedback!");
      setIsOpen(false);
      setFeedback("");
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };