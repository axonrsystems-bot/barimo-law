"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

type Status = "idle" | "loading" | "success" | "error";

const CASE_TYPES = [
  "Property insurance claim",
  "Personal injury",
  "Not sure yet",
];

const DETAILS_MAX = 700;

function isValidContact(value: string) {
  const trimmed = value.trim();
  if (trimmed.length < 5) return false;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = trimmed.replace(/[^0-9]/g, "");
  return emailRe.test(trimmed) || phoneDigits.length >= 7;
}

export default function CTASection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [caseType, setCaseType] = useState(CASE_TYPES[0]);
  const [details, setDetails] = useState("");

  const [touched, setTouched] = useState<{ name?: boolean; contact?: boolean }>({});

  const nameError = touched.name && name.trim().length < 2 ? "Enter your full name." : "";
  const contactError =
    touched.contact && !isValidContact(contact) ? "Enter a valid phone number or email." : "";

  const isFormValid = useMemo(
    () => name.trim().length >= 2 && isValidContact(contact),
    [name, contact]
  );

  function markTouched(field: "name" | "contact") {
    return () => setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, contact: true });
    if (!isFormValid) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          caseType: data.get("caseType"),
          details: data.get("details"),
          company: data.get("company"), // honeypot, left blank by real visitors
        }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(payload.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setName("");
      setContact("");
      setDetails("");
      setCaseType(CASE_TYPES[0]);
      setTouched({});
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  const fieldBase =
    "w-full rounded-lg border bg-paper px-4 py-3 font-body text-sm text-ink placeholder:text-inkmute/50 transition-colors focus:outline-none focus:border-gold";

  return (
    <section id="contact" className="scroll-mt-20 bg-paper">
      <div className="container-xl py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-line bg-paper-dim/60 p-8 text-center md:p-14">
          <p className="eyebrow text-gold-dark">Free case review</p>
          <h2 className="mt-4 font-display text-3xl font-700 leading-tight tracking-tight text-ink md:text-4xl">
            Your insurance company has a legal team.
            <br className="hidden md:block" /> So should you.
          </h2>
          <p className="mx-auto mt-5 max-w-md font-body text-base leading-relaxed text-inkmute">
            Tell us what happened. We&apos;ll review your claim and let you
            know exactly where you stand, at no cost to you.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-8 max-w-md rounded-xl border border-gold/40 bg-gold/10 p-6"
              >
                <p className="font-display text-base font-600 text-ink">
                  Thanks — we&apos;ve got it.
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-inkmute">
                  Someone from our team will reach out shortly to review your
                  case.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Honeypot: hidden from real visitors via CSS, bots tend to fill every field. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden="true"
                />

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest2 text-inkmute">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={markTouched("name")}
                    placeholder="Jane Rodriguez"
                    aria-invalid={!!nameError}
                    className={`${fieldBase} mt-1 ${
                      nameError ? "border-coral" : "border-line"
                    }`}
                  />
                  <AnimatePresence>
                    {nameError && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 font-body text-xs text-coral"
                      >
                        {nameError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest2 text-inkmute">
                    Phone or email
                  </label>
                  <input
                    type="text"
                    name="contact"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    onBlur={markTouched("contact")}
                    placeholder="(305) 555-0134 or jane@email.com"
                    aria-invalid={!!contactError}
                    className={`${fieldBase} mt-1 ${
                      contactError ? "border-coral" : "border-line"
                    }`}
                  />
                  <AnimatePresence>
                    {contactError && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 font-body text-xs text-coral"
                      >
                        {contactError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest2 text-inkmute">
                    What kind of case?
                  </label>
                  <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {CASE_TYPES.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCaseType(option)}
                        aria-pressed={caseType === option}
                        className={`rounded-lg border px-3 py-2.5 text-left font-body text-xs font-medium transition-colors sm:text-center ${
                          caseType === option
                            ? "border-gold bg-gold/10 text-gold-dark"
                            : "border-line bg-paper text-inkmute hover:border-gold/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="caseType" value={caseType} />
                </div>

                <div>
                  <div className="flex items-baseline justify-between">
                    <label className="font-mono text-[10px] uppercase tracking-widest2 text-inkmute">
                      What happened?
                    </label>
                    <span className="font-mono text-[10px] text-inkmute/50">
                      {details.length}/{DETAILS_MAX}
                    </span>
                  </div>
                  <textarea
                    name="details"
                    rows={3}
                    maxLength={DETAILS_MAX}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Briefly describe your claim..."
                    className={`${fieldBase} mt-1 resize-none border-line`}
                  />
                </div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-lg bg-red-50 px-3 py-2 font-body text-xs text-red-700"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 rounded-full bg-gold px-7 py-3.5 font-body text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "loading" ? "Sending…" : "Start My Free Case Review"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

      
        </Reveal>
      </div>
    </section>
  );
}
