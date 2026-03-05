'use client';

import { Volume2 } from 'lucide-react';
import { useState } from 'react';

interface PronounceButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PronounceButton({ text, className = '', size = 'md' }: PronounceButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePronounce = () => {
    if (!text) return;

    // Cancel any existing speech
    window.speechSynthesis.cancel();

    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    // Speak
    window.speechSynthesis.speak(utterance);
  };

  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizeMap = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <button
      onClick={handlePronounce}
      disabled={isPlaying}
      className={`${sizeMap[size]} flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors disabled:opacity-50 ${className}`}
      aria-label={`Pronounce ${text}`}
      title={`Pronounce: ${text}`}
    >
      <Volume2 className={`${iconSizeMap[size]} ${isPlaying ? 'animate-pulse' : ''}`} />
    </button>
  );
}
