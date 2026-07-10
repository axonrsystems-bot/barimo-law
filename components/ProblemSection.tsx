import Reveal from "./Reveal";

const pillars = [
  {
    tag: "Whose side",
    label: "Policyholder-first",
    copy: "We only represent policyholders and injured individuals. Never insurance companies.",
  },
  {
    tag: "Property claims",
    label: "Denied, delayed & underpaid",
    copy: "Roof leaks, fire, hurricane and windstorm, hail, and plumbing losses on residential and commercial properties.",
  },
  {
    tag: "Personal injury",
    label: "When negligence causes harm",
    copy: "Car accidents, Uber/Lyft accidents, slip and falls, and premises liability claims.",
  },
];

export default function ProblemSection() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="container-xl py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <Reveal>
            <p className="eyebrow text-gold-dark">The problem</p>
            <h2 className="mt-4 max-w-md font-display text-3xl font-700 leading-tight tracking-tight text-ink md:text-4xl">
              You paid your premiums. You expected them to have your back.
            </h2>
            <p className="mt-5 max-w-md font-body text-base leading-relaxed text-inkmute md:text-lg">
              When disaster hits, your insurance company&apos;s job is to make
              you whole. Too often, they slow-walk the process, lowball the
              payout, or deny the claim outright, betting you won&apos;t push
              back. Barimo Law pushes back.
            </p>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {pillars.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.08} className="bg-paper p-6 md:p-7">
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dark">
                  {p.tag}
                </p>
                <p className="mt-3 font-display text-base font-600 text-ink">
                  {p.label}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-inkmute">
                  {p.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
