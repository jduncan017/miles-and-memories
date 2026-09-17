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
    /*
     * The sources in public/images are Framer's originals, already efficient
     * webp, so the only re-encode is next/image's resize. At the default 75
     * that pass visibly softened photos; 90 is indistinguishable from the
     * source at display size. Being the only allowed value, every <Image>
     * resolves to it without a per-call `quality` prop.
     */
    qualities: [90],
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
