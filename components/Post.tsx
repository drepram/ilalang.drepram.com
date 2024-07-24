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
  createdAt: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div
      className="post-card cursor-pointer p-6 bg-white shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <h2 className="text-xl font-bold mb-2">
        <ReactMarkdown>{post.title}</ReactMarkdown>
      </h2>
      {/* <small className="text-gray-600">oleh {authorName}</small> */}
      {/* <div className="prose dark:prose-dark mt-4">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div> */}
    </div>
  );
};

export default Post;
