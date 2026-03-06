import Navbar from '@/components/home-page/Navbar';
import HeroSection from '@/components/home-page/HeroSection';
import FeaturesSection from '@/components/home-page/FeaturesSection';
import AboutSection from '@/components/home-page/AboutSection';
import Footer from '@/components/home-page/Footer';
import { BookOpen, FileText, Target } from 'lucide-react';
import type { Feature } from '@/types';

const features: Feature[] = [
  {
    title: 'Learn Vocabulary',
    description: 'Build a strong vocabulary foundation with curated word lists and contextual examples.',
    icon: BookOpen,
    available: true,
    href: '/vocabulary',
  },
  {
    title: 'Practice Vocabulary',
    description: 'Test your knowledge with interactive exercises and track your progress.',
    icon: Target,
    available: true,
    href: '/quiz',
  },
  {
    title: 'Editorial Analysis',
    description: 'Master comprehension and critical thinking with daily editorial breakdowns.',
    icon: FileText,
    available: false,
    href: '#',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection features={features} />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}