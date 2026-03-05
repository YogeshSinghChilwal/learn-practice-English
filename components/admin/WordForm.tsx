'use client';

import { useState } from 'react';
import { Word, SynonymAntonym } from '@/hooks/useVocabularyData';
import { X, Plus, Trash2 } from 'lucide-react';

interface WordFormProps {
  onSubmit: (word: Word) => void;
  onCancel: () => void;
  initialData?: Word;
}

const POS_OPTIONS = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Preposition', 'Pronoun', 'Conjunction'];

export function WordForm({ onSubmit, onCancel, initialData }: WordFormProps) {
  const [word, setWord] = useState(initialData?.word || '');
  const [hindi, setHindi] = useState(initialData?.hindi || '');
  const [pos, setPos] = useState(initialData?.pos || 'Noun');
  const [meaning, setMeaning] = useState(initialData?.meaning || '');
  const [example, setExample] = useState(initialData?.example || '');
  const [synonyms, setSynonyms] = useState<SynonymAntonym[]>(initialData?.synonyms || []);
  const [antonyms, setAntonyms] = useState<SynonymAntonym[]>(initialData?.antonyms || []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!word.trim()) newErrors.word = 'Word is required';
    if (!meaning.trim()) newErrors.meaning = 'Meaning is required';
    if (!example.trim()) newErrors.example = 'Example is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSynonym = () => {
    setSynonyms([...synonyms, { word: '', meaning: '', example: '' }]);
  };

  const handleUpdateSynonym = (index: number, field: keyof SynonymAntonym, value: string) => {
    const updated = [...synonyms];
    updated[index][field] = value;
    setSynonyms(updated);
  };

  const handleRemoveSynonym = (index: number) => {
    setSynonyms(synonyms.filter((_, i) => i !== index));
  };

  const handleAddAntonym = () => {
    setAntonyms([...antonyms, { word: '', meaning: '', example: '' }]);
  };

  const handleUpdateAntonym = (index: number, field: keyof SynonymAntonym, value: string) => {
    const updated = [...antonyms];
    updated[index][field] = value;
    setAntonyms(updated);
  };

  const handleRemoveAntonym = (index: number) => {
    setAntonyms(antonyms.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const newWord: Word = {
      id: initialData?.id || `word_${Date.now()}`,
      word: word.trim(),
      hindi: hindi.trim(),
      pos,
      meaning: meaning.trim(),
      example: example.trim(),
      synonyms: synonyms.filter((s) => s.word.trim()),
      antonyms: antonyms.filter((a) => a.word.trim()),
    };

    onSubmit(newWord);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? 'Edit Word' : 'Add Word'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Word Input */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                English Word *
              </label>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.word ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Abandon"
              />
              {errors.word && <p className="text-red-500 text-sm mt-1">{errors.word}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hindi Translation
              </label>
              <input
                type="text"
                value={hindi}
                onChange={(e) => setHindi(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Hindi meaning"
              />
            </div>
          </div>

          {/* POS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Part of Speech *
            </label>
            <select
              value={pos}
              onChange={(e) => setPos(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {POS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Meaning */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meaning *
            </label>
            <textarea
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.meaning ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={2}
              placeholder="Enter word meaning"
            />
            {errors.meaning && <p className="text-red-500 text-sm mt-1">{errors.meaning}</p>}
          </div>

          {/* Example */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Example Sentence *
            </label>
            <textarea
              value={example}
              onChange={(e) => setExample(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.example ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={2}
              placeholder="Enter example sentence"
            />
            {errors.example && <p className="text-red-500 text-sm mt-1">{errors.example}</p>}
          </div>

          {/* Synonyms */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">Synonyms</h3>
              <button
                type="button"
                onClick={handleAddSynonym}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
            {synonyms.map((synonym, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg mb-3 space-y-2">
                <input
                  type="text"
                  value={synonym.word}
                  onChange={(e) => handleUpdateSynonym(index, 'word', e.target.value)}
                  placeholder="Synonym word"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  value={synonym.meaning}
                  onChange={(e) => handleUpdateSynonym(index, 'meaning', e.target.value)}
                  placeholder="Meaning"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <textarea
                  value={synonym.example}
                  onChange={(e) => handleUpdateSynonym(index, 'example', e.target.value)}
                  placeholder="Example"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
                  rows={1}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSynonym(index)}
                  className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            ))}
          </div>

          {/* Antonyms */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">Antonyms</h3>
              <button
                type="button"
                onClick={handleAddAntonym}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
            {antonyms.map((antonym, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg mb-3 space-y-2">
                <input
                  type="text"
                  value={antonym.word}
                  onChange={(e) => handleUpdateAntonym(index, 'word', e.target.value)}
                  placeholder="Antonym word"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  value={antonym.meaning}
                  onChange={(e) => handleUpdateAntonym(index, 'meaning', e.target.value)}
                  placeholder="Meaning"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <textarea
                  value={antonym.example}
                  onChange={(e) => handleUpdateAntonym(index, 'example', e.target.value)}
                  placeholder="Example"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
                  rows={1}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAntonym(index)}
                  className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
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
