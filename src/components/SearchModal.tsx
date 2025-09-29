'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { searchPosts, getSearchSuggestions, highlightSearchTerms } from '@/lib/search';
import { SearchResult } from '@/types/blog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load suggestions on mount
  useEffect(() => {
    if (isOpen) {
      getSearchSuggestions().then(setSuggestions);
      // Focus input when modal opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle search
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchPosts(searchQuery);
      setResults(searchResults.slice(0, 10)); // Limit to 10 results
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, handleSearch]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            const result = results[selectedIndex];
            window.location.href = `/posts/${result.slug}`;
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedIndex, results, onClose]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  // Handle result click
  const handleResultClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1a1d21',
          borderRadius: '12px',
          border: '1px solid #374151',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '70vh',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151' }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, tags, categories..."
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1.125rem',
              backgroundColor: '#2d3748',
              border: '1px solid #4a5568',
              borderRadius: '8px',
              color: '#fff',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#6FC1FF';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#4a5568';
            }}
          />
          
          {/* Search shortcuts hint */}
          <div style={{ 
            marginTop: '0.5rem', 
            fontSize: '0.875rem', 
            color: '#9ca3af',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Use ↑↓ to navigate, Enter to select, Esc to close</span>
            {isLoading && <span>Searching...</span>}
          </div>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {query.trim() === '' && suggestions.length > 0 && (
            <div style={{ padding: '1rem' }}>
              <h3 style={{ 
                color: '#d1d5db', 
                fontSize: '0.875rem', 
                fontWeight: '600',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Popular Topics
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      backgroundColor: '#374151',
                      border: '1px solid #4b5563',
                      borderRadius: '20px',
                      color: '#d1d5db',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#4b5563';
                      e.currentTarget.style.borderColor = '#6FC1FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#374151';
                      e.currentTarget.style.borderColor = '#4b5563';
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div>
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  href={`/posts/${result.slug}`}
                  onClick={handleResultClick}
                  style={{
                    display: 'block',
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid #374151',
                    textDecoration: 'none',
                    backgroundColor: selectedIndex === index ? '#374151' : 'transparent',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedIndex !== index) {
                      e.currentTarget.style.backgroundColor = '#2d3748';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedIndex !== index) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ marginBottom: '0.5rem' }}>
                    <h3 
                      style={{
                        color: '#fff',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerms(result.title, query)
                      }}
                    />
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.75rem',
                      fontSize: '0.875rem',
                      color: '#9ca3af'
                    }}>
                      <span>📂 {result.category}</span>
                      <span>📅 {new Date(result.date).toLocaleDateString()}</span>
                      {result.series && <span>📚 {result.series}</span>}
                    </div>
                  </div>
                  <p 
                    style={{
                      color: '#d1d5db',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      margin: 0,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchTerms(result.excerpt, query)
                    }}
                  />
                  {result.tags.length > 0 && (
                    <div style={{ 
                      marginTop: '0.5rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.25rem'
                    }}>
                      {result.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '0.125rem 0.5rem',
                            backgroundColor: '#374151',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          {query.trim() !== '' && results.length === 0 && !isLoading && (
            <div style={{ 
              padding: '2rem',
              textAlign: 'center',
              color: '#9ca3af'
            }}>
              <p>No results found for "{query}"</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Try different keywords or browse popular topics above
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}