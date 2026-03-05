'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RootWordCard } from '@/components/RootWordCard';
import { useRootWordTracking, RootWordStatus } from '@/hooks/useRootWordTracking';
import { useVocabularyData } from '@/hooks/useVocabularyData';
import { ChevronLeft } from 'lucide-react';

type StatusFilter = 'all' | 'not-visited' | 'visited' | 'for-revision';

export default function VocabularyPage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const { getStatus, toggleForRevision, loaded } = useRootWordTracking();
  const { data, loading } = useVocabularyData();
  
  const rootWords = data?.rootWords || [];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  let filteredRootWords = selectedLetter
    ? rootWords.filter((word) => word.root.toUpperCase().startsWith(selectedLetter))
    : rootWords;

  // Apply status filter
  if (selectedStatus !== 'all') {
    filteredRootWords = filteredRootWords.filter((word) => {
      const status = getStatus(word.id);
      return selectedStatus === status;
    });
  }

  if (loading || !loaded) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

  const statusStats = {
    'not-visited': rootWords.filter((w) => getStatus(w.id) === 'not-visited').length,
    visited: rootWords.filter((w) => getStatus(w.id) === 'visited').length,
    'for-revision': rootWords.filter((w) => getStatus(w.id) === 'for-revision').length,
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/">
          <button className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ChevronLeft className="h-5 w-5" />
            Back to Home
          </button>
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Root Words</h1>
        <p className="text-gray-600 mb-8">
          Click on any root word to see all vocabulary words derived from it.
        </p>

        {/* Status Filter */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedStatus === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
            }`}
          >
            All ({rootWords.length})
          </button>
          <button
            onClick={() => setSelectedStatus('not-visited')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedStatus === 'not-visited'
                ? 'bg-gray-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
            }`}
          >
            <span className="inline-flex items-center justify-center w-4 h-4 bg-gray-300 rounded-full text-xs">○</span>
            Not Visited ({statusStats['not-visited']})
          </button>
          <button
            onClick={() => setSelectedStatus('visited')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedStatus === 'visited'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
            }`}
          >
            <span className="inline-flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full text-xs text-white">✓</span>
            Visited ({statusStats.visited})
          </button>
          <button
            onClick={() => setSelectedStatus('for-revision')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedStatus === 'for-revision'
                ? 'bg-yellow-500 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-yellow-400'
            }`}
          >
            <span className="text-lg">★</span>
            For Revision ({statusStats['for-revision']})
          </button>
        </div>

        {/* Alphabet Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`w-10 h-10 rounded-full font-semibold text-sm transition-all ${
                selectedLetter === null
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
              }`}
            >
              All
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-10 h-10 rounded-full font-semibold text-sm transition-all ${
                  selectedLetter === letter
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRootWords.length > 0 ? (
            filteredRootWords.map((rootWord) => (
              <RootWordCard
                key={rootWord.id}
                id={rootWord.id}
                root={rootWord.root}
                meaning={rootWord.meaning}
                color={rootWord.color}
                wordCount={rootWord.words.length}
                status={getStatus(rootWord.id) as RootWordStatus}
                onToggleRevision={(e) => {
                  e.preventDefault();
                  toggleForRevision(rootWord.id);
                }}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No root words found for the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
