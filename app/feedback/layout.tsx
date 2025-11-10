import { getSiteUrl } from "@/constants/url";
import { Metadata } from "next";
import ToasterProvider from "@/Providers/Toaster";

export const metadata: Metadata = {
    title: "Feedback",
    description: "We'd love to hear your feedback!",
    openGraph: {
        title: "Feedback - IconHub",
        description: "We'd love to hear your feedback!",
        images: [`${getSiteUrl()}/og-image.png`],
    },
}


export default function FeedbackLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full w-full max-w-7xl mx-auto p-4">
            <ToasterProvider />
            {children}
        </div>
    )
}