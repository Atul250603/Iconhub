
import path from 'path';
import fs from 'fs';
import IconCanvas from '@/app/components/IconCanvas';
import { handleError } from '@/utils/logs/error';
import { redirect } from 'next/navigation';
import { getIconById } from '@/utils/icon-lookup';
import iconsIndex from '@/utils/icons-index.json';

// Generate static params for all icons to pre-render the pages
export async function generateStaticParams() {
  const PRE_GENERATE_COUNT = 1000;
  return iconsIndex.slice(0, PRE_GENERATE_COUNT).map((icon) => ({
    id: icon.id
  }));
}

export const dynamicParams = true; // generate the pages on demand for those that are not pre-rendered (i.e after the first 1000 icons)
export const revalidate = false; // cache until we deploy the new version, its stored in the full route cache in next.js and it gets invalidated when we deploy the new version

export default async function IconPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const icon = getIconById(id);
  if (!icon) redirect('/not-found');

  const svgPath = path.join(process.cwd(), 'public', icon.path);
  let svgContent = '';
  try {
    svgContent = fs.readFileSync(svgPath, 'utf8');
  } catch (err) {
    handleError<undefined>(`Failed to read SVG file: ${err instanceof Error ? err.message : String(err)}`, undefined);
    redirect('/not-found');
  }

  return <div className='h-full'>
      <IconCanvas svgContent={svgContent} icon={icon.name} />
  </div>;
}
