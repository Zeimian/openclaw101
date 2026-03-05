'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DeployTutorialHome() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const days = [
    { day: 1, icon: '👋', title: '初识 OpenClaw', desc: '了解 AI 私人助理的真正含义，以及 OpenClaw 能为你做什么。' },
    { day: 2, icon: '💬', title: '深入对话', desc: '掌握与 AI 助理对话的技巧，让沟通更高效、更自然。' },
    { day: 3, icon: '📁', title: '文件与代码', desc: '让 AI 助理帮你处理文件、写代码、执行脚本。' },
    { day: 4, icon: '🌐', title: '网络能力', desc: '搜索、抓取、API 调用，让 AI 助理连接互联网。' },
    { day: 5, icon: '🧩', title: '技能扩展', desc: '安装社区技能，让 AI 助理学会更多能力。' },
    { day: 6, icon: '⏰', title: '自动化', desc: '定时任务、心跳检测、主动推送，让 AI 助理自主工作。' },
    { day: 7, icon: '🚀', title: '高级技巧', desc: '多 Agent、浏览器控制、设备联动，解锁全部潜力。' },
  ];

  const dayColors = [
    { gradient: 'from-day-1 to-pink-400', ring: 'hover:ring-2 hover:ring-day-1/30' },
    { gradient: 'from-day-2 to-blue-400', ring: 'hover:ring-2 hover:ring-day-2/30' },
    { gradient: 'from-day-3 to-green-400', ring: 'hover:ring-2 hover:ring-day-3/30' },
    { gradient: 'from-day-4 to-amber-400', ring: 'hover:ring-2 hover:ring-day-4/30' },
    { gradient: 'from-day-5 to-purple-400', ring: 'hover:ring-2 hover:ring-day-5/30' },
    { gradient: 'from-day-6 to-cyan-400', ring: 'hover:ring-2 hover:ring-day-6/30' },
    { gradient: 'from-day-7 to-yellow-400', ring: 'hover:ring-2 hover:ring-day-7/30' },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0d1117' }}>
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0d1117' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{ backgroundColor: 'rgba(13,17,23,0.85)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>返回首页</span>
          </Link>
          <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>🐾 OpenClaw 宝珠</span>
        </div>
      </header>

      {/* Hero */}
      <div className="hero-glow-vivid relative overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full blur-3xl animate-float opacity-40"
          style={{ background: 'rgba(255,107,157,0.2)' }} />
        <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full blur-3xl animate-float opacity-30"
          style={{ background: 'rgba(0,102,255,0.15)', animationDelay: '2s' }} />
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            7 天<span className="gradient-text-vivid">学习路径</span>
          </h1>
          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            从入门到进阶，每天一个主题，循序渐进掌握 OpenClaw 的全部能力。
          </p>
        </div>
      </div>

      {/* Day cards */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {days.map((d) => {
            const c = dayColors[d.day - 1];
            return (
              <Link key={d.day} href={`/day/${d.day}`}
                className={`group block rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 ${c.ring}`}
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`bg-gradient-to-br ${c.gradient} text-white rounded-lg w-10 h-10 flex items-center justify-center text-lg font-bold shrink-0`}>
                    {d.day}
                  </div>
                  <div>
                    <span className="text-xl mr-2">{d.icon}</span>
                    <span className="text-base font-bold text-white">{d.title}</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{d.desc}</p>
                <span className={`text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity`}
                  style={{ color: 'rgba(255,255,255,0.7)' }}>
                  开始学习 →
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="hero-glow py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <Link href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>OpenClaw 宝珠</Link>
        </div>
      </footer>
    </div>
  );
}