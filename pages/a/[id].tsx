// import React from 'react';
// import { GetServerSideProps } from 'next';
// import { useSession, getSession } from 'next-auth/react';
// import Layout from '../../components/Layout';
// import Post, { PostProps } from '../../components/Post';
// import Author, { AuthorProps } from '../../components/Author';
// import prisma from '../../lib/prisma';

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const authorProfile = await prisma.post.findMany({
//       where: {
//         authorId: String(params?.id),
//         published: true
//       },
//       include: {
//         author: {
//           select: { name: true },
//         },
//       },
//     });
//     console.log(2,authorProfile)
//     return {
//       props: {
//         posts: JSON.parse(JSON.stringify(authorProfile)),
//         author: authorProfile[0].author
//       }
//     };
//   };

// type Props = {
//   posts: PostProps[];
//   author: AuthorProps;
// };

// const Drafts: React.FC<Props> = (props) => {
//   return (
//     <Layout>
//       <div className="page">
//         <h1>Writings of {props.author.name}</h1>
//         <main>
//           {props.posts.map((post) => (
//             <div key={post.id} className="post">
//               <Post post={post} />
//             </div>
//           ))}
//         </main>
//       </div>
//       <style jsx>{`
//         .post {
//           background: var(--geist-background);
//           transition: box-shadow 0.1s ease-in;
//         }

//         .post:hover {
//           box-shadow: 1px 1px 3px #aaa;
//         }

//         .post + .post {
//           margin-top: 2rem;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default Drafts;

// import React from 'react';
// import { GetServerSideProps } from 'next';
// import Layout from '../../components/Layout';
// import Post, { PostProps } from '../../components/Post';
// import prisma from '../../lib/prisma';

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const authorId = String(params?.id);

//   const author = await prisma.author.findUnique({
//     where: {
//       id: authorId,
//     },
//     select: {
//       name: true,
//     },
//   });

//   const posts = await prisma.post.findMany({
//     where: {
//       authorId: authorId,
//       published: true,
//     },
//   });

//   if (!author) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       posts: JSON.parse(JSON.stringify(posts)),
//       author: JSON.parse(JSON.stringify(author)),
//     },
//   };
// };

// type Props = {
//   posts: PostProps[];
//   author: {
//     name: string;
//   };
// };

// const Drafts: React.FC<Props> = ({ posts, author }) => {
//   if (!posts.length) {
//     return (
//       <Layout>
//         <div className="page">
//           <h1>{author.name} has not published any posts yet.</h1>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="page">
//         <h1>Writings of {author.name}</h1>
//         <main>
//           {posts.map((post) => (
//             <div key={post.id} className="post">
//               <Post post={post} />
//             </div>
//           ))}
//         </main>
//       </div>
//       <style jsx>{`
//         .post {
//           background: var(--geist-background);
//           transition: box-shadow 0.1s ease-in;
//         }

//         .post:hover {
//           box-shadow: 1px 1px 3px #aaa;
//         }

//         .post + .post {
//           margin-top: 2rem;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default Drafts;

import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Post, { PostProps } from '../../components/Post';
import PostsGrid from '../../components/PostsGrid';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const authorId = String(params?.id);

  const author = await prisma.author.findUnique({
    where: {
      id: authorId,
    },
    select: {
      name: true,
      profilePicture: true,
      yearOfLife: true,
      bio: true,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      authorId: authorId,
      published: true,
    },
  });

  if (!author) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      author: JSON.parse(JSON.stringify(author)),
    },
  };
};

type Props = {
  posts: PostProps[];
  author: {
    name: string;
    profilePicture: string;
    yearOfLife: string;
    bio: string;
  };
};

const Drafts: React.FC<Props> = ({ posts, author }) => {
  if (!posts.length) {
    return (
      <Layout>
        <div className="page">
          <h1>{author.name} has not published any posts yet.</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 */}
        {/* <div className="author-profile my-8 p-6 bg-white shadow rounded-lg flex items-center space-x-10">
          <img
            src={author.profilePicture}
            alt={`${author.name}'s profile`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-black-900 dark:text-black-100 mb-2">{author.name}</h1>
            <h5 className="text-gray-600 dark:text-gray-400 mb-2">{author.yearOfLife}</h5>
            // <div className='space-y-2'></div> 
            <hr></hr>
            <p className="text-gray-600 dark:text-gray-400 mt-4">{author.bio}</p>
          </div>
        </div> */}
        {/* <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Writings of {author.name}
        </h2> */}
        <div className="author-profile my-8 p-6 bg-white shadow rounded-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-10">
  <img
    src={author.profilePicture}
    alt={`${author.name}'s profile`}
    className="w-24 h-24 rounded-full object-cover"
  />
  <div className="text-center sm:text-left">
    <h1 className="text-3xl font-bold text-black-900 dark:text-black-100 mb-2">{author.name}</h1>
    <h5 className="text-gray-600 dark:text-gray-400 mb-2">{author.yearOfLife}</h5>
    <hr className="w-full sm:w-auto my-2"/>
    <p className="text-gray-600 dark:text-gray-400 mt-4">{author.bio}</p>
  </div>
</div>
        <main className="mt-6 space-y-6">
          
            <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
              <Post post={post} />
            ))}
              </div>
            </div>
        </main>
      </div>
      <style jsx>{`
        .post {
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .page {
          background: var(--geist-background);
          padding: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;