'use client';

import { useState } from 'react';

const ADMIN_PASSWORD = 'admin123'; // Simple password - change this in production

export function useAdminAuth() {
  // Lazy initializer reads localStorage once on mount — no useEffect needed
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('adminAuthenticated') === 'true';
  });

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading: false, login, logout };
}