import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    // SiteHeader uses useState; mark the whole bundle as a client
    // component boundary for Next.js / Payload consumers.
    banner: { js: '"use client";' },
})
