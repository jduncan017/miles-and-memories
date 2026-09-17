import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "mdx"],

  /*
   * Metered defaults (dns-component-library HOW-TO-USE §8). The image cache TTL
   * defaults to 60 seconds; a month keeps transformations from re-billing. No
   * layout here requests wider than 1920, so 3840 is trimmed.
   */
  images: {
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", ["remark-mdx-frontmatter", { name: "frontmatter" }], "remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
