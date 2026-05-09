"use client";

type ShowcaseImage = {
  src: string;
  alt: string;
};

const showcaseImages: ShowcaseImage[] = [
  { src: "/collage.jpg", alt: "Destiny Helpers Outreach community moment 1" },
  { src: "/collage2.jpg", alt: "Destiny Helpers Outreach community moment 2" },
  { src: "/collage3.jpg", alt: "Destiny Helpers Outreach community moment 3" },
  { src: "/collage4.jpg", alt: "Destiny Helpers Outreach community moment 4" },
  { src: "/collage5.jpg", alt: "Destiny Helpers Outreach community moment 5" },
  { src: "/collage6.jpg", alt: "Destiny Helpers Outreach community moment 6" },
  { src: "/collage7.jpg", alt: "Destiny Helpers Outreach community moment 7" },
  { src: "/collage8.png", alt: "Destiny Helpers Outreach community moment 8" },
  { src: "/collage9.png", alt: "Destiny Helpers Outreach community moment 9" },
  { src: "/collage10.png", alt: "Destiny Helpers Outreach community moment 10" },
  { src: "/collage11.jpg", alt: "Destiny Helpers Outreach community moment 11" },
  { src: "/collage12.jpg", alt: "Destiny Helpers Outreach community moment 12" },
  { src: "/collage13.jpg", alt: "Destiny Helpers Outreach community moment 13" },
  { src: "/collage14.jpg", alt: "Destiny Helpers Outreach community moment 14" },
  { src: "/collage15.jpg", alt: "Destiny Helpers Outreach community moment 15" },
];

function ImageRail({ reverse = false }: { reverse?: boolean }) {
  const loopImages = [...showcaseImages, ...showcaseImages];

  return (
    <div className={`showcase-rail ${reverse ? "showcase-rail-reverse" : ""}`} aria-hidden={reverse}>
      {loopImages.map((image, index) => (
        <figure key={`${image.src}-${index}-${reverse ? "reverse" : "forward"}`} className={`showcase-frame showcase-frame-${(index % 5) + 1}`}>
          <img src={image.src} alt={reverse ? "" : image.alt} loading={index < 4 && !reverse ? "eager" : "lazy"} />
          <span className="showcase-shade" aria-hidden="true" />
        </figure>
      ))}
    </div>
  );
}

export default function CinematicImageShowcase() {
  return (
    <section id="community-showcase" className="showcase-section">
      <style>{`
        .showcase-section {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          width: 100%;
          margin: 0;
          padding: clamp(88px, 9vw, 132px) 0;
          background:
            radial-gradient(circle at 14% 18%, rgba(212, 160, 23, 0.18), transparent 30%),
            radial-gradient(circle at 82% 58%, rgba(124, 58, 237, 0.12), transparent 30%),
            #0f1f4d;
        }

        .showcase-section::before,
        .showcase-section::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 92px;
          z-index: 3;
          pointer-events: none;
        }

        .showcase-section::before {
          top: 0;
          background: linear-gradient(180deg, #f9f6f1, rgba(249, 246, 241, 0));
        }

        .showcase-section::after {
          bottom: 0;
          background: linear-gradient(0deg, #f9f6f1, rgba(249, 246, 241, 0));
        }

        .showcase-header {
          position: relative;
          z-index: 4;
          max-width: 760px;
          margin: 0 auto;
          padding: 0 24px;
          text-align: center;
        }

        .showcase-kicker {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: #d4a017;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .showcase-kicker::before,
        .showcase-kicker::after {
          content: "";
          width: 36px;
          height: 1px;
          background: currentColor;
        }

        .showcase-title {
          margin: 18px 0 0;
          color: white;
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 5.8vw, 68px);
          font-weight: 900;
          line-height: 1.02;
        }

        .showcase-copy {
          max-width: 660px;
          margin: 22px auto 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 17px;
          line-height: 1.8;
        }

        .showcase-stage {
          position: relative;
          z-index: 2;
          margin-top: clamp(52px, 6vw, 78px);
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
        }

        .showcase-rows {
          display: grid;
          gap: 34px;
          padding: 42px 0;
        }

        .showcase-rail {
          display: flex;
          align-items: center;
          gap: clamp(18px, 2vw, 30px);
          width: max-content;
          animation: showcase-scroll 72s linear infinite;
          will-change: transform;
        }

        .showcase-rail-reverse {
          margin-left: -260px;
          opacity: 0.82;
          animation-name: showcase-scroll-reverse;
          animation-duration: 64s;
        }

        .showcase-stage:hover .showcase-rail {
          animation-play-state: paused;
        }

        .showcase-frame {
          position: relative;
          flex: 0 0 auto;
          overflow: hidden;
          margin: 0;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.28);
          transform: translateZ(0);
        }

        .showcase-frame img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 700ms ease, filter 700ms ease;
        }

        .showcase-frame:hover img {
          transform: scale(1.055);
          filter: saturate(1.08) contrast(1.02);
        }

        .showcase-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 48%, rgba(15, 31, 77, 0.46));
          pointer-events: none;
        }

        .showcase-frame-1 { width: clamp(250px, 30vw, 390px); height: clamp(330px, 34vw, 430px); transform: translateY(28px) rotate(-1.4deg); }
        .showcase-frame-2 { width: clamp(230px, 25vw, 330px); height: clamp(280px, 30vw, 360px); transform: translateY(-22px) rotate(1deg); }
        .showcase-frame-3 { width: clamp(300px, 36vw, 470px); height: clamp(220px, 24vw, 300px); transform: translateY(54px) rotate(-0.6deg); }
        .showcase-frame-4 { width: clamp(240px, 28vw, 360px); height: clamp(350px, 38vw, 470px); transform: translateY(-30px) rotate(1.35deg); }
        .showcase-frame-5 { width: clamp(280px, 33vw, 430px); height: clamp(290px, 31vw, 380px); transform: translateY(8px) rotate(-0.9deg); }

        .showcase-rule {
          position: relative;
          z-index: 4;
          max-width: 1080px;
          height: 1px;
          margin: 28px auto 0;
          background: linear-gradient(90deg, transparent, rgba(212, 160, 23, 0.55), transparent);
        }

        @keyframes showcase-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes showcase-scroll-reverse {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @media (max-width: 720px) {
          .showcase-section {
            padding: 76px 0;
          }

          .showcase-stage {
            margin-top: 42px;
            -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
            mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
          }

          .showcase-rows {
            gap: 22px;
            padding: 30px 0;
          }

          .showcase-rail-reverse {
            margin-left: -150px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .showcase-rail,
          .showcase-rail-reverse {
            animation: none;
          }
        }
      `}</style>

      <div className="showcase-header">
        <div className="showcase-kicker">Community in Action</div>
        <h2 className="showcase-title">A Moving Portrait of Care</h2>
        <p className="showcase-copy">
          Moments of mentorship, celebration, service, and belonging from the Destiny Helpers Outreach community.
        </p>
      </div>

      <div className="showcase-stage" aria-label="Destiny Helpers Outreach community photo showcase">
        <div className="showcase-rows">
          <ImageRail />
          <ImageRail reverse />
        </div>
      </div>

      <div className="showcase-rule" />
    </section>
  );
}
