import type { TeamMember } from "@/src/types/team";
import Reveal from "./Reveal";

function initialsFor(name: string) {
  return name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-1.5 rounded-lg bg-paper-dim/70 px-3 py-2">
      <span className="mt-[1px] font-mono text-[9px] uppercase tracking-widest2 text-inkmute/60">
        {label}
      </span>
      <span className="font-body text-xs leading-snug text-ink">{value}</span>
    </div>
  );
}

export default function TeamCard({
  member,
  delay = 0,
}: {
  member: TeamMember;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_45px_-25px_rgba(44,59,35,0.45)]"
    >
      {/* Photo block */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
        {member.photoConfirmed && member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-soft to-ink">
            <span className="font-display text-4xl font-700 text-paper/70">
              {initialsFor(member.name)}
            </span>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(190deg, rgba(44,59,35,0) 45%, rgba(44,59,35,0.88) 100%)",
          }}
        />

        <span className="absolute left-4 top-4 rounded-full border border-paper/25 bg-paper/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest2 text-paper backdrop-blur-sm">
          {member.isAttorney ? "Counsel" : "Client Team"}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-xl font-700 text-paper">
            {member.name}
          </h3>
          <p className="font-body text-sm text-paper/75">{member.role}</p>
        </div>
      </div>

      {/* Content block */}
      <div className="flex flex-1 flex-col p-6">
        <p className="font-body text-sm leading-relaxed text-inkmute">
          {member.bio}
        </p>

        {member.honor && (
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-gold/10 px-3.5 py-2.5 font-body text-xs leading-relaxed text-gold-dark">
            <span aria-hidden="true" className="mt-[1px] text-marigold">★</span>
            {member.honor}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
          {member.education && <MetaChip label="Education" value={member.education} />}
          {member.barAdmissions && <MetaChip label="Bar" value={member.barAdmissions} />}
          <MetaChip label="Languages" value={member.languages} />
        </div>
      </div>
    </Reveal>
  );
}
