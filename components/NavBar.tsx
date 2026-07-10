"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#team", label: "Our Team" },
  { href: "#results", label: "Results" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-xl flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-wide.png"
            alt="Barimo Law, P.A."
            className="h-9 w-auto md:h-11"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-inkmute transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-0">
          <a
            href="#contact"
            className="hidden rounded-full bg-ink px-5 py-2.5 font-body text-sm font-medium text-paper transition-colors hover:bg-gold-dark sm:inline-block"
          >
            Free Case Review
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <div className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={`block h-[1.5px] w-full origin-center bg-ink transition-transform duration-200 ${
                  open ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-ink transition-opacity duration-150 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-[1.5px] w-full origin-center bg-ink transition-transform duration-200 ${
                  open ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-line bg-paper transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="container-xl flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-3 font-body text-base text-ink transition-colors hover:bg-paper-dim"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-ink px-5 py-3 text-center font-body text-sm font-medium text-paper transition-colors hover:bg-gold-dark"
          >
            Free Case Review
          </a>
        </nav>
      </div>
    </header>
  );
}
