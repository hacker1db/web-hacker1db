import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1rem' }}>
      {/* Back to Posts Link */}
      <div className="mb-6">
        <Link 
          href="/posts"
          className="text-cursor"
          style={{ 
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0',
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Posts
        </Link>
      </div>

      {/* Article Header */}
      <article>
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#ffffff',
            lineHeight: '1.1',
            letterSpacing: '-0.025em'
          }}>
            {post.data.title}
          </h1>
          
          {post.data.subtitle && !post.data.hideSubtitleInCard && (
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
              color: '#9ca3af',
              marginBottom: '2rem',
              lineHeight: '1.4',
              fontStyle: 'italic'
            }}>
              {post.data.subtitle}
            </p>
          )}
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#6b7280', 
            fontSize: '0.95rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <time dateTime={post.data.date}>
              {format(new Date(post.data.date), 'MMMM d, yyyy')}
            </time>
            {post.data.author && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#374151' }}>•</span>
                <span>by {post.data.author}</span>
              </span>
            )}
          </div>
          
          {post.data.tags && post.data.tags.length > 0 && (
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.75rem', 
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              {post.data.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: 'rgba(111, 193, 255, 0.1)',
                    color: '#6FC1FF',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(111, 193, 255, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {post.data.series && post.data.series.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ 
                color: '#9ca3af', 
                fontSize: '0.9rem',
                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(156, 163, 175, 0.2)',
                display: 'inline-block'
              }}>
                📚 Part of series: {post.data.series.join(', ')}
              </p>
            </div>
          )}
        </header>

        {/* Article Content */}
        <div 
          className="prose"
          style={{
            maxWidth: 'none',
            margin: '0 auto'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Navigation */}
      <div style={{ 
        marginTop: '4rem', 
        borderTop: '1px solid #374151', 
        paddingTop: '2rem' 
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <Link 
            href="/posts"
            style={{
              textDecoration: 'none',
              color: '#6FC1FF',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'rgba(111, 193, 255, 0.1)',
              border: '1px solid rgba(111, 193, 255, 0.3)',
              borderRadius: '0.5rem',
              transition: 'all 0.2s ease',
              fontWeight: '500'
            }}
          >
            ← All Posts
          </Link>
          
          <div style={{ 
            color: '#9ca3af', 
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span>Share this post</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.data.title)}&url=${encodeURIComponent(`https://hacker1db.dev/posts/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#6FC1FF',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s ease'
                }}
              >
                🐦
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}