import { env } from "@/env";

const API_URL = env.API_URL;

/**
 ** No Dynamic and no { cache: "no-store" } : SSG -> Static Page. Only generated at build time, and cached forever (until next build)
 ** { cache: "no-store" } : SSR -> Dynamic Page. Always up to date, but no caching at all, and slower than SSG.
 ** { next: { revalidate: 60 } } : ISR -> Static Page with Revalidation (rebuilds every 60 seconds) - mix betteen static and dynamic. Always up to date, but with caching (faster than SSR, but not as fast as SSG).
 **/

interface GetBlogPostsParams {
  search?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogPostsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      console.log("Fetching from URL:", url.toString());

      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return { data: null, error: "Failed to fetch blog posts" };
    }
  },
  getBlogPostById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return { data: null, error: "Failed to fetch blog post" };
    }
  },
};
