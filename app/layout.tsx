import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import { getSiteUrl } from "@/constants/url";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import ToasterProvider from "@/Providers/Toaster";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Iconhub - Customize & Export Icons in Seconds",
    template: "%s | Iconhub",
  },
  description: "Browse thousands of icons, customize every detail, and export in seconds. The fastest way to find and customize icons for your projects.",
  keywords: ["icons", "icon library", "customize icons", "export icons", "SVG icons", "lucide icons", "icon generator"],
  authors: [{ name: "Atul Goyal", url: "https://x.com/AtulGoyal383989" }],
  creator: "Atul Goyal",
  publisher: "Atul Goyal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Iconhub",
    title: "Iconhub - Customize & Export Icons in Seconds",
    description: "Browse thousands of icons, customize every detail, and export in seconds.",
    images: [
      {
        url: `${getSiteUrl()}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Iconhub - Customize & Export Icons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iconhub - Customize & Export Icons in Seconds",
    description: "Browse thousands of icons, customize every detail, and export in seconds.",
    images: [`${getSiteUrl()}/og-image.png`],
    creator: "@AtulGoyal383989",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Iconhub",
              description: "Browse thousands of icons, customize every detail, and export in seconds.",
              url: getSiteUrl(),
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                bestRating: "5"
              }
            })
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <ToasterProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
