import Head from "next/head";
import { FC } from "react";

enum OGType {
  Profile = "profile",
  Article = "article",
  Website = "website",
}

interface MetaProps {
  title: string;
  description: string;
  image: string;
  url: string;
  ogType: OGType;
  titleSuffix?: string;
  robots?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ilalang.drepram.com";
const SITE_TITLE = "ilalang";
const SITE_DESCRIPTION = "mengabadikan ingatan";

const Meta: FC<MetaProps> = ({
  title,
  description,
  image,
  ogType,
  url,
  titleSuffix = " -- ilalang",
  robots = "index, follow",
  structuredData,
}) => {
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(
    image
  )}`;
  const canonicalUrl = `${SITE_URL}${url}`;
  const titleText = `${title}${titleSuffix ?? ""}`;

  return (
    <Head>
      <title>{titleText}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={`${description}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={titleText} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:description" content={`${description}`} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={titleText} />
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
    </Head>
  );
};

export default Meta;
export { OGType, type MetaProps, SITE_URL, SITE_TITLE, SITE_DESCRIPTION };
