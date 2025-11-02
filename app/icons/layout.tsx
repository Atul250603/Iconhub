import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Icons",
  description: "Browse and search through thousands of customizable icons. Find the perfect icon for your project.",
  openGraph: {
    title: "Browse Icons - Iconhub",
    description: "Browse and search through thousands of customizable icons.",
    images: ["/og-image.png"],
  },
};

export default function IconsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}