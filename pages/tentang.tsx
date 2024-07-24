import React from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import SectionContainer from "../components/SectionContainer";

const Blog: React.FC = (props) => {
  return (
    <Layout>
      <SectionContainer>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <PageTitle>ilalang -- di antara mutiara</PageTitle>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Ilalang adalah gulma yang tidak diinginkan oleh petani di lahan mereka, karena daunnya yang tajam menyulitkan orang untuk mengolah tanah. Beberapa orang malang terpaksa menjadi penyintas seperti gulma selama puluhan tahun. 
          <br /><br />
          Situs ini bertujuan untuk mencatat hasil karya dari jiwa-jiwa para gulma tersebut. Lebih dari itu, situs ini bertujuan untuk mengumpulkan puisi-puisi maupun karya-karya lain dari mereka yang telah dilupakan oleh zaman. Mereka adalah korban dari kekerasan yang dilakukan secara sistematis oleh negara. Dengan kekerasan yang dilembagakan, banyak individu yang kehilangan suara dan hak mereka. 
          <br /><br />
          Melalui situs ini, suara mereka yang hilang diharapkan bisa kembali didengar, serta karya-karya mereka bisa mendapatkan tempat yang layak dalam sejarah dan budaya kita.
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
