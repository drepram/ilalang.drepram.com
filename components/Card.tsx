import Link from "next/link";

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div className={`${imgSrc && "h-full"} editor-card overflow-hidden`}>
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`} className="block">
            <img
              alt={title}
              src={imgSrc}
              className="h-[220px] w-full object-cover object-center md:h-36 lg:h-48"
              loading="lazy"
            />
          </Link>
        ) : (
          <img
            alt={title}
            src={imgSrc}
            className="h-[220px] w-full object-cover object-center md:h-36 lg:h-48"
            loading="lazy"
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight text-[#2f241c]">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`} legacyBehavior>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none muted-text">
          {description}
        </p>
        {/* {href && (
          <div className="text-base font-medium leading-6 text-[#944129] hover:text-[#7f2f20]">
            <Link href={href} aria-label={`Link to ${title}`} legacyBehavior>
              Profil &rarr;
            </Link>
          </div>
        )} */}
      </div>
    </div>
  </div>
);

export default Card;
