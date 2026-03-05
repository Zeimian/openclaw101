'use client';

import { useEffect, useRef } from 'react';

const itemsZh = [
  {
    icon: '📖',
    title: '官方文档',
    desc: '完整的 API 参考和使用指南',
    link: 'https://docs.openclaw.ai',
    color: 'hover:border-blue-300 hover:bg-blue-50',
  },
  {
    icon: '💬',
    title: 'Discord 社区',
    desc: '与数万开发者和用户交流',
    link: 'https://discord.com/invite/clawd',
    color: 'hover:border-indigo-300 hover:bg-indigo-50',
  },
  {
    icon: '🛒',
    title: '技能市场',
    desc: '发现、安装和分享 AI 技能',
    link: 'https://clawhub.com',
    color: 'hover:border-green-300 hover:bg-green-50',
  },
  {
    icon: '📦',
    title: 'OpenClaw GitHub',
    desc: '源代码 (145k+ ⭐) 和社区贡献',
    link: 'https://github.com/openclaw/openclaw',
    color: 'hover:border-gray-400 hover:bg-gray-50',
  },
  {
    icon: '📝',
    title: '飞书知识库',
    desc: '7 天入门指南 · 中文图文教程',
    link: 'https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf',
    color: 'hover:border-blue-300 hover:bg-blue-50',
  },
  {
    icon: '⭐',
    title: 'OpenClaw 宝珠 GitHub',
    desc: '本站源码，欢迎 Star 和 PR',
    link: 'https://github.com/Zeimian/openclaw101',
    color: 'hover:border-yellow-300 hover:bg-yellow-50',
  },
];

const itemsEn = [
  {
    icon: '📖',
    title: 'Official Docs',
    desc: 'Complete API reference and usage guides',
    link: 'https://docs.openclaw.ai',
    color: 'hover:border-blue-300 hover:bg-blue-50',
  },
  {
    icon: '💬',
    title: 'Discord Community',
    desc: 'Chat with thousands of developers and users',
    link: 'https://discord.com/invite/clawd',
    color: 'hover:border-indigo-300 hover:bg-indigo-50',
  },
  {
    icon: '🛒',
    title: 'Skill Marketplace',
    desc: 'Discover, install, and share AI skills',
    link: 'https://clawhub.com',
    color: 'hover:border-green-300 hover:bg-green-50',
  },
  {
    icon: '📦',
    title: 'OpenClaw GitHub',
    desc: 'Source code (145k+ ⭐) and community contributions',
    link: 'https://github.com/openclaw/openclaw',
    color: 'hover:border-gray-400 hover:bg-gray-50',
  },
  {
    icon: '📝',
    title: 'Feishu Wiki',
    desc: '7-Day guide · Chinese tutorials',
    link: 'https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf',
    color: 'hover:border-blue-300 hover:bg-blue-50',
  },
  {
    icon: '⭐',
    title: 'OpenClaw 宝珠 GitHub',
    desc: 'This site\'s source code. Star and PRs welcome!',
    link: 'https://github.com/Zeimian/openclaw101',
    color: 'hover:border-yellow-300 hover:bg-yellow-50',
  },
];

export default function Community({ locale = 'zh' }: { locale?: 'en' | 'zh' }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isZh = locale === 'zh';
  const items = isZh ? itemsZh : itemsEn;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="community" ref={sectionRef} className="py-12 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-8 sm:mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            🤝 {isZh ? '开源共建' : 'Open Source'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isZh ? '社区与贡献' : 'Community & Contribute'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isZh ? (
              <>OpenClaw 宝珠是开源项目，致力于做最好的中文 OpenClaw 资源聚合站。<br />欢迎补充资源、改进内容、分享经验。</>
            ) : (
              <>OpenClaw 宝珠 is open source, aiming to be the best resource hub for OpenClaw.<br />Contributions welcome — add resources, improve content, share your experience.</>
            )}
          </p>
        </div>

        {/* cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((r, i) => (
            <a
              key={i}
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal card-hover group block bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all duration-300 ${r.color}`}
              style={{ transitionDelay: `${(i + 1) * 80}ms` }}
            >
              <div className="text-3xl mb-3">{r.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {r.title}
              </h3>
              <p className="text-sm text-gray-500">{r.desc}</p>
              <div className="mt-4 text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isZh ? '访问 ↗' : 'Visit ↗'}
              </div>
            </a>
          ))}
        </div>

        {/* Contribute banner */}
        <div className="reveal bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#fff' }}>
            {isZh ? '🌟 一起让 OpenClaw 宝珠变得更好' : '🌟 Help Make OpenClaw 宝珠 Better'}
          </h3>
          <p className="mb-6 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {isZh ? (
              <>发现了好教程？写了使用心得？做了有趣的技能？<br />提一个 PR，你的贡献将帮助更多人。</>
            ) : (
              <>Found a great tutorial? Wrote a guide? Built an interesting skill?<br />Submit a PR — your contribution will help others.</>
            )}
          </p>
          <a
            href="https://github.com/Zeimian/openclaw101"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Star & Fork on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
