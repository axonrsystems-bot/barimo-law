import type { TeamMember } from "@/src/types/team";
import { useState } from "react";

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

/** Small law-related credential mark shown on every attorney's portrait. */
function AttorneyBadge() {
  return (
    <span
      aria-hidden="true"
      title="Licensed Attorney"
      className="absolute bottom-0 right-0 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-paper bg-ink shadow-[0_4px_10px_-2px_rgba(0,0,0,0.4)] md:h-8 md:w-8"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-gold md:h-4 md:w-4">
        <path
          d="M12 2 3 6.5V11c0 5.2 3.8 8.9 9 11 5.2-2.1 9-5.8 9-11V6.5L12 2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="m8.5 12 2.3 2.3L15.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export interface TeamCardProps {
  member: TeamMember;
  /** "hero" = large, fully expanded card (spotlight / mobile list). "orbit" = compact ring node. */
  size?: "hero" | "orbit";
  active?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onSelect?: () => void;
  onClose?: () => void;
}

export default function TeamCard({
  member,
  size = "hero",
  active = false,
  style,
  className = "",
  onSelect,
  onClose,
}: TeamCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isHero = size === "hero" || active;

  const photoSize = isHero ? "h-32 w-32 md:h-40 md:w-40" : "h-16 w-16 md:h-20 md:w-20";

  return (
    <div
      style={style}
      className={`flex flex-col items-center text-center ${className}`}
    >
      {/* Portrait */}
      <button
        type="button"
        onClick={onSelect}
        disabled={!onSelect}
        className={`group relative shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
          onSelect ? "cursor-pointer" : "cursor-default"
        }`}
        aria-label={onSelect ? `View ${member.name}'s profile` : undefined}
      >
        <div
          className={`relative overflow-hidden rounded-full bg-ink ring-4 ring-paper transition-all duration-500 ease-out ${photoSize} ${
            member.honor ? "shadow-[0_0_0_2px_theme(colors.gold)]" : ""
          } ${active ? "scale-[1.04] shadow-[0_25px_60px_-20px_rgba(44,59,35,0.55)]" : "shadow-[0_10px_30px_-12px_rgba(44,59,35,0.45)]"} ${
            onSelect ? "group-hover:scale-105 group-focus-visible:scale-105" : ""
          }`}
        >
          {member.photoConfirmed && member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.photo}
              alt={member.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-soft to-ink">
              <span className={`font-display font-700 text-paper/70 ${isHero ? "text-3xl md:text-4xl" : "text-lg"}`}>
                {initialsFor(member.name)}
              </span>
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(circle at 50% 100%, rgba(44,59,35,0.35), transparent 65%)" }}
          />
        </div>

        {member.isAttorney && <AttorneyBadge />}

        {member.honor && (
          <span
            aria-hidden="true"
            title={member.honor}
            className={`absolute -top-1 -left-1 z-10 flex items-center justify-center rounded-full bg-marigold text-ink shadow-md ring-2 ring-paper ${
              isHero ? "h-8 w-8 text-sm" : "h-6 w-6 text-[10px]"
            }`}
          >
            ★
          </span>
        )}
      </button>

      {/* Name / role */}
      <h3 className={`mt-4 font-display font-700 leading-tight text-ink ${isHero ? "text-xl md:text-2xl" : "text-sm md:text-base"}`}>
        {member.name}
      </h3>
      <p className={`mt-1 font-body text-inkmute ${isHero ? "text-sm" : "text-[11px] md:text-xs"}`}>
        {member.role}
      </p>

      {/* Honor ribbon — reserved for standout, verified distinctions like Elise's Rising Star recognition */}
      {member.honor && isHero && (
        <p className="mt-4 flex max-w-xs items-start gap-2 rounded-xl border border-gold/30 bg-gold/10 px-3.5 py-2.5 text-left font-body text-xs leading-relaxed text-gold-dark">
          <span aria-hidden="true" className="mt-[1px] text-marigold">★</span>
          {member.honor}
        </p>
      )}

      {/* Read more / bio */}
      {isHero ? (
        <div className="mt-4 w-full max-w-xs">
          <p className={`font-body text-sm leading-relaxed text-inkmute ${expanded ? "" : "line-clamp-3"}`}>
            {member.bio}
          </p>

          {(member.education || member.barAdmissions || member.languages) && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest2 text-gold-dark transition-colors hover:text-ink"
            >
              {expanded ? "Show less" : "Read more"}
              <span aria-hidden="true" className={`transition-transform duration-300 ${expanded ? "-rotate-90" : "rotate-90"}`}>
                ›
              </span>
            </button>
          )}

          <div
            className={`grid transition-all duration-300 ease-out ${
              expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-2 overflow-hidden border-t border-line pt-4">
              {member.education && <MetaChip label="Education" value={member.education} />}
              {member.barAdmissions && <MetaChip label="Bar" value={member.barAdmissions} />}
              <MetaChip label="Languages" value={member.languages} />
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest2 text-inkmute/70 transition-colors hover:text-ink"
            >
              ← Back to the team
            </button>
          )}
        </div>
      ) : (
        onSelect && (
          <button
            type="button"
            onClick={onSelect}
            className="mt-1 font-mono text-[9px] uppercase tracking-widest2 text-gold-dark opacity-0 transition-opacity duration-200 hover:underline group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            Read more →
          </button>
        )
      )}
    </div>
  );
}
