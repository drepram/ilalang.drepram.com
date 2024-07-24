// // import React from 'react';
// // import Link from './Link';
// // import { useRouter } from 'next/router';
// // import { signOut, useSession } from 'next-auth/react';

// // const Header: React.FC = () => {
// //   const router = useRouter();
// //   const isActive: (pathname: string) => boolean = (pathname) =>
// //     router.pathname === pathname;

// //   const { data: session, status } = useSession();

// //   let left = (
// //     <div className="left">
// //       <Link href="/">
// //         <a className="bold" data-active={!isActive('/')}>
// //           Feed
// //         </a>
// //       </Link>
// //       {/* <style jsx>{`
// //         .bold {
// //           font-weight: bold;
// //         }

// //         a {
// //           text-decoration: none;
// //           color: var(--geist-foreground);
// //           display: inline-block;
// //         }

// //         .left a[data-active='true'] {
// //           color: gray;
// //         }

// //         a + a {
// //           margin-left: 1rem;
// //         }
// //       `}</style> */}
// //     </div>
// //   );

// //   let right = null;

// //   if (status === 'loading') {
// //     left = (
// //       <div className="left">
// //         <Link href="/">
// //           <a className="bold" data-active={!isActive('/')}>
// //             Feed
// //           </a>
// //         </Link>
// //         <style jsx>{`
// //           .bold {
// //             font-weight: bold;
// //           }

// //           a {
// //             text-decoration: none;
// //             color: var(--geist-foreground);
// //             display: inline-block;
// //           }

// //           .left a[data-active='true'] {
// //             color: gray;
// //           }

// //           a + a {
// //             margin-left: 1rem;
// //           }
// //         `}</style>
// //       </div>
// //     );
// //     right = (
// //       <div className="right">
// //         <p>Validating session ...</p>
// //         <style jsx>{`
// //           .right {
// //             margin-left: auto;
// //           }
// //         `}</style>
// //       </div>
// //     );
// //   }

// //   if (!session) {
// //     right = (
// //       <div className="right">
// //         <Link href="/api/auth/signin">
// //           <a data-active={!isActive('/signup')}>Log in</a>
// //         </Link>
// //         <style jsx>{`
// //           a {
// //             text-decoration: none;
// //             color: var(--geist-foreground);
// //             display: inline-block;
// //           }

// //           a + a {
// //             margin-left: 1rem;
// //           }

// //           .right {
// //             margin-left: auto;
// //           }

// //           .right a {
// //             border: 1px solid var(--geist-foreground);
// //             padding: 0.5rem 1rem;
// //             border-radius: 3px;
// //           }
// //         `}</style>
// //       </div>
// //     );
// //   }

// //   if (session) {
// //     left = (
// //       <div className="left">
// //         <Link href="/">
// //           <a className="bold" data-active={!isActive('/')}>
// //             Feed
// //           </a>
// //         </Link>
// //         <Link href="/drafts">
// //           <a data-active={!isActive('/drafts')}>My drafts</a>
// //         </Link>
// //         <style jsx>{`
// //           .bold {
// //             font-weight: bold;
// //           }

// //           a {
// //             text-decoration: none;
// //             color: var(--geist-foreground);
// //             display: inline-block;
// //           }

// //           .left a[data-active='true'] {
// //             color: gray;
// //           }

// //           a + a {
// //             margin-left: 1rem;
// //           }
// //         `}</style>
// //       </div>
// //     );
// //     right = (
// //       <div className="right">
// //         <p>
// //           ({session.user.email})
// //         </p>
// //         <Link href="/create/post">
// //           <button>
// //             <a>New post</a>
// //           </button>
// //         </Link>
// //         <Link href="/create/author">
// //           <button>
// //             <a>New author</a>
// //           </button>
// //         </Link>
// //         <Link href="/edit/post">
// //           <button>
// //             <a>Edit post</a>
// //           </button>
// //         </Link>
// //         <Link href="/edit/author">
// //           <button>
// //             <a>Edit author</a>
// //           </button>
// //         </Link>
// //         <button onClick={() => signOut()}>
// //           <a>Log out</a>
// //         </button>
// //         <style jsx>{`
// //           a {
// //             text-decoration: none;
// //             color: var(--geist-foreground);
// //             display: inline-block;
// //           }

// //           p {
// //             display: inline-block;
// //             font-size: 13px;
// //             padding-right: 1rem;
// //           }

// //           a + a {
// //             margin-left: 1rem;
// //           }

// //           .right {
// //             margin-left: auto;
// //           }

// //           .right a {
// //             border: 1px solid var(--geist-foreground);
// //             padding: 0.5rem 1rem;
// //             border-radius: 3px;
// //           }

// //           button {
// //             border: none;
// //           }
// //         `}</style>
// //       </div>
// //     );
// //   }

// //   return (
// //     <nav>
// //       {left}
// //       {right}
// //       <style jsx>{`
// //         nav {
// //           display: flex;
// //           padding: 2rem;
// //           align-items: center;
// //         }
// //       `}</style>
// //     </nav>
// //   );
// // };

// // export default Header;

// // import headerNavLinks from '@/data/headerNavLinks'
// // import Logo from '@/data/logo.svg'
// import Link from './Link'
// import MobileNav from './MobileNav'
// import ThemeSwitch from './ThemeSwitch'
// import { useRouter } from 'next/router'
// import { signOut, useSession } from 'next-auth/react'

// const Header = () => {
//   const router = useRouter()
//   const isActive = (pathname) => router.pathname === pathname

