import Reveal from "./Reveal";

const INSTAGRAM_URL = "https://www.instagram.com/barimolaw/";

// Real firm photos already on the site, reused here as Instagram-grid-style
// tiles. Swap any `image` path for an actual post export whenever you have
// one — same aspect ratio (square) works best.
const categories = [
  {
    tag: "Case wins",
    label: "Settlements & verdicts",
    image: "/team/elise.jpg",
    icon: (
      <path d="M12 2.5l2.47 5.02 5.53.8-4 3.9.94 5.5L12 15.1l-4.94 2.6.94-5.5-4-3.9 5.53-.8L12 2.5z" />
    ),
  },
  {
    tag: "Client stories",
    label: "Real reviews & recaps",
    image: "/team/ciara.jpg",
    icon: <path d="M4 4h16v11H8l-4 4V4z" />,
  },
  {
    tag: "Know your policy",
    label: "Claims tips & explainers",
    image: "/team/natalie.png",
    icon: (
      <>
        <path d="M6 3h9l5 5v13H6V3z" />
        <path d="M9.5 12h5M9.5 15.5h5M9.5 8.5h2.5" />
      </>
    ),
  },
  {
    tag: "Behind the scenes",
    label: "Meet the team",
    image: "/team/jose.png",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5.5 20c1-3.6 4-5.4 6.5-5.4s5.5 1.8 6.5 5.4" />
      </>
    ),
  },
];

function InstagramMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="6" r="1.15" fill="currentColor" />
    </svg>
  );
}

export default function InstagramSection() {
  return (
    <section id="follow" className="scroll-mt-20 border-b border-line bg-paper-dim/60">
      <div className="container-xl py-20 md:py-28">
        {/* Hero card with photo background */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/elise.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(44,59,35,0.94) 15%, rgba(44,59,35,0.72) 48%, rgba(44,59,35,0.35) 100%)",
              }}
            />

            <div className="relative flex flex-col gap-10 px-6 py-14 sm:px-10 md:flex-row md:items-end md:justify-between md:py-16 lg:px-14">
              <div className="max-w-lg">
                <span className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest2 text-paper backdrop-blur-sm">
                  <InstagramMark className="h-3.5 w-3.5" />
                  @barimolaw
                </span>
                <h2 className="mt-5 font-display text-3xl font-700 leading-tight tracking-tight text-paper md:text-4xl">
                  Follow the fight on Instagram
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-paper/75 md:text-lg">
                  Case wins, claim tips, and the people behind Barimo Law —
                  posted regularly. Tap through to see the latest and follow
                  along.
                </p>
              </div>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-paper px-6 py-3.5 font-body text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:bg-marigold"
              >
                <InstagramMark className="h-4 w-4" />
                Follow @barimolaw
              </a>
            </div>
          </div>
        </Reveal>

        {/* Photo grid, styled like an Instagram feed */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.tag} delay={0.05 + i * 0.06}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.tag} on Instagram — opens in a new tab`}
                className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-line p-4 transition-transform hover:-translate-y-1 sm:p-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-90 transition-opacity group-hover:opacity-95"
                  style={{
                    background:
                      "linear-gradient(190deg, rgba(44,59,35,0.15) 0%, rgba(44,59,35,0.15) 40%, rgba(44,59,35,0.92) 100%)",
                  }}
                />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="relative h-6 w-6 text-marigold sm:h-7 sm:w-7"
                >
                  {c.icon}
                </svg>
                <div className="relative">
                  <p className="font-mono text-[9px] uppercase tracking-widest2 text-marigold sm:text-[10px]">
                    {c.tag}
                  </p>
                  <p className="mt-1 font-display text-sm font-600 leading-snug text-paper sm:text-base">
                    {c.label}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-paper/15 text-paper opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                >
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
