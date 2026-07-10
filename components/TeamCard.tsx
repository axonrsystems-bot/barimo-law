import type { TeamMember } from "@/src/types/team";
import Reveal from "./Reveal";

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
      className="group relative flex flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-gold/50"
    >
      {member.photoConfirmed && member.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photo}
          alt={member.name}
          className="h-20 w-20 rounded-full border border-line object-cover"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-paper-dim font-display text-lg font-600 text-inkmute">
          {member.name
            .split(" ")
            .filter((w) => /^[A-Z]/.test(w))
            .slice(0, 2)
            .map((w) => w[0])
            .join("")}
        </div>
      )}

      <p className="mt-5 font-mono text-[10px] uppercase tracking-widest2 text-gold-dark">
        {member.isAttorney ? "Counsel" : "Client Team"}
      </p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink">
        {member.name}
      </h3>
      <p className="font-body text-sm text-inkmute">{member.role}</p>

      <p className="mt-4 font-body text-sm leading-relaxed text-inkmute">
        {member.bio}
      </p>

      {member.honor && (
        <p className="mt-4 flex items-start gap-2 rounded-lg bg-gold/10 px-3 py-2 font-body text-xs leading-relaxed text-gold-dark">
          <span aria-hidden="true">★</span>
          {member.honor}
        </p>
      )}

      <dl className="mt-5 space-y-2 border-t border-line pt-4">
        {member.education && (
          <div className="flex gap-2 text-xs">
            <dt className="w-20 shrink-0 font-mono uppercase tracking-widest2 text-inkmute/70">
              Education
            </dt>
            <dd className="font-body text-ink">{member.education}</dd>
          </div>
        )}
        {member.barAdmissions && (
          <div className="flex gap-2 text-xs">
            <dt className="w-20 shrink-0 font-mono uppercase tracking-widest2 text-inkmute/70">
              Bar
            </dt>
            <dd className="font-body text-ink">{member.barAdmissions}</dd>
          </div>
        )}
        <div className="flex gap-2 text-xs">
          <dt className="w-20 shrink-0 font-mono uppercase tracking-widest2 text-inkmute/70">
            Languages
          </dt>
          <dd className="font-body text-ink">{member.languages}</dd>
        </div>
      </dl>
    </Reveal>
  );
}
