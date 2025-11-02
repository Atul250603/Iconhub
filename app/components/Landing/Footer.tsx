import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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
    </div>
  )
}