'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PronounceButton } from '@/components/PronounceButton';
import { ChevronLeft } from 'lucide-react';

interface Synonym {
  word: string;
  hindi: string;
  example: string;
}

interface Antonym {
  word: string;
  hindi: string;
  example: string;
}

interface WordDetail {
  id: string;
  word: string;
  hindi: string;
  pos: string;
  meaning: string;
  hindiMeaning: string;
  example: string;
  hindiExample: string;
  synonyms: Synonym[];
  antonyms: Antonym[];
}

interface RootWord {
  id: string;
  words: WordDetail[];
}

export default function WordDetailPage() {
  const params = useParams();
  const rootId = params.rootId as string;
  const wordId = params.wordId as string;
  const [word, setWord] = useState<WordDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/vocabulary.json');
        const data = await response.json();
        const root = data.rootWords.find((r: RootWord) => r.id === rootId);
        const foundWord = root?.words.find((w: WordDetail) => w.id === wordId);
        setWord(foundWord || null);
      } catch (error) {
        console.error('Error loading vocabulary data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [rootId, wordId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

  if (!word) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">Word not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href={`/root/${rootId}`}>
          <button className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ChevronLeft className="h-5 w-5" />
            Back to Words
          </button>
        </Link>

        {/* Main Word Section */}
        <div className="bg-white rounded-lg p-8 border border-gray-200 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{word.word}</h1>
              <p className="text-xl text-gray-600">{word.hindi}</p>
            </div>
            <div onClick={(e) => e.preventDefault()}>
              <PronounceButton text={word.word} size="lg" />
            </div>
          </div>

          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {word.pos}
            </span>
          </div>

          <div className="space-y-6">
            {/* Meaning */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Meaning</h3>
              <p className="text-gray-700 text-lg mb-2"><strong>English:</strong> {word.meaning}</p>
              <p className="text-gray-700 text-lg"><strong>Hindi:</strong> {word.hindiMeaning}</p>
            </div>

            {/* Example */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Example</h3>
              <p className="text-gray-700 mb-2 italic"><strong>English:</strong> "{word.example}"</p>
              <p className="text-gray-700 italic"><strong>Hindi:</strong> "{word.hindiExample}"</p>
            </div>
          </div>
        </div>

        {/* Synonyms Section */}
        {word.synonyms.length > 0 && (
          <div className="bg-white rounded-lg p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Synonyms</h2>
            <div className="space-y-6">
              {word.synonyms.map((synonym, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{synonym.word}</h4>
                    <div onClick={(e) => e.preventDefault()}>
                      <PronounceButton text={synonym.word} size="md" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{synonym.hindi}</p>
                  <p className="text-gray-700 italic">Example: "{synonym.example}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Antonyms Section */}
        {word.antonyms.length > 0 && (
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Antonyms</h2>
            <div className="space-y-6">
              {word.antonyms.map((antonym, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{antonym.word}</h4>
                    <div onClick={(e) => e.preventDefault()}>
                      <PronounceButton text={antonym.word} size="md" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{antonym.hindi}</p>
                  <p className="text-gray-700 italic">Example: "{antonym.example}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
