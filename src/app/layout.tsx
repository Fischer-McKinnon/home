import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Fischer McKinnon",
  description: "Fischer McKinnon family home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
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
