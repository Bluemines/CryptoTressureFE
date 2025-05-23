'use client';

import { useEffect, useState, ReactNode } from 'react';

type ClientOnlyProps = {
  children: ReactNode;
};

export default function ClientOnly({ children }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{children}</>;
}
