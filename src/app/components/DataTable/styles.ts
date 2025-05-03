// components/styles.ts

import { TableStyles } from 'react-data-table-component';

const black: TableStyles = {
  headRow: {
    style: {
      backgroundColor: '#080a0c',
      color: '#ffffff',
      textTransform: 'uppercase' as const,
    },
  },
  rows: {
    style: {
      color: '#858584',
      backgroundColor: '#080a0c',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#080a0c',
      color: '#e5e7eb',
      borderTop: '1px solid #374151',
    },
  },
};

const gray: TableStyles = {
  headRow: {
    style: {
      backgroundColor: '#232323',
      color: '#ffffff',
      textTransform: 'capitalize' as const,
    },
  },
  rows: {
    style: {
      color: '#9ca3af',
      backgroundColor: '#1b1b1b',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#232323',
      color: '#a9a9a9',
      borderTop: '1px solid #374151',
    },
  },
};

const styles: Record<'black' | 'gray', TableStyles> = { black, gray };

export default styles;
