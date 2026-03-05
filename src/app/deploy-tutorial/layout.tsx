import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenClaw 宝珠 - 7 天学习路径',
  description: '从入门到进阶，每天一个主题，循序渐进掌握 OpenClaw 的全部能力。',
  alternates: {
    canonical: 'https://openclaw101.dev/deploy-tutorial',
  },
};

export default function DeployTutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
