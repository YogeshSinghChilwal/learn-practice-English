'use client';

import { BookOpen, Check } from 'lucide-react';

interface QuizModeSelectorProps {
  onSelectMode: (mode: 'all' | 'visited') => void;
  onClose: () => void;
  visitedCount: number;
}

export function QuizModeSelector({
  onSelectMode,
  onClose,
  visitedCount,
}: QuizModeSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Vocabulary</h2>
        <p className="text-gray-600 mb-8">
          Choose what you want to practice:
        </p>

        <div className="space-y-4">
          {/* All Vocabulary Option */}
          <button
            onClick={() => onSelectMode('all')}
            className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  All Vocabulary
                </h3>
                <p className="text-sm text-gray-600">
                  Practice with all vocabulary words from all root words
                </p>
              </div>
            </div>
          </button>

          {/* Visited Only Option */}
          <button
            onClick={() => onSelectMode('visited')}
            disabled={visitedCount === 0}
            className={`w-full p-6 border-2 rounded-lg text-left group transition-all ${
              visitedCount === 0
                ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 p-2 rounded-lg transition-colors ${
                  visitedCount === 0
                    ? 'bg-gray-200'
                    : 'bg-green-100 group-hover:bg-green-200'
                }`}
              >
                <Check
                  className={`h-6 w-6 ${
                    visitedCount === 0 ? 'text-gray-400' : 'text-green-600'
                  }`}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Visited Only
                </h3>
                <p className="text-sm text-gray-600">
                  Practice only root words you&apos;ve already studied ({visitedCount} available)
                </p>
                {visitedCount === 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Start learning to unlock this option
                  </p>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
