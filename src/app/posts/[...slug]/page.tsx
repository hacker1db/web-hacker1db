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
    <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
      {/* Back to Posts Link */}
      <div className="mb-6">
        <Link 
          href="/posts"
          className="text-cursor"
          style={{ textDecoration: 'none' }}
        >
          ← Back to Posts
        </Link>
      </div>

      {/* Article Header */}
      <article>
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white" style={{ lineHeight: '1.2' }}>
            {post.data.title}
          </h1>
          
          {post.data.subtitle && (
            <p className="text-xl text-gray-300 mb-6">
              {post.data.subtitle}
            </p>
          )}
          
          <div className="flex items-center justify-center text-gray-400 mb-6" style={{ fontSize: '0.875rem' }}>
            <time dateTime={post.data.date}>
              {format(new Date(post.data.date), 'MMMM d, yyyy')}
            </time>
            {post.data.author && (
              <>
                <span style={{ margin: '0 0.5rem' }}>•</span>
                <span>by {post.data.author}</span>
              </>
            )}
          </div>
          
          {post.data.tags && post.data.tags.length > 0 && (
            <div className="flex" style={{ flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {post.data.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {post.data.series && post.data.series.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-400" style={{ fontSize: '0.875rem' }}>
                Part of series: {post.data.series.join(', ')}
              </p>
            </div>
          )}
        </header>

        {/* Article Content */}
        <div 
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Navigation */}
      <div className="mt-12 border-t border-gray-700" style={{ paddingTop: '2rem' }}>
        <div className="flex justify-between items-center">
          <Link 
            href="/posts"
            className="text-cursor"
            style={{ textDecoration: 'none' }}
          >
            ← All Posts
          </Link>
          
          <div className="text-gray-400" style={{ fontSize: '0.875rem' }}>
            Share this post
          </div>
        </div>
      </div>
    </div>
  );
}