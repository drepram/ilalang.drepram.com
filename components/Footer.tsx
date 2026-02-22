import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[#dcc8a9] px-4 py-6 sm:px-8">
      <div className="flex flex-col items-center gap-2 text-sm text-[#665a4d] sm:flex-row sm:justify-between">
        <p>berdiri sejak 17 Agustus 2024</p>
        <Link href="/tentang" className="font-medium text-[#944129] hover:underline">
          tentang ilalang
        </Link>
      </div>
    </footer>
  );
}
