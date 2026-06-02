import type { NextConfig } from "next";

// When building for GitHub Pages (GITHUB_PAGES=true in CI), produce a fully
// static export served under the project base path `/myung_mvp`. Local dev
// and Vercel builds keep the default server-capable output.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "myung_mvp";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  turbopack: {
    root: process.cwd(),
  },
  ...(isPages
    ? {
        output: "export",
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        env: { NEXT_PUBLIC_STATIC_EXPORT: "true" },
      }
    : {}),
};

export default nextConfig;
