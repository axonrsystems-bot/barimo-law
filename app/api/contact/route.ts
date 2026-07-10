import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, contact, details, caseType, company } = body as Record<string, unknown>;

  // Honeypot field. Real visitors never see or fill this input (see CTASection.tsx).
  // Bots that fill every field will trip it; pretend success without sending anything.
  if (typeof company === "string" && company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json(
      { error: "Please enter your full name." },
      { status: 400 }
    );
  }
  if (typeof contact !== "string" || contact.trim().length < 5) {
    return NextResponse.json(
      { error: "Please enter a phone number or email." },
      { status: 400 }
    );
  }
  if (
    name.length > 200 ||
    contact.length > 200 ||
    (typeof details === "string" && details.length > 4000) ||
    (typeof caseType === "string" && caseType.length > 100)
  ) {
    return NextResponse.json(
      { error: "That submission looks too long, please shorten it." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Barimo Law Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars.");
    return NextResponse.json(
      {
        error: "The contact form isn't fully configured yet. Please call our office directly.",
      },
      { status: 500 }
    );
  }

  const trimmedContact = contact.trim();
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: EMAIL_RE.test(trimmedContact) ? trimmedContact : undefined,
      subject: `New free case review request — ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Phone or email: ${trimmedContact}`,
        `Case type: ${(typeof caseType === "string" && caseType.trim()) || "(not provided)"}`,
        "",
        "What happened:",
        (typeof details === "string" && details.trim()) || "(not provided)",
        "",
        "— Submitted via the Barimo Law website contact form.",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend API returned an error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please call us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please call us directly." },
      { status: 502 }
    );
  }
}
