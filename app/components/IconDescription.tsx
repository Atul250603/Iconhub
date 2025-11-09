import { Button } from "@/components/ui/button";
import type { IconElement } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Export from "./Export";

export default function IconDescription({ icon }: { icon: IconElement }) {
    return (
      <div className="flex items-center gap-4">
        <div>
            <Image src={icon.path} alt={icon.name} width={100} height={100} />
        </div>
        <div>
            <div className="text-xl font-bold">{icon.name}</div>
            <div>
                By <span className="italic">{icon.source}</span>
            </div>
            <div className="my-3 flex items-center gap-2">
                <Export fileName={icon.name} />
                <Button>
                    <Link href={`icons/${icon.id}`}>
                        Customize
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    )
}