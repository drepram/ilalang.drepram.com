import React from "react";
import Router from "next/router";

export type AuthorProps = {
  id: string;
  name: string;
  profilePicture: string | null;
  yearOfLife: string | null;
  bio: string | null;
  description: string | null;
  posts:
    | {
        id: string;
        title: string;
      }[]
    | null;
};

const Author: React.FC<{ author: AuthorProps }> = ({ author }) => {
  return (
    <div onClick={() => Router.push("/author/[id]", `/author/${author.id}`)}>
      <h2>{author.name}</h2>
      {author.profilePicture && (
        <img src={author.profilePicture} alt={author.name} />
      )}
      {author.yearOfLife && <small>Year of Life: {author.yearOfLife}</small>}
      {author.bio && <p>{author.bio}</p>}
      {author.posts && author.posts.length > 0 && (
        <div>
          <h3>Posts:</h3>
          <ul>
            {author.posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
        img {
          max-width: 200px;
          border-radius: 50%;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Author;
