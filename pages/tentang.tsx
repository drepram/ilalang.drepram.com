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

const Blog: React.FC = (props) => {
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
        <div className="space-y-4 pb-8 pt-5 md:space-y-5 md:pt-6">
          <PageTitle>di antara mutiara</PageTitle>
          <div className="flex items-center justify-center py-2 md:py-3">
            <div className="rounded-2xl border border-[#d2be9c] bg-[rgba(255,251,242,0.88)] p-3 shadow-[0_10px_24px_rgba(40,28,18,0.14)]">
              <img
                src="/assets/logo.png"
                alt="Logo ilalang"
                className="h-24 w-24 object-contain sm:h-28 sm:w-28"
              />
            </div>
          </div>
          <p className="muted-text text-base leading-8 sm:text-lg">
          Gambar diatas menggambarkan mutiara, tetapi oleh orang lain dianggap ilalang. Dipaksa menguncup, tidak mekar berkembang.
          <br/><br/>
          Seperti ilalang yang tidak diinginkan petani di ladang mereka, dalam situs ini dihimpun sajak‐sajak dari para "ilalang" dalam semesta sejarah puitika Indonesia. Bukan atas kehendak sendiri, nama dan karya mereka disingkirkan, seluruhnya atas pertimbangan politik ingatan, dibayangi kekerasan negara, yang menjadikan para perangkai kata sebagai <i>pariah</i>, bahkan harus menggelandang puluhan tahun di luar negeri.
          <br /><br />
          Dalam situs ini terhimpun 260 karya puisi, cerpen, drama dari <i>Agam Wispi</i>, <i>Sobron Aidit</i>, <i>Bakri Siregar</i>, <i>Sugiarti Siswadi</i>, <i>S. Anantaguna</i> dan masih banyak lagi karya sastra Indonesia pada situs ini, yang pada masa puncak kesastraannya, tergabung sebagai anggota Lembaga Kebudajaan Rakjat (Lekra), organisasi seniman dan seniwati yang berdiri pada 17 Agustus 1950 dan turut dihancurkan dalam pembunuhan massal 1965‐1966. 
          <br /><br />
          Menjiwai <i>zeitgeist</i> atau semangat zamannya, karya‐karya Agam, Sobron, Bakri, Sugiarti maupun sastrawan lainnya pada situs ini mencerminkan pandangan sikap Lekra terhadap penderitaan rakyat banyak, yang tidak mampu membela diri di hadapan kesewenang‐wenangan tuan tanah, tengkulak, dan juragan. Getir nasib mereka melantun dalam getaran jiwa seorang sastrawan, mengalir dalam untaian kata‐kata, dahulu sebagai karya seni, dan kini sebagai kepingan fragmen sejarah sosial yang coba dihapuskan dengan berbagai cara, yang halal maupun yang lancung.
          <br /><br />
          Puisi-puisi maupun karya-karya lain mereka yang sengaja dilupakan adalah bagian dari seluruh rangkaian kekerasan budaya (Herlambang, 2013) yang secara sistematis dikerjakan oleh negara Orde Baru. Dengan jalan yang sama pula, maka penderitaan kaum tani miskin dan nelayan papa, yang dirampas tanahnya dan dimiskinkan hidupnya, tidak lagi dimuliakan dalam karya seni, tetapi dibuang bagai tebu habis sepah.
          <br /><br />
          Melalui situs ini, kiranya karya‐karya Agam, Sobron, Bakri, Sugiarti, dan mereka disini bisa kembali didengar dan diingat, secara khusus oleh Generasi Z yang terputus secara spiritual dari gelora zaman tatkala para sastrawan Lekra itu memublikasikan karya mereka di lembar kebudayaan surat kabar <i>Harian Rakjat</i>, organ resmi Partai Komunis Indonesia. 
          <br /><br />
          Usaha kecil mengabadikan ingatan tentang karya-karya sastra pengungkap kebenaran, sehingga yang dilupakan, kini mendapatkan tempat yang mulia dan terhormat, dalam sejarah kebudayaan bangsa Indonesia.
          <br /><br />
          Gambar pada situs ini dihimpun dari <strong>Dokumenter Yayasan Lontar, Inside Indonesia</strong>, serta beberapa layaknya <a className="text-[#944129] hover:underline" href="https://sejarahsosial.org">sejarahsosial.org</a>, <a className="text-[#944129] hover:underline" href="https://tribunal1965.org">tribunal1965.org</a>, <a className="text-[#944129] hover:underline" href="https://budidayak.blogspot.com/">budidayak.blogspot.com</a>, <a className="text-[#944129] hover:underline" href="https://bl.iro.bl.uk/uv/uv.html#?manifest=https://bl.iro.bl.uk/concern/generic_works/a07bc85f-01b2-4bf1-b1cf-9354836038f1/manifest&config=https://bl.iro.bl.uk/uv/uv-config.json">British Library</a>. 
          <br/><br/>
          Untuk penulisan profil para penulis dibantu oleh saudara <a className="text-[#944129] hover:underline" href="https://x.com/ChrisWibisana">Chris Wibisana</a>, arsip dan penghimpunannya dibantu oleh kawan <a className="text-[#944129] hover:underline" href="https://x.com/pribumi_merah">Alfian Widi S.</a>, dan optimalisasi kecepatan situs dibantu oleh kawan <a className="text-[#944129] hover:underline" href="https://x.com/gitcommitsudoku">Wutsqo</a>.
          <br/><br/>
          Perancangan, pembangunan, serta hampir semua penghimpunan konten dari situs ini dikerjakan oleh saya sendiri. Kontak <a className="text-[#944129] hover:underline" href="https://twitter.com/drepram">saya</a> di Twitter jika ada tulisan disini yang tidak benar pengetikannya ataupun juga masukan lainnya. Selamat membaca.
          </p>
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
