"use client";
import Image from "next/image";
import ThemeBtn from "./ThemeBtn";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const isCustomizePage = pathname.includes("/icons/");

  return (
    <div className={cn("flex items-center justify-between px-3 py-3 w-full mx-auto", isCustomizePage ? "" : "max-w-7xl")}>
      <div>
        <Link href="/" className="flex items-center gap-2">
            <div>
                <Image src="/logo.svg" alt="Icon Hub" width={24} height={24}/>
            </div>
            <div className="text-xl font-bold">
                Iconhub
            </div>
        </Link>
      </div>
      <div>
        <ThemeBtn />
      </div>
    </div>
  )
}