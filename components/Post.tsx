import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface PostProps {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    date: string;
    subtitle: string;
  };
}

const Post: React.FC<PostProps> = ({ source, frontMatter }) => {
  return (
    <div className="post">
      <h1 className="post-title">{frontMatter.title}</h1>
      <p className="post-date">{frontMatter.date}</p>
      <p className="post-subtitle">{frontMatter.subtitle}</p>
      <div className="post-content">
        <MDXRemote {...source} />
      </div>
    </div>
  );
};

export default Post;
