/**
 * Fischer McKinnon — Shared Tailwind Design Tokens
 *
 * Tailwind CSS v4: primary configuration lives in globals.css via @theme.
 * This file handles content scanning and is referenced via @config in globals.css.
 *
 * Copy both this file and globals.css to any FM app to inherit the full design system.
 *
 * Design tokens at a glance
 * ─────────────────────────
 * Font:           Inter  200 · 300 · 400 · 500
 * Black:          #111111
 * White:          #ffffff
 * Gray scale:     #fafafa · #f5f5f5 · #e8e8e8 · #d4d4d4 · #a3a3a3 · #737373 · #404040
 * Border radius:  0px (square everything)
 * Tracking:       headings –0.04em · labels 0.15–0.22em
 */

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
