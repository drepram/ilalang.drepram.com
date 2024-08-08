import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import PageTitle from "../../components/PageTitle";
import Link from "next/link";
import Head from "next/head";
import { Post as TPost, Author as TAuthor } from "@prisma/client";

interface Props extends TPost {
  author: TAuthor;
}

export const getStaticPaths = (async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: posts.map((post) => ({
      params: { id: post.id },
    })),
    fallback: true,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const postId = String(context.params?.id);
  const post = await prisma.post
    .findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
      },
    })
    .then((post) => JSON.parse(JSON.stringify(post)));

  return {
    props: post,
    revalidate: 60 * 10,
  };
}) satisfies GetStaticProps<Props>;

async function modifyPost(): Promise<void> {
  Router.push("/edit/post");
}

const Post: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.id === props.userId;
  let title = props.title;
  let authorUrl = `/a/${props.author.id}`;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout showFooter={false}>
      <Head>
        <title>{`${title} [${props.author.name}] -- ilalang`}</title>
        <meta
          name="description"
          content={`Baca "${title}" karya ${props.author.name} di ilalang`}
        />
      </Head>
      <section className="max-w-screen-sm mx-auto px-4">
        <article className="mx-auto max-w-full px-4">
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <div>
                <h1 className="text-sm mb-10">
                  <Link legacyBehavior href={authorUrl}>
                    <span className="text-fuchsia-500 hover:underline">
                      &larr; {props.author.name}
                    </span>
                  </Link>
                </h1>
                <PageTitle>
                  <ReactMarkdown>{title}</ReactMarkdown>
                </PageTitle>
              </div>
            </div>
          </header>
          <div className="absolute left-0 right-0 divide-y divide-gray-200 pb-8 dark:divide-gray-700 lg:relative lg:left-auto lg:right-auto lg:divide-y lg:divide-gray-200 lg:pb-8 lg:dark:divide-gray-700">
            <div className="prose pb-8 pt-10 dark:prose-invert leading-relaxed mx-auto whitespace-pre-wrap break-words p-2 rounded-md overflow-x-auto">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw] as any}
                className="markdown-content"
              >
                {props.content}
              </ReactMarkdown>
            </div>
            {userHasValidSession && postBelongsToUser && (
              <div className="pt-4">
                <button
                  onClick={() => modifyPost()}
                  className="flex items-center bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 mr-1"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0l-1.172 1.172 2.828 2.828 1.172-1.172a2 2 0 000-2.828zM14 6l-9 9v2h2l9-9-2-2z" />
                  </svg>
                  Modify
                </button>
              </div>
            )}
          </div>
        </article>
      </section>
    </Layout>
  );
};

export default Post;
