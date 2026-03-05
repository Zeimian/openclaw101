import { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'OpenClaw 宝珠落地 - 7 天掌握你的 AI 私人助理',
  description: 'OpenClaw 宝珠奶酪落地实战教程，7 天搭建你的 AI 私人助理，飞书集成，阿里百炼 API，完整技能生态。',
  openGraph: {
    title: 'OpenClaw 宝珠落地 - 7 天掌握你的 AI 私人助理',
    description: 'OpenClaw 宝珠奶酪落地实战教程',
    type: 'website',
    url: 'https://openclaw101.dev',
    siteName: 'OpenClaw 宝珠落地',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OpenClaw 宝珠落地',
      },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'OpenClaw 宝珠落地',
  url: 'https://openclaw101.dev',
  description: '7 天掌握你的 AI 私人助理',
  inLanguage: 'zh-CN',
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </main>
  );
}
