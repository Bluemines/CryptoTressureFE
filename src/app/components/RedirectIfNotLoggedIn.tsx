'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/authStore';
// import { authStore } from '@/store/authStore';

interface RedirectIfNotLoggedInProps {
  children: ReactNode;
}

const RedirectIfNotLoggedIn = ({ children }: RedirectIfNotLoggedInProps) => {
  // const { user } = authStore();
  const token = localStorage.getItem('accessToken')
  const router = useRouter();
  const expiresAt = authStore(state => state.expiresAt)
  const logout = authStore(state => state.logout)

  useEffect(() => {
    const isExpired = expiresAt && Date.now() > expiresAt;
    if (!token) {
      router.replace('/login');
    }
    if(isExpired) {
      logout()
    }
  }, [token, router, expiresAt]);

  if (!token || expiresAt && Date.now() > expiresAt) return null;

  return <>{children}</>;
};

export default RedirectIfNotLoggedIn;
