// hooks/useDebouncedValue.ts
import { debounce } from 'lodash-es';
import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const debounced = debounce((value: T) => {
      setDebouncedValue(value);
    }, delay);

    debounced(value);
    
    return () => {
      debounced.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}