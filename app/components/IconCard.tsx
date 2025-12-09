'use client';
import type { IconElement } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image";
import React, { useState } from "react";
import { handleError } from "@/utils/logs/error";
import Link from "next/link";

export default React.memo(function IconCard({ icon } : { icon: IconElement }) {
  const [loaded, setLoaded] = useState<boolean>(false);

  const failedToLoadIcon = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    handleError<undefined>(`Failed to load icon ${icon.name}`, undefined);
    e.currentTarget.style.display = 'none';
    setLoaded(true);
  }

  return (
    <>
    <Tooltip>
      <TooltipTrigger asChild>
            <Link
              href={`icons/${icon.id}`}
              className="relative w-[56px] h-[56px] bg-neutral-100 dark:bg-neutral-200 rounded-md flex items-center justify-center p-3 hover:bg-neutral-200 dark:hover:bg-neutral-300 transition-colors duration-200 cursor-pointer"
            >
              {!loaded && (
                <div className="absolute inset-1 rounded bg-neutral-200 dark:bg-neutral-400 animate-pulse pointer-events-none" />
              )}
              <Image
                src={icon.path}
                alt={icon.name}
                width={24}
                height={24}
                loading="lazy"
                onError={failedToLoadIcon}
                onLoad={() => setLoaded(true)}
                className={loaded ? 'opacity-100 transition-opacity duration-150' : 'opacity-0'}
              />
            </Link>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-sm font-bold">
          {icon.name}
        </div>
        <div className="text-sm">
          By <span className="italic">{icon.source}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  </>
)});