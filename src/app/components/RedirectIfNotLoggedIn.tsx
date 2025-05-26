'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
// import { authStore } from '@/store/authStore';

interface RedirectIfNotLoggedInProps {
  children: ReactNode;
}

const RedirectIfNotLoggedIn = ({ children }: RedirectIfNotLoggedInProps) => {
  // const { user } = authStore();
  const token = localStorage.getItem('accessToken')
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  if (!token) return null;

  return <>{children}</>;
};

export default RedirectIfNotLoggedIn;
