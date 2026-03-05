import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenClaw Deployment Tutorial - Step-by-Step Guide',
  description: 'Complete step-by-step guide to deploy your own OpenClaw instance. Learn how to set up, configure, and run OpenClaw in production.',
  alternates: {
    canonical: 'https://openclaw101.dev/deploy-tutorial',
  },
  openGraph: {
    title: 'OpenClaw Deployment Tutorial - Step-by-Step Guide',
    description: 'Complete step-by-step guide to deploy your own OpenClaw instance',
    type: 'website',
    url: 'https://openclaw101.dev/deploy-tutorial',
    siteName: 'OpenClaw 101',
    images: [
      {
        url: '/og-image-deploy-tutorial.png',
        width: 1200,
        height: 630,
        alt: 'OpenClaw Deployment Tutorial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenClaw Deployment Tutorial - Step-by-Step Guide',
    description: 'Complete step-by-step guide to deploy your own OpenClaw instance',
    images: ['/og-image-deploy-tutorial.png'],
  },
};

export default function DeployTutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}