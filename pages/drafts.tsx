import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Post as PostProps, Author as AuthorProps } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      published: false,
    },
    include: { author: { select: { name: true } } },
  });
  return {
    props: { drafts: JSON.parse(JSON.stringify(drafts)) },
  };
};

type PostWithAuthor = PostProps & {
  author: AuthorProps;
};

type Props = {
  drafts: PostWithAuthor[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="mb-4 text-3xl font-bold text-[#2f241c]">Tulisan Belum Tayang</h1>
        <main>
          <ul className="divide-y divide-[#d8c6a7]">
            {props.drafts.map((post) => (
              <li key={post.id} className="py-12">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  {/* <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-black-500 dark:text-black-400">
                  <time dateTime={post.date}>{post.date}</time>
                </dd>
              </dl> */}
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link href={`/p/${post.id}`} legacyBehavior>
                            <a className="text-[#2f241c]">
                              {post.title}
                            </a>
                          </Link>
                        </h3>
                        <div className="mr-3 text-sm font-medium text-[#944129] hover:text-[#7f2f20]">
                          {post.author.name}
                        </div>
                      </div>
                      <div className="prose max-w-none muted-text">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link href={`/p/${post.id}`} legacyBehavior>
                        <a
                          className="text-[#944129] hover:text-[#7f2f20]"
                          aria-label={`Read "${post.title}"`}
                        >
                          Baca &rarr;
                        </a>
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </main>
      </div>
      <style jsx>{`
        .page {
          border: 1px solid #dac9ab;
          border-radius: 16px;
          background: rgba(255, 252, 244, 0.82);
          padding: 1.5rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;
