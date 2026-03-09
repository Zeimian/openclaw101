'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Props {
  slug: string;
  content: string;
  frontmatter: {
    title: string;
    description: string;
  };
}

const guideTitles: Record<string, { title: string; icon: string }> = {
  'windows-deployment': { title: 'Windows 部署指南', icon: '🪟' },
  'macos-deployment': { title: 'macOS 部署指南', icon: '🍎' },
};

export default function GuideContent({ slug, content, frontmatter }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const guideInfo = guideTitles[slug] || { title: '部署指南', icon: '📚' };
  const readingTime = Math.max(1, Math.ceil(content.length / 400));

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: '#0d1117' }}>

      {/* Sticky header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{ backgroundColor: 'rgba(13,17,23,0.85)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/zh/day/2" className="flex items-center gap-2 transition-colors text-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hover:text-white">返回 Day2</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>约 {readingTime} 分钟</span>
            <span className="text-xs font-bold text-white bg-blue-500/20 px-2 py-0.5 rounded-full">
              指南
            </span>
          </div>
        </div>
        <div className="h-0.5" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
            style={{ width: '100%' }} />
        </div>
      </header>

      {/* Hero */}
      <div className="hero-glow-vivid relative overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full blur-3xl animate-float opacity-40"
          style={{ background: 'rgba(0,102,255,0.2)' }} />
        <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full blur-3xl animate-float opacity-30"
          style={{ background: 'rgba(76,209,220,0.15)', animationDelay: '2s' }} />
        <div className="relative max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-5">
            <span className="text-sm">{guideInfo.icon}</span>
            <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {guideInfo.title}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight" style={{ color: '#ffffff' }}>
            {frontmatter.title.replace(/"/g, '')}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)' }}>
            {frontmatter.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="relative max-w-4xl mx-auto px-4 pb-20 -mt-8">
        <div className="rounded-2xl border p-6 sm:p-10"
          style={{
            backgroundColor: 'rgba(22,27,34,0.6)',
            borderColor: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)'
          }}>
          <article className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold mb-6 mt-8" style={{ color: '#ffffff' }} {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold mb-4 mt-8 pb-2 border-b"
                    style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.06)' }} {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-semibold mb-3 mt-6"
                    style={{ color: 'rgba(255,255,255,0.9)' }} {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }} {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a className="transition-colors hover:underline"
                    style={{ color: '#6699ff' }} {...props} />
                ),
                code: ({ node, inline, ...props }: any) => (
                  inline ? (
                    <code className="px-1.5 py-0.5 rounded text-sm"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#6699ff' }} {...props} />
                  ) : (
                    <code className="block p-4 rounded-lg overflow-x-auto text-sm"
                      style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: '#e0e0e0' }} {...props} />
                  )
                ),
                pre: ({ node, ...props }) => (
                  <pre className="mb-4 rounded-lg overflow-x-auto"
                    style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-outside ml-6 mb-4" style={{ color: 'rgba(255,255,255,0.7)' }} {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-outside ml-6 mb-4" style={{ color: 'rgba(255,255,255,0.7)' }} {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="mb-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }} {...props} />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full text-left border-collapse" {...props} />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th className="px-4 py-3 font-semibold border-b"
                    style={{
                      color: 'rgba(255,255,255,0.9)',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.06)'
                    }} {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-4 py-3 border-b"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      borderColor: 'rgba(255,255,255,0.04)'
                    }} {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 pl-4 my-6 italic"
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      borderColor: 'rgba(102,153,255,0.4)',
                      backgroundColor: 'rgba(102,153,255,0.05)'
                    }} {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>

        {/* Back to Day2 */}
        <div className="mt-10 text-center">
          <Link href="/zh/day/2"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-all hover:scale-105"
            style={{
              color: '#ffffff',
              borderColor: 'rgba(102,153,255,0.4)',
              backgroundColor: 'rgba(102,153,255,0.1)'
            }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>返回 Day2 继续学习</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
