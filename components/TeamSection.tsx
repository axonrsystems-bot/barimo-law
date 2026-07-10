import { team } from "@/src/data/team";
import Reveal from "./Reveal";
import TeamCard from "./TeamCard";

export default function TeamSection() {
  return (
    <section id="team" className="scroll-mt-20 border-b border-line bg-paper-dim/60">
      <div className="container-xl py-20 md:py-28">
        <Reveal className="max-w-lg">
          <p className="eyebrow text-gold-dark">The team</p>
          <h2 className="mt-4 font-display text-3xl font-700 leading-tight tracking-tight text-ink md:text-4xl">
            The people behind your case
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-inkmute md:text-lg">
            Young firm, serious advocacy. Meet the people fighting for you.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
