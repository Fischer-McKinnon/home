# Google OAuth Authentication Pattern

Reference implementation for Fischer McKinnon apps.
Established in `Fischer-McKinnon/home` (TSK-11). Copy into `wedding`, `kin`, `signals`.

---

## Stack

| Layer | Package | Notes |
|---|---|---|
| Auth framework | `next-auth@beta` (v5) | App Router native |
| Provider | Google OAuth 2.0 | Via `next-auth/providers/google` |
| Session | JWT cookie (default) | No DB required for sessions |
| Route protection | `src/proxy.ts` | Next.js 16 replacement for `middleware.ts` |

---

## Files to copy

Copy these four files verbatim into any new Fischer McKinnon Next.js app:

```
src/auth.ts            ← NextAuth config + authorized callback
src/proxy.ts           ← Route protection (Next.js 16)
src/app/providers.tsx  ← SessionProvider for client components
.env.local.example     ← Env var template
```

Then update `src/app/layout.tsx` to wrap the body with `<Providers>`.

---

## How it works

### 1. `src/auth.ts`

The central auth config. Exports four things used throughout the app:

```ts
import { handlers, auth, signIn, signOut } from "@/auth";
```

- **`handlers`** — GET/POST handlers for the `/api/auth/*` route
- **`auth()`** — reads the current session in Server Components and Server Actions
- **`signIn()`** — programmatic sign-in (e.g. from a Server Action)
- **`signOut()`** — programmatic sign-out

The `authorized` callback controls which routes are public and which require auth.
Returning `false` automatically redirects to `/api/auth/signin`.

### 2. `src/app/api/auth/[...nextauth]/route.ts`

Two lines that wire NextAuth into the App Router:

```ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

This handles all of: `/api/auth/signin`, `/api/auth/signout`, `/api/auth/callback/google`, `/api/auth/session`, etc.

### 3. `src/proxy.ts`

Next.js 16 renamed `middleware.ts` → `proxy.ts` and `middleware` function → `proxy` function.

```ts
export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)"],
};
```

The `auth` export from NextAuth v5 doubles as a proxy/middleware function. It reads the JWT session cookie and calls the `authorized` callback to decide whether to allow or redirect the request.

### 4. `src/app/providers.tsx`

A `"use client"` wrapper around `SessionProvider`. Required only for client components that call `useSession()`. Server components call `auth()` directly.

---

## Customizing public routes

Edit the `authorized` callback in `src/auth.ts`:

```ts
authorized({ auth: session, request: { nextUrl } }) {
  const isLoggedIn = !!session?.user;
  const { pathname } = nextUrl;

  // Always public:
  if (pathname === "/") return true;
  if (pathname.startsWith("/api/auth")) return true;

  // Add more public routes here:
  // if (pathname.startsWith("/public")) return true;

  return isLoggedIn; // everything else requires auth
},
```

---

## Whitelisting specific Gmail accounts

To restrict access to specific Google accounts, add a `signIn` callback:

```ts
// in src/auth.ts, inside NextAuth({ ... })
callbacks: {
  async signIn({ user }) {
    const allowedEmails = [
      "markus@fischermckinnon.com",
      "partner@gmail.com",
    ];
    return allowedEmails.includes(user.email ?? "");
  },
  authorized({ auth: session, request: { nextUrl } }) {
    // ... existing logic unchanged
  },
},
```

Users not on the allowlist will see an "AccessDenied" error page instead of completing sign-in.

---

## Reading the session

### In Server Components / Server Actions

```ts
import { auth } from "@/auth";

export default async function ProtectedPage() {
  const session = await auth();
  // session.user.name, session.user.email, session.user.image
  return <div>Hello, {session?.user?.name}</div>;
}
```

### In Client Components

```ts
"use client";
import { useSession } from "next-auth/react";

export function UserAvatar() {
  const { data: session } = useSession();
  return <img src={session?.user?.image ?? ""} alt="avatar" />;
}
```

### Sign-in / sign-out buttons (Client Component)

```ts
"use client";
import { signIn, signOut } from "next-auth/react";

export function AuthButtons() {
  return (
    <>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
```

---

## Environment variables

All three are required. See `.env.local.example` for setup instructions.

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
```

For production (Vercel):
- Add all three in the Vercel project's Environment Variables settings.
- Add the production callback URL to the Google Cloud Console OAuth client:
  `https://<your-domain>/api/auth/callback/google`

Generate `NEXTAUTH_SECRET` with:
```bash
openssl rand -base64 32
```

---

## Next.js 16 notes

- `middleware.ts` is **deprecated** → use `proxy.ts`
- The exported function must be named `proxy` (not `middleware`)
- `export { auth as proxy }` is the idiomatic pattern with NextAuth v5
- Proxy now defaults to **Node.js runtime** (not Edge), so full Node.js APIs are available
- Async Request APIs (`cookies()`, `headers()`) must be awaited

See: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`
