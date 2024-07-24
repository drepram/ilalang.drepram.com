import React from "react";
import Post from './Post'

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

const PostsGrid: React.FC<{ posts: PostProps[] }> = ({ posts }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
