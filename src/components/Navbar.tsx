'use client';

import { useState, useEffect } from 'react';

export default function Navbar({ locale = 'zh' }: { locale?: 'en' | 'zh' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isZh = locale === 'zh';

  const links = [
    { label: isZh ? '什么是 OpenClaw' : 'What is OpenClaw', href: '#what-is' },
    { label: isZh ? '技能生态' : 'Skills', href: '#skills' },
    { label: isZh ? '资源聚合' : 'Resources', href: '#resources' },
    { label: isZh ? '社区与贡献' : 'Community', href: '#community' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md py-3'
          : 'py-4 sm:py-5'
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.9)' : 'transparent',
        paddingTop: scrolled ? 'calc(env(safe-area-inset-top) + 0.75rem)' : 'calc(env(safe-area-inset-top) + 1rem)',
        borderBottom: scrolled ? 'none' : 'none',
      }}
    >
      {/* Gradient bottom line when scrolled */}
      {scrolled && <div className="absolute bottom-0 left-0 right-0 divider-gradient" />}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="font-bold text-base sm:text-lg whitespace-nowrap" style={{ color: '#fff' }}>
          🐾 <span className="gradient-text-vivid">OpenClaw</span> 101
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm transition-colors duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resources"
            className="text-sm transition-colors duration-200 font-medium"
            style={{ color: '#10B981' }}
          >
            {isZh ? '全部资源' : 'Resources'}
          </a>
          <a
            href="/deploy-tutorial"
            className="text-sm transition-colors duration-200 font-medium"
            style={{ color: '#3b82f6' }}
          >
            {isZh ? '部署教程' : 'Deploy Guide'}
          </a>
          
          <a
            href="https://github.com/Zeimian/openclaw101"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 bg-white/10 hover:bg-gradient-to-r hover:from-primary/20 hover:to-tech/20 rounded-lg transition-all duration-200"
            style={{ color: '#fff' }}
          >
            ⭐ GitHub
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden hover:text-white transition-colors"
          style={{ color: 'rgba(255,255,255,0.6)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden backdrop-blur-md border-t border-white/10 px-4 py-4" style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)' }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 transition-colors duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resources"
            onClick={() => setMobileOpen(false)}
            className="block py-3 transition-colors duration-200 hover:text-white font-medium"
            style={{ color: '#10B981' }}
          >
            {isZh ? '全部资源 →' : 'Resources →'}
          </a>
          <a
            href="/deploy-tutorial"
            onClick={() => setMobileOpen(false)}
            className="block py-3 transition-colors duration-200 hover:text-white font-medium"
            style={{ color: '#3b82f6' }}
          >
            {isZh ? '部署教程 →' : 'Deploy Guide →'}
          </a>
          
          <a
            href="https://github.com/Zeimian/openclaw101"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-3 transition-colors duration-200 hover:text-white"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            ⭐ GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
