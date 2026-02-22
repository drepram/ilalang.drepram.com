import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import Post from "../../components/Post";
import prisma from "../../lib/prisma";
import type { Author as TAuthor, Post as TPost } from "@prisma/client";
import Meta, {
  OGType,
  SITE_URL,
} from "../../components/Meta";

interface Props extends TAuthor {
  posts: TPost[];
}

export const getStaticPaths = (async () => {
  try {
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
  } catch (error) {
    console.warn("Failed to prebuild author paths", error);
    return {
      paths: [],
      fallback: true,
    };
  }
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
  const description =
    author.description || author.bio || "Profil penulis di ilalang.";
  const pageTitle = `${author.name} -- profil penulis | ilalang`;
  const pageDescription = `${description} Melawan kekerasan budaya dengan mengabadikan ingatan.`;
  const image = author.profilePicture || "/assets/og.png";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/a/${author.id}`,
    mainEntity: {
      "@type": "Person",
      name: author.name,
      description,
      image: `${SITE_URL}${image}`,
    },
    inLanguage: "id-ID",
  };

  if (!author.posts) {
    return (
      <Layout>
        <Meta
          title={pageTitle}
          titleSuffix=""
          description={pageDescription}
          image={image}
          ogType={OGType.Profile}
          url={`/a/${author.id}`}
          structuredData={structuredData}
        />
        <div className="page">
          <h1>Penulis ini belum dimuat karyanya.</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Meta
        title={pageTitle}
        titleSuffix=""
        description={pageDescription}
        image={image}
        ogType={OGType.Profile}
        url={`/a/${author.id}`}
        structuredData={structuredData}
      />
      <div className="page mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="author-profile my-8 flex flex-col items-center space-y-4 rounded-2xl border border-[#dac9ab] bg-[rgba(255,252,245,0.9)] p-6 shadow-[0_14px_30px_rgba(42,30,18,0.1)] sm:flex-row sm:space-x-10 sm:space-y-0">
          <img
            src={author.profilePicture}
            alt={`${author.name}'s profile`}
            className="h-24 w-24 rounded-full border-2 border-[#cfb48b] object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="mb-2 text-3xl font-bold text-[#2f241c]">
              {author.name}
            </h1>
            <h5 className="mb-2 text-[#6d5e50]">
              {author.yearOfLife}
            </h5>
            <hr className="my-2 w-full border-[#ddcbae] sm:w-auto" />
            <p className="mt-4 text-sm text-[#5f5244]">
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
        .page {
          padding: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default AuthorPage;
