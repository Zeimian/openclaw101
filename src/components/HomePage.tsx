'use client';

import { Locale, getDictionary } from '@/lib/i18n';
import Navbar from './Navbar';
import Hero from './Hero';
import WhatIs from './WhatIs';
import LearningPath from './LearningPath';
import Skills from './Skills';
import ResourcesSection from './ResourcesSection';
import Community from './Community';
import Footer from './Footer';


interface HomePageProps {
  locale: Locale;
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhatIs />
      <LearningPath />
      <Skills />
      <ResourcesSection />
      <Community />
      <Footer />
    </main>
  );
}
