import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";

/**
 * Hub — authenticated app menu (TSK-31)
 *
 * Protected by src/proxy.ts: any unauthenticated request to /hub
 * is automatically redirected to /api/auth/signin by NextAuth.
 *
 * Shows app cards for Wedding, Kin, and Signals.
 * Displays user avatar from Google session + sign-out link.
 */

const APPS = [
  {
    slug: "wedding",
    label: "Wedding",
    href: "https://wedding.fischermckinnon.com",
    description: "July 11, 2026 · Château de Duingt",
  },
  {
    slug: "kin",
    label: "Kin",
    href: "https://kin.fischermckinnon.com",
    description: "Family contacts & relationships",
  },
  {
    slug: "signals",
    label: "Signals",
    href: "https://signals.fischermckinnon.com",
    description: "Curated reads & notes",
  },
] as const;

export default async function HubPage() {
  const session = await auth();

  // Belt-and-suspenders guard (proxy.ts handles this at the edge)
  if (!session?.user) redirect("/");

  const firstName = session.user.name?.split(" ")[0] ?? null;
  const avatarUrl = session.user.image ?? null;

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-8 pt-8 pb-0">
        {/* Wordmark */}
        <div className="flex flex-col leading-none select-none">
          <span
            className="font-thin uppercase text-black"
            style={{ fontSize: "clamp(0.7rem, 2vw, 1rem)", letterSpacing: "0.30em" }}
          >
            FISCHER
          </span>
          <span
            className="font-thin uppercase text-black"
            style={{ fontSize: "clamp(0.56rem, 1.6vw, 0.8rem)", letterSpacing: "0.30em", marginTop: "0.1em" }}
          >
            McKINNON
          </span>
        </div>

        {/* User + sign-out */}
        <div className="flex items-center gap-4">
          {firstName && (
            <span
              className="text-gray-400 font-light uppercase text-xs hidden sm:block"
              style={{ letterSpacing: "0.18em" }}
            >
              {firstName}
            </span>
          )}
          {avatarUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={avatarUrl}
              alt={session.user.name ?? "User avatar"}
              width={28}
              height={28}
              className="rounded-full"
              referrerPolicy="no-referrer"
            />
          )}
          <SignOutButton />
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-16">

        {/* Greeting */}
        <p
          className="text-gray-300 font-light uppercase text-xs mb-16"
          style={{ letterSpacing: "0.22em" }}
        >
          {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        </p>

        {/* App cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px w-full max-w-2xl bg-gray-200">
          {APPS.map((app) => (
            <a
              key={app.slug}
              href={app.href}
              className="group flex flex-col justify-between bg-white px-8 py-10 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label={`Open ${app.label}`}
            >
              {/* App name */}
              <span
                className="block font-thin uppercase text-black group-hover:opacity-40 transition-opacity duration-300"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", letterSpacing: "0.20em" }}
              >
                {app.label}
              </span>

              {/* Description */}
              <span
                className="block font-light text-gray-400 text-xs mt-6 group-hover:opacity-40 transition-opacity duration-300"
                style={{ letterSpacing: "0.08em" }}
              >
                {app.description}
              </span>
            </a>
          ))}
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="px-8 pb-8 flex justify-center">
        <span
          className="text-gray-200 font-light text-xs uppercase"
          style={{ letterSpacing: "0.15em" }}
        >
          fischermckinnon.com
        </span>
      </footer>

    </div>
  );
}
