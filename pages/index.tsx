import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostList from '../components/PostList';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    subtitle: string;
  };
}

interface HomeProps {
  posts: Post[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4">
        <h1 className="text-4xl font-bold my-8">Hacker1db.dev blog</h1>
        <p className="text-lg mb-8">
          Cyber Security Professional, Software Engineer, Traveler, Music lover, Coffee Nerd.
        </p>
        <PostList posts={posts} />
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join('content/posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('content/posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Home;
