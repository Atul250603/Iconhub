"use client";
import { Separator } from "@/components/ui/separator";
import { useThemeSafe } from "@/hooks/useThemeSafe";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { isDark } = useThemeSafe();

  return (
    <div className="mt-20 border-t">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-7 justify-items-center md:justify-items-normal">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="logo" width={24} height={24} />
                <div className="text-xl font-bold">
                    Iconhub
                </div>
            </div>
            <div className="text-base text-muted-foreground max-w-md text-balance tracking-tight my-2">
              Browse thousands of icons, customize every detail, and export in seconds.
            </div>
            <div>
                Built by <Link href="https://x.com/AtulGoyal383989" target="_blank" className="font-semibold underline">Atul Goyal</Link>
            </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center md:justify-items-normal">
        <div>
            <div className="font-bold mb-2">
                LINKS
            </div>
            <div className="flex flex-col">
                <Link href="/" className="text-center md:text-left">Home</Link>
                <Link href="/icons" className="text-center md:text-left">Icons</Link>
            </div>
        </div>
        <div>
            <div className="font-bold mb-2">
               OUR PRODUCTS 
            </div>
            <div className="flex flex-col">
                <Link href="https://toastrr.vercel.app/" target="_blank" className="text-center md:text-left">Toastrr</Link>
                <Link href="https://quizzify.site" target="_blank" className="text-center md:text-left">Quizzify</Link>
            </div>
        </div>
      </div>
    </div>
    <Separator className="my-4"/>
    <div className="flex items-center gap-4 flex-wrap">
      <div className="w-max">
        {
          isDark ? (
            <a href="https://findly.tools/iconhub?utm_source=iconhub" target="_blank">
              <img 
                src="https://findly.tools/badges/findly-tools-badge-dark.svg" 
                alt="Featured on findly.tools" 
                style={{ width: "auto", height: "40px" }}
              />
            </a>
          ) : (
            <a href="https://findly.tools/iconhub?utm_source=iconhub" target="_blank">
              <img 
                src="https://findly.tools/badges/findly-tools-badge-light.svg" 
                alt="Featured on findly.tools" 
                style={{ width: "auto", height: "40px" }}
              />
            </a>
          )
        }
      </div>
      <div className="w-max">
        {
          isDark ? (
            <a href="https://twelve.tools" target="_blank">
              <img src="https://twelve.tools/badge0-dark.svg" alt="Featured on Twelve Tools" style={{ width: "auto", height: "40px" }}/>
            </a>
          ) : (
            <a href="https://twelve.tools" target="_blank">
              <img src="https://twelve.tools/badge0-white.svg" alt="Featured on Twelve Tools" style={{ width: "auto", height: "40px" }}/>
            </a>
          )
        }
      </div>
      <div className="w-max">
        {
          isDark ? (
            <a href="https://startupfa.me/s/iconhub?utm_source=icon-hub.vercel.app" target="_blank">
              <img src="https://startupfa.me/badges/featured/dark.webp" alt="Iconhub - Featured on Startup Fame" style={{ width: "auto", height: "40px" }} />
            </a>
          ) : (
            <a href="https://startupfa.me/s/iconhub?utm_source=icon-hub.vercel.app" target="_blank">
              <img src="https://startupfa.me/badges/featured/light.webp" alt="Iconhub - Featured on Startup Fame" style={{ width: "auto", height: "40px" }} />
            </a>
          )
        }
      </div>
    </div>
    </div>
  )
}