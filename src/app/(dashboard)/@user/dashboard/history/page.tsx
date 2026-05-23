import PaginationControls from "@/components/modules/pagination/PaginationControls";
import HistoryTable from "@/components/modules/user/history/HistoryTable";
import { blogService } from "@/services/blog.service";

const HistoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  const { page, limit } = await searchParams;
  const res = await blogService.getBlogPosts({
    page: Number(page),
    limit: Number(limit),
  });
  // console.log(res);

  const posts = res.data?.data;
  const pagination = res.data?.meta;

  // console.log(posts);
  console.log(pagination);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Post History</h1>
      <HistoryTable posts={posts} />
      <PaginationControls meta={pagination} />
    </div>
  );
};

export default HistoryPage;
