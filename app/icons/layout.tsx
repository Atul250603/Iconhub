import { getSiteUrl } from "@/constants/url";
import type { Metadata } from "next";
import Feedback from "../components/Feedback";  

export const metadata: Metadata = {
  title: "Browse Icons",
  description: "Browse and search through thousands of customizable icons. Find the perfect icon for your project.",
  openGraph: {
    title: "Browse Icons - Iconhub",
    description: "Browse and search through thousands of customizable icons.",
    images: [`${getSiteUrl()}/og-image.png`],
  },
};


export default function IconsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="relative h-full">
        {children}
        <Feedback />
      </div>
  )
}