'use client';

import Link from 'next/link';
import { Post } from '@/types/blog';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article 
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        border: '1px solid #374151',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        e.currentTarget.style.borderColor = '#6FC1FF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#374151';
      }}
    >
      {/* Category Badge */}
      {post.slug.includes('/') && (
        <div 
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: '#6FC1FF',
            color: '#000000',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {post.slug.split('/')[0]}
        </div>
      )}

      <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
        {/* Title */}
        <h2 
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '0.5rem',
            lineHeight: '1.3',
            transition: 'color 0.2s ease',
            paddingRight: post.slug.includes('/') ? '4rem' : '0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#6FC1FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          {post.data.title}
        </h2>

        {/* Subtitle - only show if not used as heading in content */}
        {post.data.subtitle && !post.data.hideSubtitleInCard && (
          <p style={{
            fontSize: '1rem',
            color: '#d1d5db',
            marginBottom: '1rem',
            lineHeight: '1.5'
          }}>
            {post.data.subtitle}
          </p>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p style={{
            color: '#9ca3af',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            {post.excerpt}
          </p>
        )}
      </Link>

      {/* Tags */}
      {post.data.tags && post.data.tags.length > 0 && (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.5rem', 
          marginBottom: '1.5rem' 
        }}>
          {post.data.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: 'rgba(107, 114, 128, 0.3)',
                color: '#d1d5db',
                fontSize: '0.75rem',
                fontWeight: '500',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid rgba(107, 114, 128, 0.2)'
              }}
            >
              {tag}
            </span>
          ))}
          {post.data.tags.length > 3 && (
            <span style={{
              color: '#9ca3af',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              +{post.data.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid #374151',
        fontSize: '0.875rem',
        color: '#9ca3af'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <time dateTime={post.data.date}>
            {format(new Date(post.data.date), 'MMM d, yyyy')}
          </time>
          {post.data.author && (
            <>
              <span>•</span>
              <span>{post.data.author}</span>
            </>
          )}
          {post.data.series && post.data.series.length > 0 && (
            <>
              <span>•</span>
              <span style={{
                color: '#6FC1FF',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                Series: {post.data.series[0]}
              </span>
            </>
          )}
        </div>
        
        <Link 
          href={`/posts/${post.slug}`}
          style={{
            color: '#6FC1FF',
            textDecoration: 'none',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          Read more
          <span style={{ fontSize: '0.75rem' }}>→</span>
        </Link>
      </div>
    </article>
  );
}