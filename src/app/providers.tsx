"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Client-side providers wrapper.
 *
 * SessionProvider makes the session available to any client component that
 * calls `useSession()`. Server components can call `auth()` from "@/auth"
 * directly instead — no provider needed on the server side.
 *
 * Usage: wrap your root layout's <body> with <Providers>.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
