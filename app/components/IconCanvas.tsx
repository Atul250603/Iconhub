'use client';
import { useEffect, useRef, useState } from 'react';
import type { SvgConfig, ViewBoxDimensions } from '@/types';
import IconConfigPanel from './IconConfigPanel';
import { addShapeSelection, ensureBackgroundRect, getViewBoxDimensions, setAllShapeStyles, setBackgroundRect, setBaseIcon } from '@/utils/svg';
import { canvasID, defaultSvgConfig, myID } from '@/constants';
import { handleError } from '@/utils/logs/error';
import Export from './Export';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { trackIconViewed } from '@/utils/analytics';
import { useSetAtom } from 'jotai';
import { selectedPresetAtom } from '@/store/preset';
import usePresets from '@/hooks/usePresets';
import { isEqual } from 'lodash-es';

export default function IconPage({ svgContent, icon }: { svgContent: string, icon: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [viewBoxDimensions, setViewBoxDimensions] = useState<ViewBoxDimensions>({ width: 24, height: 24 });
  const [svgConfig, setSvgConfig] = useState<SvgConfig>(defaultSvgConfig);
  const setSelectedPreset = useSetAtom(selectedPresetAtom)
  const { selectedPreset } = usePresets();


  useEffect(() => setMounted(true), []);

  // when the selected preset changes, set the svg config to the selected preset config
  useEffect(() => {
    if (!selectedPreset) return;

    setSvgConfig((prev) => {
      const next = {
        ...prev,
        ...selectedPreset.config,
        shapes: prev.shapes // preserve the shape overrides as preset does not contain shapes
      }

      // return the previous config if the next config is the same as the previous config
      return isEqual(prev, next) ? prev : next;
    })
  }, [selectedPreset])

  // Track icon views when the icon page is mounted
  useEffect(() => {
    trackIconViewed(icon)
  }, [icon])

  // Reset the selected preset when the icon canvas is unmounted
  useEffect(() => {
    return () => {
      setSelectedPreset(null);
    }
  }, []);

  // Set the changes of the config to the svg element
  useEffect(() => {
    try {
      if (!mounted || !containerRef.current) return;
      containerRef.current.innerHTML = svgContent;
      const svgEl = containerRef.current.querySelector(`svg`) as unknown as SVGElement;
      const { width, height } = getViewBoxDimensions(svgEl);
      setViewBoxDimensions({ width, height });
      ensureBackgroundRect(svgEl, myID, svgConfig);
      setBaseIcon(svgEl, myID, svgConfig, viewBoxDimensions);
      setBackgroundRect(svgEl, myID, svgConfig, viewBoxDimensions);
      addShapeSelection(svgEl, setSelectedShapeId, myID);
      setAllShapeStyles(svgEl, myID, svgConfig, viewBoxDimensions);
    } catch (err) {
      handleError<undefined>(`Error setting the changes of the config to the svg element: ${err instanceof Error ? err.message : String(err)}`, undefined);
    }
  }, [svgConfig, mounted, containerRef.current])

  return (
    <div className='flex h-full md:flex-row flex-col'>
      <div className='lg:w-[70%] md:w-1/2 w-full md:h-full min-h-[50vh] bg-muted bg-grid flex items-center justify-center relative dark:bg-neutral-700'>
        <div className='absolute top-2 right-2 w-max'>
          <Export fileName={icon} className='dark:bg-secondary' />
        </div>
        <div className='absolute top-2 left-2'>
          <Button variant="outline" className='rounded-full dark:bg-secondary'>
            <Link href="/icons">
              <span className="flex items-center gap-2">
                <ArrowLeftIcon className="size-4" />
              </span>
            </Link>
          </Button>
        </div>
        <div ref={containerRef} id={canvasID} />
      </div>
      <div className='lg:w-[30%] md:w-1/2 w-full md:h-full min-h-[50vh]'>
        <IconConfigPanel key={icon} svgConfig={svgConfig} setSvgConfig={setSvgConfig} viewBoxDimensions={viewBoxDimensions} selectedShapeId={selectedShapeId} />
      </div>
    </div>
  )
}