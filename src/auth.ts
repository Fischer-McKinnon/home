import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    /**
     * Controls which requests are allowed through.
     * Called by the proxy (src/proxy.ts) on every matching route.
     *
     * Rules:
     * - Root page ("/") is always public — no sign-in required.
     * - Every other route requires a valid Google session.
     * - Returning `false` triggers an automatic redirect to /api/auth/signin.
     */
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const { pathname } = nextUrl;

      // Always allow: root landing page
      if (pathname === "/") return true;

      // Always allow: NextAuth's own endpoints (signin, signout, callback, etc.)
      // Without this, unauthenticated users would enter an infinite redirect loop.
      if (pathname.startsWith("/api/auth")) return true;

      // All other routes require a valid session
      if (isLoggedIn) return true;

      return false; // NextAuth redirects to /api/auth/signin automatically
    },
  },
  pages: {
    // You can create a custom sign-in page here later:
    // signIn: "/login",
  },
});
