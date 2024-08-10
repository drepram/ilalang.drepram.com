import Head from "next/head";
import { FC } from "react";

enum OGType {
  Profile = "profile",
  Article = "article",
}

interface MetaProps {
  title: string;
  description: string;
  image: string;
  url: string;
  ogType: OGType;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ilalang.drepram.com";

const Meta: FC<MetaProps> = ({ title, description, image, ogType, url }) => {
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(
    image
  )}`;

  return (
    <Head>
      <title>{title} -- ilalang</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} -- ilalang`} />
      <meta property="og:description" content={`${description}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${SITE_URL}${url}`} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} -- ilalang`} />
      <meta name="twitter:description" content={`${description}`} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
    </Head>
  );
};

export default Meta;
export { OGType, type MetaProps };
