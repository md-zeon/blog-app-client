import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const featuredPostPromise = blogService.getBlogPosts({
    isFeatured: true,
  });

  const postPromise = blogService.getBlogPosts(
    { limit: 3 },
    { revalidate: 60 },
  );

  const [featuredPosts, posts] = await Promise.all([
    featuredPostPromise,
    postPromise,
  ]);

  // console.time("Sequential Fetching");
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.timeEnd("Sequential Fetching");
  // Output:
  // Sequential Fetching: 6005.123ms

  // console.time("Parallel Fetching");
  // await Promise.all([
  //   new Promise((resolve) => setTimeout(resolve, 3000)),
  //   new Promise((resolve) => setTimeout(resolve, 3000)),
  // ]);
  // console.timeEnd("Parallel Fetching");
  // Output:
  // Parallel Fetching: 3005.456ms

  // Extract posts safely
  const featuredList = featuredPosts?.data?.data || [];
  const latestList = posts?.data?.data || [];

  // Separate the very first featured post for the Hero banner
  const [heroPost, ...remainingFeatured] = featuredList;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      {/* Hero Section */}
      {heroPost && (
        <section className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 transition-all hover:shadow-md">
          <Link
            href={`/blogs/${heroPost.id}`}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Hero Image Container */}
            <div className="relative aspect-16/10 md:aspect-video lg:aspect-auto lg:h-112.5 lg:col-span-7 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={heroPost.thumbnail}
                alt={heroPost.title}
                fill // Makes the image cover the entire container
                priority // Tells Next.js to load this image immediately (LCP optimization)
                className="object-cover object-center transition-transform duration-500 hover:scale-102"
                sizes="(max-w-1024px) 100vw, 58vw" // Responsive image sizes for better performance
              />
            </div>

            {/* Hero Content */}
            <div className="p-6 md:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 text-xs font-semibold tracking-wider uppercase rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  Featured Article
                </span>
                {heroPost.category && (
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {heroPost.category}
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight line-clamp-3 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {heroPost.title}
              </h1>

              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 line-clamp-3 md:line-clamp-4 leading-relaxed">
                {heroPost.excerpt ||
                  heroPost.description ||
                  "Dive into our top pick article of the week and explore the latest insights from our expert writers."}
              </p>

              {/* Author & Meta Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
                {heroPost.author?.image && (
                  <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-neutral-200 dark:ring-neutral-800">
                    <Image
                      src={heroPost.author.image}
                      alt={heroPost.author.name || "Author"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    {heroPost.author?.name || "Anonymous Writer"}
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {heroPost.createdAt
                      ? new Date(heroPost.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )
                      : "Recently Published"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Featured Section (Remaining featured items) */}
      {remainingFeatured.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            More Featured Reads
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingFeatured.map((post: BlogPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Latest Stories
        </h2>

        {latestList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestList.map((post: BlogPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 py-4">No recent posts found.</p>
        )}
      </section>
    </main>
  );
}
