import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import SectionContainer from "../../components/SectionContainer";
import Meta, { OGType } from "../../components/Meta";
import prisma from "../../lib/prisma";

type Props = {
  stats: {
    totalPoems: number;
  };
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const totalPoems = await prisma.post.count({ where: { published: true } });

  return {
    props: {
      stats: {
        totalPoems,
      },
    },
  };
};

const CurrentStatsPage: React.FC<Props> = ({ stats }) => {
  return (
    <Layout>
      <Meta
        title="Current Stats -- ilalang"
        titleSuffix=""
        description="Statistik konten ilalang saat ini untuk admin."
        image="/assets/og.png"
        ogType={OGType.Website}
        robots="noindex, nofollow"
        url="/current/stats"
      />
      <SectionContainer>
        <div className="space-y-3 pb-8 pt-6">
          <PageTitle>Current Stats</PageTitle>
          <p className="muted-text text-base sm:text-lg">
            Ringkasan konten yang terhimpun di basis data.
          </p>
        </div>

        <div className="max-w-sm">
          <div className="editor-card p-5">
            <p className="text-sm uppercase tracking-[0.12em] text-[#7b6955]">
              Puisi tayang
            </p>
            <p className="mt-2 text-4xl font-extrabold leading-none text-[#2f241c]">
              {stats.totalPoems}
            </p>
          </div>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default CurrentStatsPage;
