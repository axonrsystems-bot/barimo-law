import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "Barimo Law helped me with my 2024 hurricane claim, and I was very pleased with their service. They were always responsive, and while the process took longer than I initially expected, their communication stayed clear throughout. They consistently explained reasonable timelines, set expectations, and clarified any issues or delays as they came up. Highly recommend.",
    name: "Ellie S.",
  },
  {
    quote:
      "Very professional office. They communicate well and in a timely manner. Were able to help me settle my insurance claim fairly. Would recommend.",
    name: "William S.",
  },
  {
    quote:
      "After hurricane Beryl, my home was destroyed, and I felt that I was not getting anywhere with the insurance company. Luckily, I was connected to Barimo Law firm who were able to help me through the process and getting a positive resolution to getting my home fixed. It took almost a year, but the staff was amazing and very communicative. I would highly recommend using them.",
    name: "Vanessa C.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-marigold">
          <path d="M10 1.5l2.59 5.85 6.36.58-4.8 4.24 1.43 6.24L10 15.27 4.42 18.4l1.43-6.24-4.8-4.24 6.36-.58L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <section id="results" className="scroll-mt-20 border-b border-line bg-ink text-paper">
      <div className="container-xl py-20 md:py-28">
        <Reveal className="flex max-w-lg flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-marigold">Results</p>
            <h2 className="mt-4 font-display text-3xl font-700 leading-tight tracking-tight text-paper md:text-4xl">
              Real results, real people
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              className="flex flex-col justify-between rounded-2xl border border-line-light bg-ink-soft p-6"
            >
              <div>
                <Stars />
                <p className="mt-4 font-display text-2xl leading-none text-coral">
                  &ldquo;
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-paper/85">
                  {t.quote}
                </p>
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-widest2 text-paper/50">
                — {t.name}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
