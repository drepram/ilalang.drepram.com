import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-[#dac9ab] bg-[rgba(255,252,245,0.92)] backdrop-blur">
      <div className="flex flex-col gap-3 px-4 py-3 sm:px-8 sm:py-4">
        <div
          className={`flex items-center gap-3 ${
            status !== "loading" && session ? "justify-between" : "justify-center"
          }`}
        >
          <Link href="/" className="text-2xl font-bold tracking-wide text-[#3f2d22] sm:text-3xl">
            ilalang
          </Link>
          {status !== "loading" && session && (
            <p className="truncate text-xs text-[#6f5f4f]">{session.user?.email}</p>
          )}
        </div>

        {status !== "loading" && session && (
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              href="/drafts"
              className={`rounded-full px-3 py-1 ${
                isActive("/drafts")
                  ? "bg-[#ead7b8] text-[#3b2b1f]"
                  : "text-[#755843]"
              }`}
            >
              Draft
            </Link>
            <Link href="/create/post" className="btn-secondary text-sm">
              Tulis
            </Link>
            <Link href="/create/author" className="btn-secondary text-sm">
              Penulis Baru
            </Link>
            <Link href="/edit/post" className="btn-secondary text-sm">
              Sunting Tulisan
            </Link>
            <Link href="/edit/author" className="btn-secondary text-sm">
              Sunting Penulis
            </Link>
            <button onClick={() => signOut()} className="btn-primary text-sm">
              Keluar
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
