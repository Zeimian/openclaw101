'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Props {
  day: number;
  content: string;
  frontmatter: {
    title: string;
    description: string;
  };
  prevDay: number | null;
  nextDay: number | null;
}

const dayColors: Record<number, { gradient: string; badge: string }> = {
  1: { gradient: 'from-day-1 to-pink-400', badge: 'bg-day-1' },
  2: { gradient: 'from-day-2 to-blue-400', badge: 'bg-day-2' },
  3: { gradient: 'from-day-3 to-green-400', badge: 'bg-day-3' },
  4: { gradient: 'from-day-4 to-amber-400', badge: 'bg-day-4' },
  5: { gradient: 'from-day-5 to-purple-400', badge: 'bg-day-5' },
  6: { gradient: 'from-day-6 to-cyan-400', badge: 'bg-day-6' },
  7: { gradient: 'from-day-7 to-yellow-400', badge: 'bg-day-7' },
};

export default function DayContent({ day, content, frontmatter, prevDay, nextDay }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const titles: Record<number, string> = {
    1: '初识 OpenClaw', 2: '深入对话', 3: '文件与代码',
    4: '网络能力', 5: '技能扩展', 6: '自动化', 7: '高级技巧',
  };

  const readingTime = Math.max(1, Math.ceil(content.length / 400));
  const colors = dayColors[day] || dayColors[1];

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: '#0d1117' }}>

      {/* Sticky header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{ backgroundColor: 'rgba(13,17,23,0.85)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-colors text-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hover:text-white">返回首页</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>约 {readingTime} 分钟</span>
            <span className={`text-xs font-bold text-white ${colors.badge} px-2 py-0.5 rounded-full`}>
              DAY {day}
            </span>
          </div>
        </div>
        <div className="h-0.5" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
          <div className={`h-full bg-gradient-to-r ${colors.gradient} transition-all duration-500`}
            style={{ width: `${(day / 7) * 100}%` }} />
        </div>
      </header>

      {/* Hero */}
      <div className="hero-glow-vivid relative overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full blur-3xl animate-float opacity-40"
          style={{ background: 'rgba(255,107,157,0.2)' }} />
        <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full blur-3xl animate-float opacity-30"
          style={{ background: 'rgba(0,102,255,0.15)', animationDelay: '2s' }} />
        <div className="relative max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-5">
            <span className="text-sm">📅</span>
            <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
              第 {day} 天 · 共 7 天
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {titles[day] || frontmatter.title}
          </h1>
          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {frontmatter.description}
          </p>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl sm:text-3xl font-bold text-white mt-14 mb-5">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-12 mb-5 pb-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg sm:text-xl font-semibold mt-10 mb-3"
                  style={{ color: 'rgba(255,255,255,0.9)' }}>{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-base sm:text-lg font-semibold mt-8 mb-3"
                  style={{ color: 'rgba(255,255,255,0.85)' }}>{children}</h4>
              ),
              p: ({ children }) => (
                <p className="text-[15px] sm:text-base leading-[1.9] mb-5"
                  style={{ color: 'rgba(255,255,255,0.65)' }}>{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold" style={{ color: 'rgba(255,255,255,0.95)' }}>{children}</strong>
              ),
              em: ({ children }) => (
                <em className="not-italic" style={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px dashed rgba(255,255,255,0.2)' }}>{children}</em>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="my-4 ml-5 space-y-2.5 text-[15px] sm:text-base list-disc" style={{ color: 'rgba(255,255,255,0.65)' }}>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-4 ml-5 space-y-2.5 text-[15px] sm:text-base list-decimal" style={{ color: 'rgba(255,255,255,0.65)' }}>{children}</ol>
              ),
              li: ({ children }) => (
                <li className="leading-[1.9] pl-1" style={{ color: 'rgba(255,255,255,0.65)' }}>{children}</li>
              ),
              code: ({ className, children }) => {
                const isBlock = className?.includes('language-');
                if (isBlock) {
                  return <code className={`${className} block font-mono text-sm leading-relaxed`}
                    style={{ color: 'rgba(255,255,255,0.85)' }}>{children}</code>;
                }
                return (
                  <code className="px-1.5 py-0.5 rounded text-sm font-mono"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#7ee787', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="rounded-xl p-5 overflow-x-auto my-6 text-sm"
                  style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="pl-5 pr-5 py-4 my-6 rounded-r-xl [&>p]:mb-1 [&>p]:text-[14px] [&>p]:leading-[1.8]"
                  style={{ borderLeft: '3px solid rgba(96,165,250,0.5)', backgroundColor: 'rgba(96,165,250,0.06)', color: 'rgba(255,255,255,0.7)' }}>
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-6 rounded-xl"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <table className="w-full border-collapse text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>{children}</thead>
              ),
              tbody: ({ children }) => (
                <tbody>{children}</tbody>
              ),
              tr: ({ children }) => (
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{children}</tr>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.6)' }}>{children}</td>
              ),
              hr: () => (
                <div className="my-10 flex items-center justify-center">
                  <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)' }} />
                </div>
              ),
              img: ({ src, alt }) => {
                if (src?.startsWith('FEISHU_IMAGE:')) {
                  return (
                    <span className="block my-6 p-4 rounded-xl text-center"
                      style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}>📷 {alt || 'Image'}</span>
                    </span>
                  );
                }
                return (
                  <span className="block my-8">
                    <img src={src} alt={alt} className="rounded-xl max-w-full"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }} />
                    {alt && <span className="block text-center text-xs mt-2"
                      style={{ color: 'rgba(255,255,255,0.3)' }}>{alt}</span>}
                  </span>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Navigation */}
      <nav style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            {prevDay ? (
              <Link href={`/day/${prevDay}`}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-colors text-sm sm:text-base"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>上一天：{titles[prevDay]}</span>
              </Link>
            ) : <div className="hidden sm:block" />}

            {nextDay ? (
              <Link href={`/day/${nextDay}`}
                className={`flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r ${colors.gradient} text-white font-medium rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base`}>
                <span>下一天：{titles[nextDay]}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <Link href="/"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base">
                🎉 完成！返回首页
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <footer className="hero-glow py-6">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Made with 🐈‍⬛ by <a href="https://xiaomo.dev" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>小墨</a> · <a
            href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>OpenClaw 101</a>
        </div>
      </footer>
    </div>
  );
}