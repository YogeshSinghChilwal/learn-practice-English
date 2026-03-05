'use client';

import { useState } from 'react';
import { RootWord } from '@/hooks/useVocabularyData';
import { X } from 'lucide-react';

interface RootWordFormProps {
  onSubmit: (rootWord: RootWord) => void;
  onCancel: () => void;
  initialData?: RootWord;
}

const COLORS = [
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-pink-100',
  'bg-purple-100',
  'bg-indigo-100',
  'bg-cyan-100',
  'bg-orange-100',
];

export function RootWordForm({ onSubmit, onCancel, initialData }: RootWordFormProps) {
  const [root, setRoot] = useState(initialData?.root || '');
  const [meaning, setMeaning] = useState(initialData?.meaning || '');
  const [color, setColor] = useState(initialData?.color || COLORS[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!root.trim()) newErrors.root = 'Root word is required';
    if (!meaning.trim()) newErrors.meaning = 'Meaning is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const newRootWord: RootWord = {
      id: initialData?.id || `root_${Date.now()}`,
      root: root.trim(),
      meaning: meaning.trim(),
      color,
      words: initialData?.words || [],
    };

    onSubmit(newRootWord);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? 'Edit Root Word' : 'Add Root Word'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Root Word Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Root Word *
            </label>
            <input
              type="text"
              value={root}
              onChange={(e) => setRoot(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.root ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Act"
            />
            {errors.root && <p className="text-red-500 text-sm mt-1">{errors.root}</p>}
          </div>

          {/* Meaning Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meaning *
            </label>
            <input
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.meaning ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., to do"
            />
            {errors.meaning && <p className="text-red-500 text-sm mt-1">{errors.meaning}</p>}
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {COLORS.map((bgColor) => (
                <button
                  key={bgColor}
                  type="button"
                  onClick={() => setColor(bgColor)}
                  className={`h-10 rounded-lg border-2 transition-all ${
                    color === bgColor ? 'border-gray-900' : 'border-transparent'
                  } ${bgColor}`}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
