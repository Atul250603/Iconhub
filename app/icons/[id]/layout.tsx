import type { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Customize ${id.charAt(0).toUpperCase() + id.slice(1)} Icon - IconHub`,
    description: `Customize and export the ${id} icon. Change colors, size, stroke width, and export as SVG or PNG. Free icon customization tool.`,
    keywords: [`${id} icon`, "customize icon", "SVG icon", "free icon", "Lucide icon"],
    openGraph: {
      title: `Customize ${id} Icon - IconHub`,
      description: `Customize and export the ${id} icon to your project.`,
      images: ["/og-image.png"],
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