import { getSiteUrl } from "@/constants/url";
import { getIconById } from "@/utils/icon-lookup";
import type { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const icon = getIconById(id);
  if (!icon) {
    return {
      title: "Not Found - IconHub",
      description: "We couldn't find the page you were looking for.",
      keywords: ["icon not found", "not found", "not found icon"],
      openGraph: {
        title: "Not Found - IconHub",
        description: "We couldn't find the page you were looking for.",
      },
    };
  }

  const iconDisplayName = icon.name.charAt(0).toUpperCase() + icon.name.slice(1).toLowerCase();
  const sourceDisplayName = icon.source.charAt(0).toUpperCase() + icon.source.slice(1).toLowerCase();


  return {
    title: `Customize ${iconDisplayName} Icon by ${sourceDisplayName} - IconHub`,
    description: `Customize and export the ${iconDisplayName} icon by ${sourceDisplayName} to your project. Change colors, size, stroke width, and export as SVG or PNG. Free icon customization tool.`,
    keywords: [`${icon.name} icon by ${icon.source}`, "customize icon", "SVG icon", "free icon"],
    openGraph: {
      title: `Customize ${iconDisplayName} Icon by ${sourceDisplayName} - IconHub`,
      description: `Customize and export the ${iconDisplayName} icon by ${sourceDisplayName} to your project. Change colors, size, stroke width, and export as SVG or PNG. Free icon customization tool.`,
      images: [`${getSiteUrl()}/og-image.png`],
    },
  };
}

export default function IconLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}