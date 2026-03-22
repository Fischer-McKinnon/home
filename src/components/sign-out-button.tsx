"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-gray-300 font-light text-xs uppercase tracking-widest hover:text-black transition-colors duration-300 bg-transparent border-0 cursor-pointer p-0"
      style={{ letterSpacing: "0.22em" }}
    >
      Sign out
    </button>
  );
}
