'use client';

import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import Link from 'next/link';
import { ReactNode } from 'react';

const components = {
  // Custom link component that uses Next.js Link for internal links
  a: ({ href, children, ...props }: { href?: string; children: ReactNode } & any) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  
  // Custom code block styling with Mac-style window
  pre: ({ children, ...props }: { children: ReactNode } & any) => (
    <div style={{ margin: '2rem 0' }}>
      <div
        style={{
          backgroundColor: '#2d333b',
          borderRadius: '0.75rem 0.75rem 0 0',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid #444c56',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '0.375rem',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ff5f56',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ffbd2e',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#27ca3f',
            }}
          />
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: '#7d8590',
            marginLeft: 'auto',
            fontFamily: 'Monaco, Menlo, monospace',
          }}
        >
          Terminal
        </div>
      </div>
      <pre
        style={{
          backgroundColor: '#0d1117',
          padding: '1.5rem',
          borderRadius: '0 0 0.75rem 0.75rem',
          overflow: 'auto',
          margin: '0',
          border: '1px solid #30363d',
          borderTop: 'none',
          fontFamily: 'JetBrains Mono, Fira Code, Monaco, Menlo, monospace',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
        {...props}
      >
        {children}
      </pre>
    </div>
  ),
  
  // Custom blockquote styling
  blockquote: ({ children, ...props }: { children: ReactNode } & any) => (
    <blockquote
      style={{
        borderLeft: '4px solid #6FC1FF',
        paddingLeft: '1rem',
        margin: '1.5rem 0',
        fontStyle: 'italic',
        color: '#9ca3af',
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),
};

interface MDXProviderProps {
  children: ReactNode;
}

export default function MDXProvider({ children }: MDXProviderProps) {
  return <BaseMDXProvider components={components}>{children}</BaseMDXProvider>;
}