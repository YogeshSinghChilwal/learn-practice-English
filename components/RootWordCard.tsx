'use client';

import Link from 'next/link';
import { RootWordStatus } from '@/hooks/useRootWordTracking';

interface RootWordCardProps {
  id: string;
  root: string;
  meaning: string;
  color: string;
  wordCount: number;
  status: RootWordStatus;
  onToggleRevision: (e: React.MouseEvent) => void;
}

export function RootWordCard({
  id,
  root,
  meaning,
  color,
  wordCount,
  status,
  onToggleRevision,
}: RootWordCardProps) {
  const getStatusIcon = () => {
    if (status === 'for-revision') {
      return (
        <div className="flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full">
          <span className="text-sm font-bold text-white">★</span>
        </div>
      );
    }
    if (status === 'visited') {
      return (
        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
          <span className="text-xs font-bold text-white">✓</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full">
        <span className="text-xs font-bold text-gray-600">○</span>
      </div>
    );
  };

  return (
    <div className="relative">
      <Link href={`/root/${id}`}>
        <div
          className={`${color} rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-105 border border-gray-200`}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">{root}</h3>
          <p className="text-gray-700 text-sm mb-3">{meaning}</p>
          <div className="text-xs bg-white px-3 py-1 rounded-full inline-block text-gray-600">
            {wordCount} word{wordCount !== 1 ? 's' : ''}
          </div>
        </div>
      </Link>

      {/* Status indicator and revision toggle */}
      <div className="absolute top-3 right-3 flex gap-2">
        <div>{getStatusIcon()}</div>
        <button
          onClick={onToggleRevision}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all font-bold text-lg ${
            status === 'for-revision'
              ? 'bg-yellow-400 text-white shadow-md scale-110'
              : 'bg-white text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-50'
          }`}
          title="Mark for revision"
        >
          ★
        </button>
      </div>
    </div>
  );
}
