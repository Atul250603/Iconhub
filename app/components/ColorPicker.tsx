'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { colorPresets } from '@/constants';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { useColorPicker } from 'react-best-gradient-color-picker';

const Picker = dynamic(() => import('react-best-gradient-color-picker'), { ssr: false });

export default function CustomColorPicker({ color, setColor}: { color: string, setColor: (c: string)=>void }) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { rgbaArr } = useColorPicker(color, setColor);
  const showCheckerboard = useMemo(() => {
    try {
      if (color === 'none' || color === 'transparent') {
        return true;
      } else if (rgbaArr.length >= 4) {
        return rgbaArr[3] === 0;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }, [rgbaArr, color]);

  return (
    <div className="rbgcp-wrapper">
      <DropdownMenu
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DropdownMenuTrigger>
          <div className={`w-6 h-6 rounded-sm border border-muted-foreground cursor-pointer ${!showCheckerboard ? '' : 'bg-checkerboard'}`} style={!showCheckerboard ? { background: color } : {}}>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='p-2'
          side="left"
        >
          <div className='flex items-center justify-end'>
            <X className='w-4 h-4 cursor-pointer mb-2' onClick={() => setIsOpen(false)}/>
          </div>
          <Picker
            value={color}
            onChange={setColor}
            hideEyeDrop={true}
            hideAdvancedSliders={true}
            hideColorGuide={true}
            hideInputType={true}
            className={cn('bg-transparent!', showCheckerboard ? 'show-checkerboard' : '')}
            presets={colorPresets}
         />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}