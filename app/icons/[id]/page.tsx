
import path from 'path';
import fs from 'fs';
import IconCanvas from '@/app/components/IconCanvas';
import { handleError } from '@/utils/logs/error';
import { redirect } from 'next/navigation';
import { getIconById } from '@/utils/icon-lookup';


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
