import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import SectionContainer from "../../components/SectionContainer";
import PageTitle from "../../components/PageTitle";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, id: true },
      },
    },
  });
  return {
    props: JSON.parse(JSON.stringify(post)),
  };
};

async function modifyPost(): Promise<void> {
  Router.push("/edit/post");
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.id === props.userId;
  let title = props.title;
  let authorUrl = `/a/${props.author.id}`;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <SectionContainer>
        <article className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <div>
                <h1 className="text-sm mb-10">
                  <Link legacyBehavior href={authorUrl}>
                    <span className="text-fuchsia-500 hover:underline">&larr; {props.author.name}</span>
                  </Link>
                </h1>
                <PageTitle>
                  <ReactMarkdown>{title}</ReactMarkdown>
                </PageTitle>
              </div>
            </div>
          </header>
          <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                <ReactMarkdown
                  children={props.content}
                  rehypePlugins={[rehypeRaw] as any}
                  components={{
                    pre({ children }) {
                      return (
                        <pre className="whitespace-pre-wrap break-words bg-gray-100 p-4 rounded-md overflow-x-auto w-full">
                          {children}
                        </pre>
                      );
                    },
                    code({ node, inline, className, children, ...props }) {
                      return (
                        <code
                          className={`${className} whitespace-pre-wrap break-words`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              </div>
            </div>
            {userHasValidSession && postBelongsToUser && (
              <div className="pt-4 xl:pt-8">
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
      </SectionContainer>
    </Layout>
  );
};

export default Post;