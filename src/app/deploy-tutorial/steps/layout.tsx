import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenClaw Deployment Tutorial Steps',
  description: 'Detailed steps for deploying OpenClaw. Learn how to set up, configure, and run OpenClaw in production.',
  alternates: {
    canonical: 'https://openclaw101.dev/deploy-tutorial/steps',
  },
};

export default function DeployTutorialStepsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}