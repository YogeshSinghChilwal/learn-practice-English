'use client';

import { useState, useEffect, useCallback } from 'react';

export interface SynonymAntonym {
  word: string;
  meaning: string;
  example: string;
}

export interface Word {
  id: string;
  word: string;
  hindi: string;
  pos: string;
  meaning: string;
  example: string;
  synonyms: SynonymAntonym[];
  antonyms: SynonymAntonym[];
}

export interface RootWord {
  id: string;
  root: string;
  meaning: string;
  color: string;
  words: Word[];
}

export interface VocabularyData {
  rootWords: RootWord[];
}

const STORAGE_KEY = 'vocabulary_data';
const DEFAULT_DATA_URL = '/data/vocabulary.json';

export function useVocabularyData() {
  const [data, setData] = useState<VocabularyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage or default JSON file
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        
        if (storedData) {
          setData(JSON.parse(storedData));
        } else {
          const response = await fetch(DEFAULT_DATA_URL);
          const defaultData = await response.json();
          setData(defaultData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load vocabulary data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage
  const saveData = useCallback((newData: VocabularyData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setData(newData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
    }
  }, []);

  // Add root word
  const addRootWord = useCallback((rootWord: RootWord) => {
    if (!data) return;
    const newData = {
      ...data,
      rootWords: [...data.rootWords, rootWord],
    };
    saveData(newData);
  }, [data, saveData]);

  // Update root word
  const updateRootWord = useCallback((id: string, updates: Partial<RootWord>) => {
    if (!data) return;
    const newData = {
      ...data,
      rootWords: data.rootWords.map((rw) => (rw.id === id ? { ...rw, ...updates } : rw)),
    };
    saveData(newData);
  }, [data, saveData]);

  // Delete root word
  const deleteRootWord = useCallback((id: string) => {
    if (!data) return;
    const newData = {
      ...data,
      rootWords: data.rootWords.filter((rw) => rw.id !== id),
    };
    saveData(newData);
  }, [data, saveData]);

  // Add word to root
  const addWord = useCallback((rootId: string, word: Word) => {
    if (!data) return;
    const newData = {
      ...data,
      rootWords: data.rootWords.map((rw) =>
        rw.id === rootId ? { ...rw, words: [...rw.words, word] } : rw
      ),
    };
    saveData(newData);
  }, [data, saveData]);

  // Update word in root
  const updateWord = useCallback((rootId: string, wordId: string, updates: Partial<Word>) => {
    if (!data) return;
    const newData = {
      ...data,
      rootWords: data.rootWords.map((rw) =>
        rw.id === rootId
          ? {
              ...rw,
              words: rw.words.map((w) => (w.id === wordId ? { ...w, ...updates } : w)),
            }
          : rw
      ),
    };
    saveData(newData);
  }, [data, saveData]);

  // Delete word from root
  const deleteWord = useCallback((rootId: string, wordId: string) => {
    if (!data) return;
    const newData = {
      ...data,
      rootWords: data.rootWords.map((rw) =>
        rw.id === rootId ? { ...rw, words: rw.words.filter((w) => w.id !== wordId) } : rw
      ),
    };
    saveData(newData);
  }, [data, saveData]);

  // Export data as JSON
  const exportData = useCallback(() => {
    if (!data) return;
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vocabulary_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data]);

  // Reset to default
  const resetToDefault = useCallback(async () => {
    try {
      const response = await fetch(DEFAULT_DATA_URL);
      const defaultData = await response.json();
      saveData(defaultData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset data');
    }
  }, [saveData]);

  return {
    data,
    loading,
    error,
    saveData,
    addRootWord,
    updateRootWord,
    deleteRootWord,
    addWord,
    updateWord,
    deleteWord,
    exportData,
    resetToDefault,
  };
}
