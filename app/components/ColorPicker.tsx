'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import dynamic from 'next/dynamic';

const Picker = dynamic(() => import('react-best-gradient-color-picker'), { ssr: false }); // recommended

export default function CustomColorPicker({ color, setColor }: { color: string, setColor: (c: string)=>void }) {
  return (
    <div className="rbgcp-wrapper">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className={`w-6 h-6 rounded-sm border border-muted-foreground cursor-pointer`} style={{ background: color }}>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='p-2'
        >
          <Picker
            value={color}
            onChange={setColor}
            hideEyeDrop={true}
            hideAdvancedSliders={true}
            hideColorGuide={true}
            hideInputType={true}
            className="bg-transparent!"
         />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}