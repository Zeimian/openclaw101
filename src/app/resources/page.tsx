import { Metadata } from 'next';
import ResourcesPage from '@/components/ResourcesPage';

export const metadata: Metadata = {
  title: '资源聚合 - OpenClaw 宝珠落地',
  description: '一站式获取最佳 OpenClaw 教程，涵盖阿里百炼、腾讯云、飞书集成、技能市场等完整资源。',
  openGraph: {
    title: '资源聚合 - OpenClaw 宝珠落地',
    description: '一站式获取最佳 OpenClaw 教程',
    type: 'website',
    url: 'https://openclaw101.dev/resources',
    siteName: 'OpenClaw 宝珠落地',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '资源聚合 - OpenClaw 宝珠落地',
      },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '资源聚合 - OpenClaw 宝珠落地',
  url: 'https://openclaw101.dev/resources',
  description: '一站式获取最佳 OpenClaw 教程，涵盖阿里百炼、腾讯云、飞书集成、技能市场等完整资源。',
  inLanguage: 'zh-CN',
  isPartOf: {
    '@type': 'WebSite',
    name: 'OpenClaw 宝珠落地',
    url: 'https://openclaw101.dev',
  },
};

export default function ZhResourcesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResourcesPage />
    </main>
  );
}
