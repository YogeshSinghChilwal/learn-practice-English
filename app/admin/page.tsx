'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <AdminDashboard />;
}
