import type { ReactNode } from "react";
import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  backgroundImage?: string;
};

/** Shared internal-page introduction. Its spacing and accent treatment mirror
 * the approved home-page section headers without imposing identical copy. */
export default function PageHero({ eyebrow, title, description, children, backgroundImage }: PageHeroProps) {
  return (
    <section className="internal-page-hero relative overflow-hidden">
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          aria-hidden="true"
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />
      ) : null}
      <div className="internal-page-hero-orb internal-page-hero-orb-one" />
      <div className="internal-page-hero-orb internal-page-hero-orb-two" />
      <div className="relative z-10 mx-auto max-w-[1420px] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-22">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="brand-accent-line" />
            <p className="brand-eyebrow">{eyebrow}</p>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-[-0.045em] text-[#101827] sm:text-5xl lg:text-[64px]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#52617a] sm:text-lg">{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
