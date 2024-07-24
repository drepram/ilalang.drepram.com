import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/Layout";
import Post, { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";

export const getStaticPaths: GetStaticPaths = async () => {
  const authors = await prisma.author.findMany({
    select: { id: true },
  });

  const paths = authors.map((author) => ({
    params: { id: author.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const authorId = String(params?.id);

  let author = null;
  let posts = [];

  try {
    author = await prisma.author.findUnique({
      where: {
        id: authorId,
      },
      select: {
        name: true,
        profilePicture: true,
        yearOfLife: true,
        bio: true,
      },
    });

    posts = await prisma.post.findMany({
      where: {
        authorId: authorId,
        published: true,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  if (!author) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)) || [],
      author: JSON.parse(JSON.stringify(author)) || null,
    },
    revalidate: 10, // Revalidate at most once every 10 seconds
  };
};

type Props = {
  posts: PostProps[];
  author: {
    name: string;
    profilePicture: string;
    yearOfLife: string;
    bio: string;
  } | null;
};

const Drafts: React.FC<Props> = ({ posts, author }) => {
  if (!author) {
    return (
      <Layout>
        <div className="page">
          <h1>Author not found.</h1>
        </div>
      </Layout>
    );
  }

  if (!posts.length) {
    return (
      <Layout>
        <div className="page">
          <h1>{author.name} has not published any posts yet.</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="author-profile my-8 p-6 bg-white shadow rounded-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-10">
          <img
            src={author.profilePicture}
            alt={`${author.name}'s profile`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-black-900 dark:text-black-100 mb-2">
              {author.name}
            </h1>
            <h5 className="text-gray-600 dark:text-gray-400 mb-2">
              {author.yearOfLife}
            </h5>
            <hr className="w-full sm:w-auto my-2" />
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              {author.bio}
            </p>
          </div>
        </div>
        <main className="mt-6 space-y-6">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>
      <style jsx>{`
        .post {
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .page {
          background: var(--geist-background);
          padding: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;