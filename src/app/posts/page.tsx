import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '3rem',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        Blog Posts
      </h1>
      
      {posts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: '#9ca3af',
          padding: '3rem 0',
          fontSize: '1.125rem'
        }}>
          <p>No posts found. Check back soon!</p>
        </div>
      ) : (
        <>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#9ca3af',
            fontSize: '1rem'
          }}>
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} • 
            Covering Cyber Security, DevOps, Programming & More
          </div>
          
          {/* Grid layout for larger screens, stack on mobile */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              padding: '0 1rem'
            }}
          >
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}