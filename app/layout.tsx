import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const SITE_NAME = "Barimo Law, P.A.";
const SITE_DESCRIPTION =
  "Barimo Law fights for homeowners and businesses when insurance companies deny, delay, or underpay the claims they owe. Free case review.";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Property Insurance Attorneys | FL · TX · LA`,
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `${SITE_NAME} | Property Insurance Attorneys`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: ["/brand/logo-wide.png"],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} | Property Insurance Attorneys`,
    description: SITE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Attorney",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "3350 SW 148 Ave, Ste. 110",
    addressLocality: "Miramar",
    addressRegion: "FL",
    postalCode: "33027",
    addressCountry: "US",
  },
  areaServed: ["Florida", "Texas", "Louisiana"],
  sameAs: ["https://www.instagram.com/barimolaw/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
