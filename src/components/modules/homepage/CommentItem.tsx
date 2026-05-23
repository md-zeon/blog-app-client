import { Comment } from "@/types";

const CommentItem = ({
  comment,
  depth = 0,
}: {
  comment: Comment;
  depth?: number;
}) => {
  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const isUpdated = comment.createdAt !== comment.updatedAt;

  return (
    <div className="mt-4">
      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {comment.authorId.substring(0, 2).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {comment.authorId.startsWith("user_")
                ? comment.authorId
                : `User (${comment.authorId.substring(0, 5)})`}
            </span>
          </div>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {formattedDate}{" "}
            {isUpdated && (
              <span className="italic text-zinc-400 text-[10px] ml-1">
                (edited)
              </span>
            )}
          </span>
        </div>

        {/* Comment Content */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>

      {/* Render Nested Replies Recursively */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-4 sm:pl-6 ml-3 sm:ml-4 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-1">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
