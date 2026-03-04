import React from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import SectionContainer from "../components/SectionContainer";
import Meta, {
  OGType,
  SITE_TITLE,
  SITE_URL,
} from "../components/Meta";

const metaTitle = `tentang ${SITE_TITLE} -- di antara mutiara`;
const metaDescription =
  "Latar belakang ilalang: arsip karya sastra yang melawan kekerasan budaya dan politik ingatan melalui penghimpunan karya yang sengaja disisihkan.";

const Blog: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: SITE_TITLE,
    url: `${SITE_URL}/tentang`,
    description: metaDescription,
    inLanguage: "id-ID",
    isPartOf: {
      "@type": "WebSite",
      name: "ilalang",
      url: SITE_URL,
    },
  };

  return (
    <Layout>
      <Meta
        title={metaTitle}
        titleSuffix=""
        description={metaDescription}
        image="/assets/og.png"
        ogType={OGType.Website}
        url="/tentang"
        structuredData={structuredData}
      />
      <SectionContainer>
        <div className="space-y-5 pb-8 pt-5 md:space-y-6 md:pt-6">
          <PageTitle>di antara mutiara</PageTitle>
          <h2 className="-mt-1 text-xl italic leading-relaxed text-[#6a5442] sm:text-2xl">
            Melawan Kekerasan Negara. Mengabadikan Ingatan.
          </h2>

          <div className="flex items-center justify-center py-3 md:py-4">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#c9b18a] bg-gradient-to-br from-[#fff9ec] via-[#f8e9c6] to-[#ecd9b1] p-4 shadow-[0_18px_42px_rgba(50,34,16,0.22)]">
              <div className="rounded-2xl border border-[#f8efdc] bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.85),rgba(246,228,188,0.72)_55%,rgba(214,180,121,0.6))] p-4">
                <img
                  src="/assets/logo.png"
                  alt="Logo ilalang"
                  className="h-28 w-28 object-contain drop-shadow-[0_6px_12px_rgba(90,57,24,0.35)] sm:h-36 sm:w-36"
                />
              </div>
            </div>
          </div>

          <div className="muted-text space-y-5 text-base leading-8 sm:text-lg">
            <p>
              Apa yang hari ini kita anggap sebagai ilalang, bisa jadi adalah
              mutiara yang dipaksa menguncup. Dalam sejarah sastra Indonesia,
              ada nama-nama yang sengaja disingkirkan dan karyanya dikubur
              hidup-hidup -- bukan karena tak bernilai, tapi karena <strong>politik
              ingatan</strong> dan represi negara yang membuat para perangkai katanya
              menjadi pariah, bahkan harus terasing puluhan tahun di negeri orang.
            </p>

            <p>
              Situs ini hadir sebagai rumah bagi mereka yang &quot;dilupakan&quot;.
              Di sini, kami menghimpun lebih dari <strong>326 karya</strong> (puisi,
              cerpen, hingga drama) dari sosok seperti <strong>Agam Wispi, Hadi S., Sobron Aidit, Sabar Anantaguna, A.S. Dharta, H.R. Bandaharo, F.L. Risakotta, Bakri Siregar, Sugiarti Siswadi, dan Siti Rukiah Kertapati</strong>. Mereka adalah bagian dari <strong>Lembaga
              Kebudajaan Rakjat (Lekra)</strong> -- sebuah gerakan
              budaya yang lahir pada 17 Agustus 1950, namun dihancurkan dalam
              badai kekerasan 1965-1966.
            </p>

            <h3 className="pt-2 text-2xl font-semibold leading-tight text-[#3a2d23]">
              Mengapa Kita Harus Membaca Mereka Lagi?
            </h3>

            <p>
              Karya-karya di situs ini bukan sekadar barisan kata, melainkan <strong>zeitgeist</strong> (semangat zaman) yang jujur. Mereka
              menyuarakan penderitaan rakyat kecil -- kaum tani dan nelayan yang
              dirampas haknya -- yang seringkali tak mampu membela diri di hadapan
              penguasa dan tuan tanah.
            </p>

            <p>
              Menghapus karya-karya ini adalah bentuk <strong>kekerasan budaya</strong> (Herlambang, 2013) yang dilakukan secara sistematis oleh Orde Baru.
              Kami ingin memulihkan ingatan itu, terutama bagi <strong>Generasi Z</strong>,
              agar tidak terputus secara spiritual dari sejarah bangsanya sendiri.
              Apa yang dulu dibuang bagai tebu habis sepah, kini kami beri tempat
              yang mulia dan terhormat.
            </p>

            <hr className="border-[#d8c2a1]" />

            <h3 className="text-2xl font-semibold leading-tight text-[#3a2d23]">
              Kerja Kolektif &amp; Arsip
            </h3>

            <p>
              Proyek ini adalah upaya mandiri yang didukung oleh semangat
              kawan-kawan:
            </p>

            <ul className="list-disc space-y-3 pl-6 marker:text-[#9a6a34]">
              <li>
                <strong>Sumber Data:</strong> Dihimpun dari <em>Dokumenter Yayasan
                Lontar, Inside Indonesia, sejarahsosial.org, tribunal1965.org,
                budidayak.blogspot.com,</em> hingga <em>British Library</em>.
              </li>
              <li>
                <strong>Tim Pendukung:</strong> Profil penulis disusun oleh
                <a
                  className="text-[#944129] hover:underline"
                  href="https://x.com/ChrisWibisana"
                >
                  {" "}Chris Wibisana
                </a>
                , pengarsipan dibantu oleh
                <a
                  className="text-[#944129] hover:underline"
                  href="https://x.com/pribumi_merah"
                >
                  {" "}Alfian Widi Santoso
                </a>
                , dan performa situs dioptimasi oleh
                <a
                  className="text-[#944129] hover:underline"
                  href="https://x.com/gitcommitsudoku"
                >
                  {" "}Urwatil Wutsqo
                </a>
                .
              </li>
            </ul>

            <p>
              Situs ini juga terhubung dengan proyek
              <a
                className="text-[#944129] hover:underline"
                href="https://kabe.drepram.com"
              >
                {" "}<strong>Kacabenggala Editions</strong>
              </a>, sebuah upaya merestorasi buku-buku yang
              sudah tidak lagi beredar (<em>out-of-print</em>).
            </p>

            <hr className="border-[#d8c2a1]" />

            <p>
              <strong>Mari Berdiskusi</strong>
              <br />
              Hampir seluruh konten situs ini saya bangun secara mandiri. Jika
              Anda menemukan kesalahan pengetikan atau memiliki masukan,
              silakan sapa saya di <strong>Twitter/X</strong> (
              <a
                className="text-[#944129] hover:underline"
                href="https://twitter.com/drepram"
              >
                @drepram
              </a>
              ). Selamat membaca dan mari mengabadikan ingatan.
            </p>
          </div>
        </div>

        {/* <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
         {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio maiores eveniet iste unde nesciunt provident fugit. Eaque culpa eos quasi. Quo, nobis fugit impedit dignissimos debitis doloremque corrupti? Facilis?
          </div>
        </div>
      </div> */}
      </SectionContainer>
    </Layout>
  );
};

export default Blog;
