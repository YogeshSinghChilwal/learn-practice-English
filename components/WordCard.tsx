'use client';

import Link from 'next/link';
import { PronounceButton } from './PronounceButton';

interface WordCardProps {
  rootId: string;
  wordId: string;
  word: string;
  hindi: string;
  pos: string;
  meaning: string;
}

export function WordCard({ rootId, wordId, word, hindi, pos, meaning }: WordCardProps) {
  return (
    <Link href={`/root/${rootId}/word/${wordId}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md hover:border-blue-300">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900">{word}</h4>
            <p className="text-sm text-gray-600">{hindi}</p>
          </div>
          <div onClick={(e) => e.preventDefault()}>
            <PronounceButton text={word} size="md" />
          </div>
        </div>
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
            {pos}
          </span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">{meaning}</p>
      </div>
    </Link>
  );
}
