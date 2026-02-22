import React from "react";
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
      className="editor-card cursor-pointer p-6"
      href={`/p/${post.id}`}
    >
      <h2 className="mb-2 text-xl font-bold text-[#2f241c]">
        {post.title}
      </h2>
      {/* <small className="text-gray-600">oleh {authorName}</small> */}
      {/* <div className="prose dark:prose-dark mt-4">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div> */}
    </Link>
  );
};

export default Post;
