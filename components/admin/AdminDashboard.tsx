'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useVocabularyData, RootWord, Word } from '@/hooks/useVocabularyData';
import { RootWordForm } from './RootWordForm';
import { WordForm } from './WordForm';
import { LogOut, Plus, Edit2, Trash2, Download, RotateCcw, ChevronDown } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { logout } = useAdminAuth();
  const { data, loading, addRootWord, updateRootWord, deleteRootWord, addWord, updateWord, deleteWord, exportData, resetToDefault } = useVocabularyData();
  const [expandedRoot, setExpandedRoot] = useState<string | null>(null);
  const [showRootForm, setShowRootForm] = useState(false);
  const [showWordForm, setShowWordForm] = useState(false);
  const [editingRoot, setEditingRoot] = useState<RootWord | null>(null);
  const [editingWord, setEditingWord] = useState<{ word: Word; rootId: string } | null>(null);
  const [selectedRootForWord, setSelectedRootForWord] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleAddRootWord = (rootWord: RootWord) => {
    if (editingRoot) {
      updateRootWord(editingRoot.id, rootWord);
      setEditingRoot(null);
    } else {
      addRootWord(rootWord);
    }
    setShowRootForm(false);
  };

  const handleAddWord = (word: Word) => {
    if (!selectedRootForWord) return;

    if (editingWord) {
      updateWord(selectedRootForWord, editingWord.word.id, word);
      setEditingWord(null);
    } else {
      addWord(selectedRootForWord, word);
    }
    setShowWordForm(false);
    setSelectedRootForWord(null);
  };

  const handleEditRoot = (root: RootWord) => {
    setEditingRoot(root);
    setShowRootForm(true);
  };

  const handleEditWord = (rootId: string, word: Word) => {
    setEditingWord({ word, rootId });
    setSelectedRootForWord(rootId);
    setShowWordForm(true);
  };

  const handleDeleteRoot = (id: string) => {
    if (window.confirm('Are you sure you want to delete this root word and all its vocabulary?')) {
      deleteRootWord(id);
    }
  };

  const handleDeleteWord = (rootId: string, wordId: string) => {
    if (window.confirm('Are you sure you want to delete this word?')) {
      deleteWord(rootId, wordId);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('This will reset all data to the default vocabulary. Are you sure?')) {
      resetToDefault();
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => {
              setEditingRoot(null);
              setShowRootForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Root Word
          </button>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            <Download className="h-5 w-5" />
            Export Data
          </button>
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
          >
            <RotateCcw className="h-5 w-5" />
            Reset to Default
          </button>
        </div>

        {/* Stats */}
        {data && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 text-sm">Root Words</p>
              <p className="text-3xl font-bold text-gray-900">{data.rootWords.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 text-sm">Total Words</p>
              <p className="text-3xl font-bold text-gray-900">
                {data.rootWords.reduce((sum, r) => sum + r.words.length, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 text-sm">Data Source</p>
              <p className="text-lg font-bold text-blue-600">localStorage</p>
            </div>
          </div>
        )}

        {/* Root Words List */}
        <div className="space-y-4">
          {data?.rootWords.map((rootWord) => (
            <div key={rootWord.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Root Header */}
              <button
                onClick={() =>
                  setExpandedRoot(expandedRoot === rootWord.id ? null : rootWord.id)
                }
                className={`w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors ${
                  rootWord.color
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <ChevronDown
                    className={`h-5 w-5 text-gray-600 transition-transform ${
                      expandedRoot === rootWord.id ? 'rotate-180' : ''
                    }`}
                  />
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-gray-900">{rootWord.root}</h2>
                    <p className="text-sm text-gray-600">{rootWord.meaning}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {rootWord.words.length} words
                </div>
              </button>

              {/* Root Actions */}
              <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 flex gap-2">
                <button
                  onClick={() => handleEditRoot(rootWord)}
                  className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm font-medium"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRoot(rootWord.id)}
                  className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm font-medium"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>

              {/* Expanded Content */}
              {expandedRoot === rootWord.id && (
                <div className="px-6 py-4 border-t border-gray-200">
                  {/* Add Word Button */}
                  <button
                    onClick={() => {
                      setSelectedRootForWord(rootWord.id);
                      setEditingWord(null);
                      setShowWordForm(true);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium mb-4"
                  >
                    <Plus className="h-4 w-4" />
                    Add Word
                  </button>

                  {/* Words List */}
                  {rootWord.words.length > 0 ? (
                    <div className="space-y-3">
                      {rootWord.words.map((word) => (
                        <div key={word.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{word.word}</h3>
                              <p className="text-sm text-gray-600">{word.hindi}</p>
                              <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                {word.pos}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditWord(rootWord.id, word)}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteWord(rootWord.id, word.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{word.meaning}</p>
                          <p className="text-xs text-gray-600 italic mb-3">
                            Example: {word.example}
                          </p>
                          {word.synonyms.length > 0 && (
                            <p className="text-xs text-gray-600">
                              Synonyms: {word.synonyms.map((s) => s.word).join(', ')}
                            </p>
                          )}
                          {word.antonyms.length > 0 && (
                            <p className="text-xs text-gray-600">
                              Antonyms: {word.antonyms.map((a) => a.word).join(', ')}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No words yet. Add one!</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Forms */}
      {showRootForm && (
        <RootWordForm
          onSubmit={handleAddRootWord}
          onCancel={() => {
            setShowRootForm(false);
            setEditingRoot(null);
          }}
          initialData={editingRoot || undefined}
        />
      )}

      {showWordForm && (
        <WordForm
          onSubmit={handleAddWord}
          onCancel={() => {
            setShowWordForm(false);
            setEditingWord(null);
            setSelectedRootForWord(null);
          }}
          initialData={editingWord?.word}
        />
      )}
    </main>
  );
}
