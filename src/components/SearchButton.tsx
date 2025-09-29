'use client';

import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K on Mac, Ctrl+K on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          backgroundColor: '#374151',
          border: '1px solid #4b5563',
          borderRadius: '6px',
          color: '#d1d5db',
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: 'Monaco, Menlo, Courier New, monospace',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#4b5563';
          e.currentTarget.style.borderColor = '#6FC1FF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#374151';
          e.currentTarget.style.borderColor = '#4b5563';
        }}
        title="Search posts (Cmd/Ctrl + K)"
      >
        {/* Search Icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        Search
        {/* Keyboard shortcut hint */}
        <span style={{ 
          fontSize: '0.75rem',
          padding: '0.125rem 0.375rem',
          backgroundColor: '#2d3748',
          borderRadius: '4px',
          color: '#9ca3af'
        }}>
          ⌘K
        </span>
      </button>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}