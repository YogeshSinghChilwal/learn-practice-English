'use client';

import { useState, useEffect } from 'react';

export type RootWordStatus = 'not-visited' | 'visited' | 'for-revision';

interface TrackingData {
  [rootId: string]: RootWordStatus;
}

function loadTracking(): TrackingData {
  if (typeof window === 'undefined') return {};
  try {
    const saved = localStorage.getItem('rootWordTracking');
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Error parsing tracking data:', error);
    return {};
  }
}

export function useRootWordTracking() {
  // Lazy initializer reads localStorage once on mount — no useEffect needed
  const [tracking, setTracking] = useState<TrackingData>(loadTracking);

  // Save tracking data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('rootWordTracking', JSON.stringify(tracking));
  }, [tracking]);

  const markAsVisited = (rootId: string) => {
    setTracking((prev) => {
      const current = prev[rootId] || 'not-visited';
      if (current === 'not-visited') {
        return { ...prev, [rootId]: 'visited' };
      }
      return prev;
    });
  };

  const toggleForRevision = (rootId: string) => {
    setTracking((prev) => {
      const current = prev[rootId] || 'not-visited';
      const newStatus: RootWordStatus = current === 'for-revision' ? 'visited' : 'for-revision';
      return { ...prev, [rootId]: newStatus };
    });
  };

  const getStatus = (rootId: string): RootWordStatus => {
    return tracking[rootId] || 'not-visited';
  };

  const clearAll = () => {
    setTracking({});
  };

  return {
    tracking,
    markAsVisited,
    toggleForRevision,
    getStatus,
    clearAll,
    loaded: true,
  };
}