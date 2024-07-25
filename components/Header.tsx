import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className={`left ${!session ? "flex justify-center w-full" : "ml-10"}`}>
      <Link legacyBehavior href="/">
        <a className="bold" data-active={!isActive("/")}>
          ilalang
        </a>
      </Link>
      {session && (
        <Link legacyBehavior href="/drafts">
          <a data-active={!isActive("/drafts")}>My drafts</a>
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

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === "loading") {
    right = false;
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
    );
  } else if (session) {
    right = (
      <div className="right mr-10">
        <p>({session.user?.email})</p>
        <Link legacyBehavior href="/create/post">
          <button>
            <a>New post</a>
          </button>
        </Link>
        <Link legacyBehavior href="/create/author">
          <button>
            <a>New author</a>
          </button>
        </Link>
        <Link legacyBehavior href="/edit/post">
          <button>
            <a>Edit post</a>
          </button>
        </Link>
        <Link legacyBehavior href="/edit/author">
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
    );
  }

  return (
    <header className="flex items-center justify-between py-10">
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </header>
  );
};

export default Header;