//   const { data: session, status } = useSession()

//   let left = (
//     <div className="left ml-10">
//       {/* <Link href="/" aria-label={`ilalang`}>
//         <div className="flex items-center justify-between">
//           <div className="mr-3">
//             <Logo />
//           </div>
//           {typeof `ilalang` === 'string' ? (
//             <div className="hidden h-6 text-2xl font-semibold sm:block">
//               {`ilalang`}
//             </div>
//           ) : (
//             `ilalang`
//           )}
//         </div>
//       </Link> */}
//       <Link href="/">
//         <a className="bold" data-active={!isActive('/')}>
//           ilalang
//         </a>
//       </Link>
//       {session && (
//         <Link href="/drafts">
//           <a data-active={!isActive('/drafts')}>My drafts</a>
//         </Link>
//       )}
//       <style jsx>{`
//         .bold {
//           font-weight: bold;
//         }

//         a {
//           text-decoration: none;
//           color: var(--geist-foreground);
//           display: inline-block;
//         }

//         .left a[data-active='true'] {
//           color: gray;
//         }

//         a + a {
//           margin-left: 1rem;
//         }
//       `}</style>
//     </div>
//   )

//   let right = null

//   if (status === 'loading') {
//     right = (
//       <div className="right">
//         <p>Validating session ...</p>
//         <style jsx>{`
//           .right {
//             margin-left: auto;
//           }
//         `}</style>
//       </div>
//     )
//   } else if (!session) {
//     // right = (
//     //   <div className="right">
//     //     <Link href="/api/auth/signin">
//     //       <a data-active={!isActive('/signup')}>Log in</a>
//     //     </Link>
//     //     <style jsx>{`
//     //       a {
//     //         text-decoration: none;
//     //         color: var(--geist-foreground);
//     //         display: inline-block;
//     //       }

//     //       a + a {
//     //         margin-left: 1rem;
//     //       }

//     //       .right {
//     //         margin-left: auto;
//     //       }

//     //       .right a {
//     //         border: 1px solid var(--geist-foreground);
//     //         padding: 0.5rem 1rem;
//     //         border-radius: 3px;
//     //       }
//     //     `}</style>
//     //   </div>
//     // )
//   } else if (session) {
//     right = (
//       <div className="right mr-10">
//         <p>({session.user.email})</p>
//         <Link href="/create/post">
//           <button>
//             <a>New post</a>
//           </button>
//         </Link>
//         <Link href="/create/author">
//           <button>
//             <a>New author</a>
//           </button>
//         </Link>
//         <Link href="/edit/post">
//           <button>
//             <a>Edit post</a>
//           </button>
//         </Link>
//         <Link href="/edit/author">
//           <button>
//             <a>Edit author</a>
//           </button>
//         </Link>
//         <button onClick={() => signOut()}>
//           <a>Log out</a>
//         </button>
//         <style jsx>{`
//           a {
//             text-decoration: none;
//             color: var(--geist-foreground);
//             display: inline-block;
//           }

//           p {
//             display: inline-block;
//             font-size: 13px;
//             padding-right: 1rem;
//           }

//           a + a {
//             margin-left: 1rem;
//           }

//           .right {
//             margin-left: auto;
//           }

//           .right a {
//             border: 1px solid var(--geist-foreground);
//             padding: 0.5rem 1rem;
//             border-radius: 3px;
//           }

//           button {
//             border: none;
//           }
//         `}</style>
//       </div>
//     )
//   }

//   return (
//     <header className="flex items-center justify-between py-10">
//       {left}
//       <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
//         {/* {headerNavLinks
//           .filter((link) => link.href !== '/')
//           .map((link) => (
//             <Link
//               key={link.title}
//               href={link.href}
//               className="hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400 sm:block"
//             >
//               {link.title}
//             </Link>
//           ))} */}
//         {/* <ThemeSwitch />
//         <MobileNav /> */}
//       </div>
//       {right}
//       <style jsx>{`
//         nav {
//           display: flex;
//           padding: 2rem;
//           align-items: center;
//         }
//       `}</style>
//     </header>
//   )
// }

// export default Header

import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

const Header = () => {
  const router = useRouter()
  const isActive = (pathname) => router.pathname === pathname

  const { data: session, status } = useSession()

  let left = (
    <div className={`left ${!session ? 'flex justify-center w-full' : 'ml-10'}`}>
      <Link href="/">
        <a className="bold" data-active={!isActive('/')}>
          ilalang
        </a>
      </Link>
      {session && (
        <Link href="/drafts">
          <a data-active={!isActive('/drafts')}>My drafts</a>
        </Link>
      )}
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active='true'] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  )

  let right = null

  if (status === 'loading') {
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    )
  } else if (!session) {
    right = (
      <div className="right">
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    )
  } else if (session) {
    right = (
      <div className="right mr-10">
        <p>({session.user.email})</p>
        <Link href="/create/post">
          <button>
            <a>New post</a>
          </button>
        </Link>
        <Link href="/create/author">
          <button>
            <a>New author</a>
          </button>
        </Link>
        <Link href="/edit/post">
          <button>
            <a>Edit post</a>
          </button>
        </Link>
        <Link href="/edit/author">
          <button>
            <a>Edit author</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    )
  }

  return (
    <header className="flex items-center justify-between py-10">
      {left}
      {session && (
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {/* {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400 sm:block"
              >
                {link.title}
              </Link>
            ))} */}
          {/* <ThemeSwitch />
          <MobileNav /> */}
        </div>
      )}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </header>
  )
}

export default Header