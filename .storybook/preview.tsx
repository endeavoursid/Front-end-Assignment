// .storybook/preview.tsx
import type { Preview } from '@storybook/react-vite';
import React, { useEffect, useState } from 'react';
import '../src/index.css';

const DarkModeDecorator = (Story: any, context: any) => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <div
      className={`min-h-screen transition-colors p-6 ${
        dark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setDark((d) => !d)}
        className="mb-4 px-4 py-2 rounded-md border shadow text-sm font-medium
                   bg-gray-100 text-gray-800 hover:bg-gray-200
                   dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      >
        {dark ? '🌙 Dark' : '☀️ Light'}
      </button>

      {/* Story content */}
      <div className="bg-inherit text-inherit">
        <Story {...context} />
      </div>
    </div>
  );
};

const preview: Preview = {
  decorators: [DarkModeDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
