import Link from 'next/link';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    subtitle: string;
  };
}

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.slug} className="mb-8">
          <h2 className="text-2xl font-bold">
            <Link href={`/posts/${post.slug}`}>
              <a>{post.frontmatter.title}</a>
            </Link>
          </h2>
          <p className="text-sm text-gray-600">{post.frontmatter.date}</p>
          <p className="text-lg">{post.frontmatter.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
