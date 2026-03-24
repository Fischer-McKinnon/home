import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://fischermckinnon.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fischer McKinnon",
    template: "%s · Fischer McKinnon",
  },
  description: "Fischer McKinnon family home.",

  /* ── Open Graph ───────────────────────────────────────────── */
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Fischer McKinnon",
    title: "Fischer McKinnon",
    description: "Fischer McKinnon family home.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fischer McKinnon",
      },
    ],
  },

  /* ── Twitter / X card ────────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    title: "Fischer McKinnon",
    description: "Fischer McKinnon family home.",
    images: ["/og-image.png"],
  },

  /* ── Icons ───────────────────────────────────────────────── */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  /* ── Robots: private family site — no indexing ───────────── */
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      {/*
       * Preconnect to Google Fonts origins.
       * Must live directly inside <html> (not in metadata) to work in
       * Next.js App Router — placing them here is the recommended pattern.
       */}
      <head>
        {/* Preconnect to shorten font negotiation round-trips */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
         * Load Inter via <link> rather than CSS @import.
         * Discovered earlier in the parse chain → better FCP.
         * display=swap keeps text visible during font load.
         */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/*
         * Providers wraps the entire app with SessionProvider so client
         * components can call useSession(). Server components should use
         * `auth()` from "@/auth" directly — no provider needed server-side.
         */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
