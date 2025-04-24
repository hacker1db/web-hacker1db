import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ParsedUrlQuery } from 'querystring';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface PostProps {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    [key: string]: any;
  };
}

const PostPage = ({ source, frontMatter }: PostProps) => {
  return (
    <div>
      <Header />
      <article className="prose lg:prose-xl mx-auto my-8">
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...source} />
      </article>
      <Footer />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('content/posts'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as ParsedUrlQuery;
  const markdownWithMeta = fs.readFileSync(
    path.join('content/posts', `${slug}.md`),
    'utf-8'
  );
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      source: mdxSource,
      frontMatter,
    },
  };
};

export default PostPage;
