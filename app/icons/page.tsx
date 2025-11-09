'use client';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import iconsIndex from '@/utils/icons-index.json';
import IconCard from '../components/IconCard';
import { Input } from '@/components/ui/input';
import debounce from 'lodash-es/debounce';
import Fuse from 'fuse.js';
import { Spinner } from '@/components/ui/spinner';
import NotFound from '../components/NotFound';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

export default function IconsPage() {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedCount, setDisplayedCount] = useState(300);
  

  const fuse = useMemo(() => {
    return new Fuse(iconsIndex, {
      keys: ['name'],
      threshold: 0.3,
      ignoreLocation: true
    })
  }, [])
  // Debounced search
  const debouncedSearch = useRef(
    debounce((value: string) => {
      setSearchTerm(value);
      setDisplayedCount(250);
    }, 200)
  ).current

  // Filter icons
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return iconsIndex;
    return fuse.search(searchTerm).map(result => result.item);
  }, [searchTerm, fuse])

  // Get displayed icons
  const displayedIcons = useMemo(() => {
    return filteredIcons.slice(0, displayedCount);
  }, [filteredIcons, displayedCount]);

  const hasMore = displayedCount < filteredIcons.length;

  const { ref, inView } = useInView({
    threshold: 0.2,
  })

  // Load more when the last item comes into view
  useEffect(() => {
    if (inView && hasMore) {
      setDisplayedCount(prev => prev + 70);
    }
  }, [inView, hasMore])

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  }, [debouncedSearch])

  // Cleanup debounced function
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeInOut'}}
      className='p-4 max-w-7xl mx-auto flex flex-col h-full'>

      <div className='font-bold text-2xl mb-2'>
        Browse thousands of icons
      </div>
      <div className='text-base text-muted-foreground mb-4'>
        Search for an icon and click on it to customize and export it.
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder='Search for an icon'
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="pl-9" // Add left padding to make room for icon
        />
      </div>
      
      {
        displayedIcons.length > 0 ? <div className='grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-[8px] mt-4'>
          {displayedIcons.map((icon, index) => (
            <div
              key={icon.id}
              ref={index === displayedIcons.length - 1 ? ref : null}
            >
              <IconCard icon={icon} />
            </div>
          ))
          }
        </div>
        :
        <div className='flex-1 h-full flex items-center justify-center'>
           <NotFound showGoBackButton={false} />
        </div>
       
      }

      {hasMore && (
        <div ref={ref} className="flex justify-center items-center py-4">
          <Spinner/>
        </div>
      )}
    </motion.div>
  );
}