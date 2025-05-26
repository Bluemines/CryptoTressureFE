'use client';

import { useEffect } from 'react';

const ClearLocalStorageOnExit = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // No UI needed
};

export default ClearLocalStorageOnExit;
