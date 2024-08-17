import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import PostHomePage from "../components/PostHomePage";
import Card from "../components/Card";
import PageTitle from "../components/PageTitle";
import SectionContainer from "../components/SectionContainer";
import prisma from "../lib/prisma";
import { Author as TAuthor, Post as TPost } from "@prisma/client";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post
    .findMany({
      where: {
        highlighted: true,
        published: true,
      },
      include: {
        author: true,
      },
    })
    .then((posts) => JSON.parse(JSON.stringify(posts)));

  const authors = await prisma.author
    .findMany()
    .then((authors) => JSON.parse(JSON.stringify(authors)));

  return {
    props: {
      feed,
      authors,
    },
    revalidate: 60 * 10,
  };
};

type PostWithAuthor = TPost & { author: TAuthor };

type Props = {
  feed: PostWithAuthor[];
  authors: TAuthor[];
};

const Blog: React.FC<Props> = ({ feed, authors }) => {
  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <title>{`ilalang -- di antara mutiara`}</title>
        <meta
          name="description"
          content={`Repositori Karya Para Ilalang`}
        />
      </Head>
      <SectionContainer>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <PageTitle>ilalang -- di antara mutiara</PageTitle>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Seperti ilalang yang tidak diinginkan petani di ladang mereka, dalam situs ini dihimpun sajak‐sajak dari para "ilalang" dalam semesta sejarah puitika Indonesia. Bukan atas kehendak sendiri, nama dan karya mereka disingkirkan, seluruhnya atas pertimbangan politik ingatan, dibayangi kekerasan negara, yang menjadikan para perangkai kata sebagai <i>pariah</i>, bahkan harus menggelandang puluhan tahun di luar negeri.
          </p>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-black-900 dark:text-black-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
              Mutiara
            </h2>
          </div>
          <div className="container py-12">
            <div className="-m-4 flex flex-wrap">
              {authors.map((author) => (
                <Card
                  key={author.id}
                  title={author.name}
                  description={author.description || "No description available"}
                  imgSrc={author.profilePicture || "/default-profile.png"}
                  href={`/a/${author.id}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-black-900 dark:text-black-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
              Sorotan
            </h2>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {feed.map((post) => (
                <PostHomePage key={post.id} post={post} author={post.author} />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Blog;
