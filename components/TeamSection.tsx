"use client";

import { useEffect, useRef, useState } from "react";
import { team } from "@/src/data/team";
import Reveal from "./Reveal";
import TeamCard from "./TeamCard";

function smoothstep(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

/** Sequential fade/slide reveal for the mobile & reduced-motion list. */
function RevealItem({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: shown ? `${Math.min(index, 6) * 70}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export default function TeamSection() {
  const count = team.length;

  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [orbitLayout, setOrbitLayout] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Decide layout: pinned circular scroll experience only on roomy screens
  // with no reduced-motion preference. Everyone else gets a calm sequential list.
  useEffect(() => {
    setMounted(true);
    const screenQuery = window.matchMedia("(min-width: 900px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function update() {
      setOrbitLayout(screenQuery.matches && !motionQuery.matches);
    }
    update();
    screenQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      screenQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  // Scroll-linked progress through the pinned stage.
  useEffect(() => {
    if (!orbitLayout) return;

    function measure() {
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(p);
    }

    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        measure();
        rafRef.current = undefined;
      });
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [orbitLayout]);

  useEffect(() => {
    if (!orbitLayout) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [orbitLayout]);

  const radiusVmin = Math.min(40, Math.max(24, 20 + count * 2));
  const sectionHeightVh = Math.min(520, Math.max(220, 90 + count * 42));

  const hint =
    activeIndex !== null
      ? null
      : progress < 0.05
      ? "Scroll to meet the team"
      : progress < 0.97
      ? "Keep scrolling"
      : "Tap a face to read more";

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
      </div>

      {!mounted || !orbitLayout ? (
        // ---- Mobile / reduced-motion: calm sequential list ----
        <div className="container-xl pb-20 md:pb-28">
          <div className="mx-auto grid max-w-sm gap-10 sm:max-w-2xl sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
            {team.map((member, i) => (
              <RevealItem key={member.id} index={i}>
                <TeamCard member={member} size="hero" />
              </RevealItem>
            ))}
          </div>
        </div>
      ) : (
        // ---- Desktop: scroll-pinned orbit ----
        <div ref={sectionRef} style={{ height: `${sectionHeightVh}vh` }} className="relative">
          <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
            <div className="relative aspect-square w-[min(78vh,78vw)]">
              {/* Center content */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div
                  className={`pointer-events-auto max-w-[min(60%,20rem)] text-center transition-opacity duration-500 ${
                    activeIndex !== null ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest2 text-inkmute/60">
                    {count} people, one mission
                  </p>
                  <p className="mt-3 font-display text-lg font-700 text-ink md:text-xl">
                    Every case gets the whole room.
                  </p>
                  <p className="mt-3 font-body text-xs text-inkmute transition-opacity duration-300">
                    {hint}
                  </p>
                </div>

                {activeIndex !== null && (
                  <div className="pointer-events-auto absolute inset-0 flex items-center justify-center">
                    <div className="w-[min(90%,22rem)] rounded-3xl border border-line bg-paper/95 p-6 shadow-[0_30px_70px_-25px_rgba(44,59,35,0.5)] backdrop-blur-sm">
                      <TeamCard
                        member={team[activeIndex]}
                        size="hero"
                        active
                        onClose={() => setActiveIndex(null)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Orbit nodes */}
              {team.map((member, i) => {
                const local = smoothstep(progress * count - i);
                const angle = (-90 + i * (360 / count)) * (Math.PI / 180);
                const x = Math.cos(angle) * radiusVmin * local;
                const y = Math.sin(angle) * radiusVmin * local;
                const scale = 0.5 + 0.5 * local;
                const dimmed = activeIndex !== null && activeIndex !== i;

                return (
                  <div
                    key={member.id}
                    className="absolute left-1/2 top-1/2 w-28 transition-[opacity] duration-300"
                    style={{
                      transform: `translate(-50%, -50%) translate(${x}vmin, ${y}vmin) scale(${scale})`,
                      opacity: local * (dimmed ? 0.3 : 1),
                      pointerEvents: local > 0.6 ? "auto" : "none",
                      transition:
                        "transform 0.15s linear, opacity 0.3s ease, scale 0.3s ease",
                    }}
                  >
                    <TeamCard
                      member={member}
                      size="orbit"
                      onSelect={() => setActiveIndex(i)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
