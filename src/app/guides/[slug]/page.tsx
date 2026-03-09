import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import GuideContent from '@/components/GuideContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'windows-deployment' },
    { slug: 'macos-deployment' },
    { slug: 'wecom-integration' },
  ];
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  
  // Validate slug
  const validSlugs = ['windows-deployment', 'macos-deployment'];
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  try {
    const filePath = path.join(process.cwd(), 'content/guides', `${slug}.mdx`);
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
      title: titleMatch ? titleMatch[1].trim().replace(/"/g, '') : '部署指南',
      description: descMatch ? descMatch[1].trim().replace(/"/g, '') : '',
    };

    return (
      <GuideContent
        slug={slug}
        content={markdownContent}
        frontmatter={frontmatter}
      />
    );
  } catch (error) {
    console.error('Error reading guide file:', error);
    notFound();
  }
}
