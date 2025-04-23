import { useRouter } from 'next/router';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import ErrorPage from 'next/error';
import PostBody from '../../components/post-body';
import Header from '../../components/header';
import Layout from '../../components/layout';
import PostTitle from '../../components/post-title';
import Head from 'next/head';
import { CMS_NAME } from '../../lib/constants';
import { GetStaticProps, GetStaticPaths } from 'next';

interface PostProps {
  post: {
    title: string;
    date: string;
    slug: string;
    author: string;
    content: string;
    ogImage: {
      url: string;
    };
    coverImage: string;
  };
  morePosts: any[];
  preview: boolean;
}

export default function Post({ post, morePosts, preview }: PostProps) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <Head>
              <title>
                {post.title} | Next.js Blog Example with {CMS_NAME}
              </title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug as string, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
