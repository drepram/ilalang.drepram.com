import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => {
  if (req.url === "/api/auth/signin" && process.env.NODE_ENV === "production") {
    res.statusCode = 404;
    res.json("୭₊˚🎀 ilalang ✿ ·˚ ₊");
  }
  const handler = NextAuth(req, res, authOptions);
  return handler;
};

export default authHandler;
