'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { WordCard } from '@/components/WordCard';
import { useRootWordTracking } from '@/hooks/useRootWordTracking';
import { useVocabularyData, RootWord } from '@/hooks/useVocabularyData';
import { ChevronLeft } from 'lucide-react';

export default function RootWordsPage() {
  const params = useParams();
  const rootId = params.rootId as string;
  const { markAsVisited, loaded } = useRootWordTracking();
  const { data, loading } = useVocabularyData();

  const rootWord = data?.rootWords.find((r: RootWord) => r.id === rootId) || null;

  // Auto-mark as visited when the page loads and tracking is ready
  useEffect(() => {
    if (loaded && rootId) {
      markAsVisited(rootId);
    }
  }, [loaded, rootId, markAsVisited]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

  if (!rootWord) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">Root word not found</p>
          <Link href="/vocabulary">
            <button className="mt-4 text-blue-600 hover:text-blue-700">
              Back to Root Words
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/vocabulary">
          <button className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ChevronLeft className="h-5 w-5" />
            Back to Root Words
          </button>
        </Link>

        <div className={`${rootWord.color} rounded-lg p-6 mb-8 border border-gray-200`}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{rootWord.root}</h1>
          <p className="text-gray-700 text-lg">{rootWord.meaning}</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Vocabulary Words ({rootWord.words.length})
        </h2>

        <div className="space-y-4">
          {rootWord.words.map((word) => (
            <WordCard
              key={word.id}
              rootId={rootId}
              wordId={word.id}
              word={word.word}
              hindi={word.hindi}
              pos={word.pos}
              meaning={word.meaning}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
