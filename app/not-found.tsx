import NotFound from "./components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found - IconHub",
  description: "We couldn't find the page you were looking for.",
  keywords: ["icon not found", "not found", "not found icon"],
  openGraph: {
    title: "Not Found - IconHub",
    description: "We couldn't find the page you were looking for.",
  },
};

export default function NotFoundPage() {
  return (
    <div className='h-full flex items-center justify-center'>
      <NotFound message="Oops! We couldn't find the page you were looking for."/>
    </div>
  )
}