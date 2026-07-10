const INSTAGRAM_URL = "https://www.instagram.com/barimolaw/";
const PRIVACY_POLICY_URL =
  "https://l.instagram.com/?u=https%3A%2F%2Fdocs.google.com%2Fdocument%2Fd%2F1HdFkqbnyZhDWKcIeNGm336pvA5nUcge5BXr-tsYnON0%2Fedit%3Fusp%3Dsharing%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio&e=AUDfl_DVNR6W_0qFERa3PPU2Nac-fsCE8MEIRASdFGyLk79Dny_0ZAqmC4Cav489J2B6aQwKIbY65JW5e7_KeEC85s3OrU-ybOPL87p9-J1iPUuEWSaP2WQxreCSLZ5wVNPa6TI";

function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="6" r="1.15" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70">
      <div className="container-xl grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-start">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-mark.png"
            alt="Barimo Law, P.A."
            className="h-12 w-12"
          />
          <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-paper/60">
            Property insurance and personal injury attorneys serving clients
            throughout Florida, with additional licensure in Texas, Louisiana,
            and the District of Columbia.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-body text-sm text-paper/70 transition-colors hover:text-paper"
          >
            <InstagramGlyph className="h-4 w-4" />
            @barimolaw
          </a>
        </div>

        <div className="flex flex-col gap-2 font-body text-sm text-paper/70">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest2 text-paper/40">
            Site
          </p>
          <a href="#team" className="hover:text-paper">Our Team</a>
          <a href="#results" className="hover:text-paper">Results</a>
          <a href="#contact" className="hover:text-paper">Free Case Review</a>
        </div>

        <div className="flex flex-col gap-2 font-body text-sm text-paper/70">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest2 text-paper/40">
            Office
          </p>
          <address className="max-w-[16rem] not-italic leading-relaxed">
            3350 SW 148 Ave, Ste. 110
            <br />
            Miramar, Florida 33027
          </address>
          <a
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 hover:text-paper"
          >
            Privacy Policy
          </a>
        </div>

        {/*
          Reserved slot for the Super Lawyers "Rising Stars" embeddable
          digital badge. Elise Barimo qualifies (Rising Star every year
          since 2021) -- client confirmed this isn't needed yet, but the
          layout is ready. Drop the embed code inside this div when
          provided; it links back to her Super Lawyers profile.
        */}
        <div
          id="super-lawyers-badge"
          className="flex h-20 w-40 items-center justify-center rounded-lg border border-dashed border-paper/25 font-mono text-[9px] uppercase tracking-widest2 text-paper/40 md:justify-self-end"
        >
          Badge slot
        </div>
      </div>

      <div className="border-t border-line-light">
        <div className="container-xl flex flex-col gap-3 py-6 font-mono text-[10px] uppercase tracking-widest2 text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Barimo Law, P.A. All rights reserved.</p>
          <p>Attorney advertising. Prior results do not guarantee a similar outcome.</p>
          <p>
            Built with care by{" "}
            <a
              href="mailto:toyeshe20@gmail.com"
              className="text-paper/60 underline decoration-paper/20 underline-offset-2 transition-colors hover:text-marigold"
            >
              Axonr
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
