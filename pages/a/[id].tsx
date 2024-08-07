import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import Post from "../../components/Post";
import prisma from "../../lib/prisma";
import type { Author as TAuthor, Post as TPost } from "@prisma/client";
import Head from "next/head";

interface Props extends TAuthor {
  posts: TPost[];
}

export const getStaticPaths = (async () => {
  const authors = await prisma.author.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: authors.map((author) => ({
      params: { id: author.id },
    })),
    fallback: true,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const authorId = String(context.params?.id);

  const author = await prisma.author
    .findUnique({
      where: {
        id: authorId,
      },
      include: {
        posts: {
          where: {
            published: true,
          },
        },
      },
    })
    .then((author) => JSON.parse(JSON.stringify(author)));

  if (!author) {
    return {
      notFound: true,
    };
  }

  return {
    props: author,
    revalidate: 60 * 10,
  };
}) satisfies GetStaticProps<Props>;

const AuthorPage: React.FC<Props> = (author) => {
  if (!author.posts) {
    return (
      <Layout>
        <Head>
          <title>{`${author.name} -- ilalang`}</title>
          <meta
            name="description"
            content={`${author.bio}`}
          />
        </Head>
        <div className="page">
          <h1>{author.name} has not published any posts yet.</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
        <Head>
          <title>{`${author.name} -- ilalang`}</title>
          <meta
            name="description"
            content={`${author.bio}`}
          />
        </Head>
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
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              {author.bio}
            </p>
          </div>
        </div>
        <main className="mt-6 space-y-6">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {author.posts.map((post) => (
                <Post key={post.id} post={post} author={author} />
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

export default AuthorPage;
