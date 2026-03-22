/**
 * Fischer McKinnon — Route Protection Proxy
 *
 * Next.js 16 renamed `middleware.ts` → `proxy.ts` and the exported function
 * from `middleware` → `proxy`. Functionality is identical; only the names changed.
 *
 * Strategy:
 * - "/" (root landing page) is public — no sign-in required.
 * - "/api/auth/*" is always public — these are the NextAuth endpoints.
 * - Every other path requires a valid Google session.
 *
 * The `authorized` callback in src/auth.ts drives the allow/redirect logic.
 * Returning `false` from `authorized` automatically redirects to /api/auth/signin.
 *
 * To copy this pattern into wedding/kin/signals:
 *   1. Copy src/auth.ts and src/proxy.ts verbatim.
 *   2. Adjust the `authorized` callback if that app has its own public routes.
 *   3. Add the same three env vars to the new app's .env.local.
 */

export { auth as proxy } from "@/auth";

export const config = {
  matcher: [
    /*
     * Run on all paths except:
     * - _next/static  (compiled JS/CSS bundles)
     * - _next/image   (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (static metadata)
     *
     * Note: api/auth/* is intentionally included in the matcher.
     * NextAuth's own route handler is always reachable because the
     * `authorized` callback returns `true` for those paths (see auth.ts).
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)",
  ],
};
