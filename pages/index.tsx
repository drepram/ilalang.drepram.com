import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import PostHomePage from "../components/PostHomePage";
import Card from "../components/Card";
import PageTitle from "../components/PageTitle";
import SectionContainer from "../components/SectionContainer";
import prisma from "../lib/prisma";
import { Author as TAuthor, Post as TPost } from "@prisma/client";
import Meta, {
  OGType,
  SITE_TITLE,
  SITE_URL,
} from "../components/Meta";

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

const metaTitle = `${SITE_TITLE} -- mengabadikan ingatan`;
const metaDescription =
  "Repositori karya para ilalang dari 1946 sampai 1965. Melawan kekerasan negara dengan mengabadikan ingatan mereka yang sengaja dilupakan.";

const Blog: React.FC<Props> = ({ feed, authors }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ilalang",
    url: SITE_URL,
    description: metaDescription,
    inLanguage: "id-ID",
  };

  return (
    <Layout>
      <Meta
        title={metaTitle}
        titleSuffix=""
        description={metaDescription}
        image="/assets/og.png"
        ogType={OGType.Website}
        url="/"
        structuredData={structuredData}
      />
      <SectionContainer>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <PageTitle>mengabadikan ingatan</PageTitle>
          <p className="text-lg leading-7 muted-text">
            Seperti ilalang yang tidak diinginkan petani di ladang mereka, dalam situs ini dihimpun sajak‐sajak dari para "ilalang" dalam semesta sejarah puitika Indonesia. Bukan atas kehendak sendiri, nama dan karya mereka disingkirkan, seluruhnya atas pertimbangan politik ingatan, dibayangi kekerasan negara, yang menjadikan para perangkai kata sebagai <i>pariah</i>, bahkan harus menggelandang puluhan tahun di luar negeri.
          </p>
        </div>

        <div className="divide-y soft-divider">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h2 className="section-title font-extrabold tracking-tight">
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

        <div className="divide-y soft-divider">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h2 className="section-title font-extrabold tracking-tight">
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
