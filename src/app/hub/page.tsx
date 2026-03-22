import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";

/**
 * Hub — protected landing page after sign-in
 *
 * Protected by src/proxy.ts: any unauthenticated request to /hub
 * is automatically redirected to /api/auth/signin by NextAuth.
 */
export default async function HubPage() {
  const session = await auth();

  // Extra guard — proxy.ts handles this, but belt-and-suspenders.
  if (!session?.user) redirect("/");

  const name = session.user.name ?? session.user.email ?? "there";

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white gap-12">
      {/* Wordmark */}
      <div className="flex flex-col items-center">
        <span
          className="block font-thin uppercase leading-none text-black"
          style={{ fontSize: "clamp(1.25rem, 6vw, 3.5rem)", letterSpacing: "0.30em" }}
        >
          FISCHER
        </span>
        <span
          className="block font-thin uppercase leading-none text-black"
          style={{ fontSize: "clamp(1rem, 4.8vw, 2.8rem)", letterSpacing: "0.30em", marginTop: "0.15em" }}
        >
          McKINNON
        </span>
      </div>

      {/* Greeting */}
      <p
        className="text-gray-400 font-light tracking-widest uppercase text-xs"
        style={{ letterSpacing: "0.22em" }}
      >
        Welcome, {name}
      </p>

      <SignOutButton />
    </div>
  );
}
