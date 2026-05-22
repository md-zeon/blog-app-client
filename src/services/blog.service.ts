import { env } from "@/env";

const API_URL = env.API_URL;

/**
 ** No Dynamic and no { cache: "no-store" } : SSG -> Static Page. Only generated at build time, and cached forever (until next build)
 ** { cache: "no-store" } : SSR -> Dynamic Page. Always up to date, but no caching at all, and slower than SSG.
 ** { next: { revalidate: 60 } } : ISR -> Static Page with Revalidation (rebuilds every 60 seconds) - mix betteen static and dynamic. Always up to date, but with caching (faster than SSR, but not as fast as SSG).
**/

export const blogService = {
  getBlogPosts: async function () {
    try {
      const res = await fetch(`${API_URL}/posts`, { next: { revalidate: 60 } });
      const data = await res.json();

      return { data, error: null };
    } catch {
      return { data: null, error: "Failed to fetch blog posts" };
    }
  },
};
