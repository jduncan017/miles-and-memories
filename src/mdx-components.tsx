import type { MDXComponents } from "mdx/types";

/*
 * Global MDX map, required by @next/mdx under the App Router. The long-form
 * templates (destination guides, travel tips, policies) style their prose by
 * wrapping the rendered body, so this stays empty until a component needs to be
 * available inside MDX.
 */
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
