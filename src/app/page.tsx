import { SignInButton } from "@/components/sign-in-button";

/**
 * Auth gate — root page (public)
 *
 * The FISCHER McKINNON wordmark is perfectly centered on a white viewport.
 * Clicking it fires Google OAuth (NextAuth signIn) and redirects to /hub.
 *
 * This page is intentionally public (see src/proxy.ts + src/auth.ts).
 * All other routes (/hub, etc.) are protected behind Google sign-in.
 */
export default function AuthGatePage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <SignInButton />
    </div>
  );
}
