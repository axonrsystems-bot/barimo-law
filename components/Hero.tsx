"use client";

import { motion } from "framer-motion";
import ClaimStamp from "./ClaimStamp";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #EFEFE6 1px, transparent 1px), linear-gradient(to bottom, #EFEFE6 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="container-xl relative pb-20 pt-14 md:pb-28 md:pt-20">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-mono text-[11px] uppercase tracking-widest2 text-marigold"
        >
          Property Insurance Attorneys · Florida · Texas · Louisiana
        </motion.p>

        <div className="relative mt-6 max-w-3xl md:mt-8">
          <ClaimStamp />
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="font-display text-[2.4rem] font-700 leading-[1.08] tracking-tight md:text-6xl"
          >
            Where you&apos;re a{" "}
            <span className="relative inline-block whitespace-nowrap">
              person
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.7, ease: "easeInOut" }}
                viewBox="0 0 220 16"
                className="absolute -bottom-1 left-0 h-3 w-full"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 11.5C45 4 130 2 218 9"
                  fill="none"
                  stroke="#E8A93A"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
            , not a claim number.
          </motion.h1>
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.22}
          className="mt-6 max-w-xl font-body text-lg leading-relaxed text-paper/80 md:text-xl"
        >
          Barimo Law fights for homeowners and businesses when insurance
          companies deny, delay, or underpay the claims they owe you.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.32}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#contact"
            className="rounded-full bg-coral px-7 py-3.5 text-center font-body text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-coral-dark"
          >
            Get Your Free Case Review
          </a>
          <a
            href="#team"
            className="rounded-full border border-paper/25 px-7 py-3.5 text-center font-body text-sm font-medium text-paper/90 transition-colors hover:border-paper/60"
          >
            Meet the Team
          </a>
        </motion.div>

        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.42}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-line-light pt-8 md:mt-20 md:grid-cols-3"
        >
          <div>
            <dt className="eyebrow text-marigold">Focus</dt>
            <dd className="mt-1 font-display text-sm font-600 text-paper md:text-base">
              Policyholders only, never insurers
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-marigold">Reach</dt>
            <dd className="mt-1 font-display text-sm font-600 text-paper md:text-base">
              Licensed in FL, TX &amp; LA
            </dd>
          </div>
          <div className="col-span-2 md:col-span-1">
            <dt className="eyebrow text-marigold">Terms</dt>
            <dd className="mt-1 font-display text-sm font-600 text-paper md:text-base">
              No fee unless we win
            </dd>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
