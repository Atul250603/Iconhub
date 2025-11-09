import iconIndex from './icons-index.json';
import type { IconElement } from '@/types';

const iconsMap = new Map<string, IconElement>();

iconIndex.forEach((icon) => {
  iconsMap.set(icon.id, icon);
});

export const getIconById = (id: string) => {
  return iconsMap.get(id);
};