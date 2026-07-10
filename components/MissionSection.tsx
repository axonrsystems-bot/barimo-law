import Reveal from "./Reveal";

export default function MissionSection() {
  return (
    <section className="border-b border-line bg-ink text-paper">
      <div className="container-xl grid gap-12 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <p className="eyebrow text-marigold">Our mission</p>
          <p className="mt-4 font-display text-2xl font-600 leading-snug tracking-tight md:text-3xl">
            Legal representation should be both highly effective and deeply
            personal.
          </p>
          <p className="mt-5 font-body text-base leading-relaxed text-paper/75">
            Our mission is to level the playing field for individuals facing
            insurance companies and other powerful entities, while providing
            the trust, integrity, and personal attention every client
            deserves. We keep our clients informed, empower them to make
            confident decisions, and build lasting relationships through
            honest communication and exceptional advocacy.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow text-marigold">Our history</p>
          <p className="mt-4 font-body text-base leading-relaxed text-paper/75">
            Barimo Law, P.A. was founded in 2023 on the belief that
            exceptional legal representation begins with exceptional client
            service, delivering the personal attention often missing at
            larger firms. What began as a practice dedicated to homeowners
            and business owners in first-party property insurance disputes
            has grown to include personal injury representation.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-paper/75">
            Today, Barimo Law serves clients throughout Florida with a
            commitment to integrity, accessibility, and results. The
            philosophy remains unchanged: every client deserves direct
            communication, honest guidance, and an attorney invested in the
            best possible outcome.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
