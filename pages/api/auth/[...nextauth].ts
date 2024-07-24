import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';

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

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

// import { NextApiHandler } from 'next';
// import NextAuth from 'next-auth';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import prisma from '../../../lib/prisma';

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "your-email@example.com" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials, req) {
//         const { username, password } = credentials;

//         // Replace this logic with your user lookup logic
//         if (username === 'di' && password === process.env.AUTH_PASSWORD) {
//           const user = await prisma.user.findUnique({ where: { email: username } });
//           if (user) {
//             return user;
//           }
//         }

//         // Return null if user data could not be retrieved
//         return null;
//       }
//     })
//   ],
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.SECRET,
//   callbacks: {
//     async session({ session, user }) {
//       if (session?.user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//   },
// };

// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
// export default authHandler;