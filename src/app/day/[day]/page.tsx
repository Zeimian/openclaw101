import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import DayContent from '@/components/DayContent';

interface Props {
  params: Promise<{ day: string }>;
}

export async function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7].map((day) => ({
    day: day.toString(),
  }));
}

export default async function DayPage({ params }: Props) {
  const { day } = await params;
  const dayNum = parseInt(day, 10);
  
  if (isNaN(dayNum) || dayNum < 1 || dayNum > 7) {
    notFound();
  }

  try {
    const filePath = path.join(process.cwd(), 'content/days', `day${dayNum}.md`);
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Parse frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) {
      notFound();
    }
    
    const frontmatterStr = frontmatterMatch[1];
    const markdownContent = frontmatterMatch[2];
    
    // Simple frontmatter parsing
    const titleMatch = frontmatterStr.match(/title:\s*(.+)/);
    const descMatch = frontmatterStr.match(/description:\s*(.+)/);
    
    const frontmatter = {
      title: titleMatch ? titleMatch[1].trim() : `第 ${dayNum} 天`,
      description: descMatch ? descMatch[1].trim() : '',
    };

    return (
      <DayContent
        day={dayNum}
        content={markdownContent}
        frontmatter={frontmatter}
        prevDay={dayNum > 1 ? dayNum - 1 : null}
        nextDay={dayNum < 7 ? dayNum + 1 : null}
      />
    );
  } catch (error) {
    console.error('Error reading day file:', error);
    notFound();
  }
}
