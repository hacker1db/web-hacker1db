import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p>No posts found. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors border border-gray-700"
            >
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl font-bold mb-3 text-white hover:text-cursor transition-colors">
                  {post.data.title}
                </h2>
              </Link>
              
              {post.data.subtitle && (
                <p className="text-lg text-gray-300 mb-3">
                  {post.data.subtitle}
                </p>
              )}
              
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <time dateTime={post.data.date}>
                  {format(new Date(post.data.date), 'MMMM d, yyyy')}
                </time>
                {post.data.author && (
                  <>
                    <span className="mx-2">•</span>
                    <span>by {post.data.author}</span>
                  </>
                )}
              </div>
              
              {post.data.tags && post.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              {post.excerpt && (
                <p className="text-gray-300 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              <Link 
                href={`/posts/${post.slug}`}
                className="inline-block mt-4 text-cursor hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}