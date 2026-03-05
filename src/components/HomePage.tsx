'use client';

import Navbar from './Navbar';
import Hero from './Hero';
import WhatIs from './WhatIs';
import LearningPath from './LearningPath';
import Skills from './Skills';
import ResourcesSection from './ResourcesSection';
import Community from './Community';
import Footer from './Footer';

export default function HomePage({ locale = 'zh' }: { locale?: 'en' | 'zh' }) {
  return (
    <main>
      <Navbar locale={locale} />
      <Hero locale={locale} />
      <WhatIs locale={locale} />
      <LearningPath locale={locale} />
      <Skills locale={locale} />
      <ResourcesSection locale={locale} />
      <Community locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
