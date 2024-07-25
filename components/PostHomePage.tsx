import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
  } | null;
  user: {
    email: string;
  } | null;
  content: string;
  published: boolean;
  highlighted: boolean;
  createdAt: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";

  return (
    <div
      className="post-card cursor-pointer p-6 bg-white shadow rounded-lg hover:shadow-lg transition-shadow duration-200 flex flex-col justify-center h-full"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <h2 className="text-xl font-bold mb-2 text-center">
        <ReactMarkdown>{post.title}</ReactMarkdown>
      </h2>
      <small className="text-gray-600 text-center">{authorName}</small>
    </div>
  );
};

export default Post;
