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
      className="editor-card flex h-full cursor-pointer flex-col justify-center p-6"
      href={`/p/${post.id}`}
    >
      <h2 className="mb-2 text-center text-xl font-bold text-[#2f241c]">
        {post.title}
      </h2>
      <small className="text-center text-[#6e6052]">{authorName}</small>
    </Link>
  );
};

export default Post;
