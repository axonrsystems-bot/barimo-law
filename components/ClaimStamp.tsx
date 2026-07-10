"use client";

import { motion } from "framer-motion";

/**
 * Signature element: a rubber-stamp graphic reading "CLAIM DENIED",
 * pressed down on load, that the headline visually overrides. It's the
 * one bold risk on the page — everything else stays quiet around it.
 */
export default function ClaimStamp() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.4, rotate: -14 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
      className="pointer-events-none absolute -top-6 right-2 hidden select-none sm:right-6 sm:block md:top-2 md:right-0"
      aria-hidden="true"
    >
      <div className="relative flex h-24 w-24 rotate-[-8deg] items-center justify-center rounded-full border-[3px] border-coral/70 md:h-28 md:w-28">
        <div className="absolute inset-1.5 rounded-full border border-coral/40" />
        <span className="font-mono text-[9px] font-semibold uppercase leading-tight tracking-widest2 text-coral md:text-[10px]">
          Claim
          <br />
          Denied
        </span>
      </div>
    </motion.div>
  );
}
