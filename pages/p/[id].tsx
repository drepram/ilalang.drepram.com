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
import { Post as TPost, Author as TAuthor } from "@prisma/client";
import Meta, {
  OGType,
  SITE_URL,
} from "../../components/Meta";

interface Props extends TPost {
  author: TAuthor;
}

export const getStaticPaths = (async () => {
  try {
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
  } catch (error) {
    console.warn("Failed to prebuild post paths", error);
    return {
      paths: [],
      fallback: true,
    };
  }
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

const Post: React.FC<Props> = ({ author, ...props }) => {
  const { data: session, status } = useSession();
  const description = `Baca "${props.title}" di ilalang`;
  const pageTitle = `${props.title} -- puisi | ilalang`;
  const pageDescription = `Karya ${author?.name || "penulis"} di ilalang. Melawan kekerasan budaya melalui ingatan sastra.`;
  const image = author?.profilePicture || "/assets/og.png";
  const structuredData = author
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.title,
        description,
        image: `${SITE_URL}${image}`,
        author: {
          "@type": "Person",
          name: author.name,
        },
        datePublished: props.createdAt,
        dateModified: props.createdAt,
        mainEntityOfPage: `${SITE_URL}/p/${props.id}`,
        publisher: {
          "@type": "Organization",
          name: "ilalang",
          url: SITE_URL,
        },
      }
    : undefined;

  if (status === "loading") {
    return (
      <Layout showFooter={false}>
        <Meta
          title={pageTitle}
          titleSuffix=""
          description={pageDescription}
          image={image}
          ogType={OGType.Article}
          url={`/p/${props.id}`}
          structuredData={structuredData}
        />
        <div>Memuat...</div>
      </Layout>
    );
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.id === props.userId;
  let title = props.title;
  let authorUrl = `/a/${author.id}`;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout showFooter={false}>
      <Meta
        title={pageTitle}
        titleSuffix=""
        description={pageDescription}
        image={image}
        ogType={OGType.Article}
        url={`/p/${props.id}`}
        structuredData={structuredData}
      />
      <section className="max-w-screen-sm mx-auto px-4">
        <article className="mx-auto max-w-full px-2 sm:px-4">
          <header>
            <div className="space-y-1 border-b border-[#d8c6a7] pb-8 pt-2 text-center sm:pb-10 sm:pt-4">
              <div>
                <h1 className="mb-7 mt-2 text-sm sm:mb-10 sm:mt-3">
                  <Link legacyBehavior href={authorUrl}>
                    <span className="text-[#944129] hover:underline">
                      &larr; {author.name}
                    </span>
                  </Link>
                </h1>
                <div className="mx-auto max-w-3xl text-[2.2rem] leading-[1.08] sm:text-[3.2rem]">
                  <PageTitle>
                    {title}
                  </PageTitle>
                </div>
              </div>
            </div>
          </header>
          <div className="divide-y divide-[#d8c6a7] pb-8">
            <div className="prose mx-auto overflow-x-auto whitespace-pre-wrap break-words rounded-md pb-8 pt-8 leading-relaxed sm:pt-10">
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
                  className="btn-primary flex items-center"
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
