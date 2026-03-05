'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Lock, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAdminAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (login(password)) {
        router.push('/admin');
      } else {
        setError('Invalid password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Enter password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading ? 'Verifying...' : 'Login'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            💡 Default password: admin123
          </p>
        </div>
      </div>
    </main>
  );
}