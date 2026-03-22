"use client";

import { signIn } from "next-auth/react";

/**
 * SignInButton — auth gate trigger
 *
 * Renders the FISCHER McKINNON typographic wordmark.
 * Clicking anywhere on it fires Google OAuth via NextAuth and
 * redirects to /hub after successful sign-in.
 *
 * To swap in the PNG logo once available, replace the two <span> elements
 * with:
 *   <Image src="/fischer-mckinnon-logo.png" alt="Fischer McKinnon" ... />
 */
export function SignInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/hub" })}
      className="group flex flex-col items-center cursor-pointer bg-transparent border-0 p-0 select-none focus:outline-none"
      aria-label="Sign in with Google to continue"
    >
      {/* FISCHER */}
      <span
        className="block font-thin uppercase leading-none text-black transition-opacity duration-500 ease-out group-hover:opacity-40"
        style={{
          fontSize: "clamp(1.75rem, 9vw, 5.5rem)",
          letterSpacing: "0.30em",
        }}
      >
        FISCHER
      </span>

      {/* McKINNON — slightly smaller to optically balance */}
      <span
        className="block font-thin uppercase leading-none text-black transition-opacity duration-500 ease-out group-hover:opacity-40"
        style={{
          fontSize: "clamp(1.4rem, 7.2vw, 4.4rem)",
          letterSpacing: "0.30em",
          marginTop: "0.15em",
        }}
      >
        McKINNON
      </span>
    </button>
  );
}
