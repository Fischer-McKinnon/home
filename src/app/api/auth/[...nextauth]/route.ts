import { handlers } from "@/auth";

// Expose NextAuth GET and POST handlers at /api/auth/*
// This covers: /api/auth/signin, /api/auth/signout, /api/auth/callback/google, etc.
export const { GET, POST } = handlers;
