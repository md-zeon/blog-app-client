import CommentItem from "@/components/modules/homepage/CommentItem";
import { blogService } from "@/services/blog.service";
import { BlogPost, Comment } from "@/types";

export async function generateStaticParams() {
  const { data } = await blogService.getBlogPosts();

  // [{ id: "1" }, { id: "2" }, ...]
  return data?.data?.map((post: BlogPost) => ({ id: post.id })); // Generate static paths for all blog posts
}

// export const dynamicParams = false; // Disable dynamic routes since we're pre-generating all paths

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: blog } = await blogService.getBlogPostById(id);

  const publishDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Blog Meta Data Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {blog.status === "DRAFT" && (
            <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs px-2.5 py-1 rounded-full font-medium border border-amber-200/60 dark:border-amber-900/50">
              Draft Mode
            </span>
          )}
          {blog.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-md font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-500 mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Author:
            </span>{" "}
            {blog.authorId}
          </div>
          <div>{publishDate}</div>
          <div className="flex items-center gap-1">
            <span>{blog.views} views</span>
          </div>
        </div>
      </header>

      {/* Main Blog Post Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none mb-14 text-zinc-800 dark:text-zinc-300 leading-relaxed text-base sm:text-lg">
        <p className="whitespace-pre-wrap">{blog.content}</p>
      </div>

      {/* Comments Section Container */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 pt-10">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
          <span>Discussion</span>
          <span className="text-sm font-normal bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full text-zinc-600 dark:text-zinc-400">
            {blog._count.comments}
          </span>
        </h2>

        {/* Comment List */}
        <div className="space-y-6">
          {blog.comments.length > 0 ? (
            blog.comments.map((comment: Comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="text-sm text-zinc-500 text-center py-6">
              No comments yet. Start the conversation!
            </p>
          )}
        </div>
      </section>
    </article>
  );
};

export default BlogDetailsPage;
