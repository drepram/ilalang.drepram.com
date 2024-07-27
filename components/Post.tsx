import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Post as TPost, Author as TAuthor } from "@prisma/client";

interface Props {
  post: TPost;
  author?: TAuthor;
}

const Post: React.FC<Props> = ({ post, author }) => {
  const authorName = author ? author.name : "Unknown author";
  return (
    <Link
      className="post-card cursor-pointer p-6 bg-white shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
      href={`/p/${post.id}`}
    >
      <h2 className="text-xl font-bold mb-2">
        <ReactMarkdown>{post.title}</ReactMarkdown>
      </h2>
      {/* <small className="text-gray-600">oleh {authorName}</small> */}
      {/* <div className="prose dark:prose-dark mt-4">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div> */}
    </Link>
  );
};

export default Post;
