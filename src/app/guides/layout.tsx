import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenClaw 部署指南 — Windows/macOS 完整教程 | OpenClaw 101',
  description:
    'OpenClaw 完整部署指南，涵盖 Windows 和 macOS 系统，包含详细步骤、常见问题和一键安装脚本。',
  alternates: {
    canonical: 'https://openclaw101.dev/guides',
  },
  openGraph: {
    title: 'OpenClaw 部署指南 — Windows/macOS 完整教程 | OpenClaw 101',
    description:
      'OpenClaw 完整部署指南，涵盖 Windows 和 macOS 系统，包含详细步骤、常见问题和一键安装脚本。',
    type: 'website',
    url: 'https://openclaw101.dev/guides',
    siteName: 'OpenClaw 101',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OpenClaw 部署指南',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenClaw 部署指南 — Windows/macOS 完整教程 | OpenClaw 101',
    description:
      'OpenClaw 完整部署指南，涵盖 Windows 和 macOS 系统，包含详细步骤、常见问题和一键安装脚本。',
    images: ['/og-image.png'],
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
