import React from "react";
/**
 * We can use dynamic routes to create a blog details page. The file name [id].tsx indicates that this page will be rendered for any route that matches the pattern /blogs/:id, where :id is a dynamic segment that can be accessed in the component to fetch and display the appropriate blog details.
 * We can get the dynamic segment (id) in both client and server component
 * In a client component, we can use the useRouter hook from next/navigation to access the dynamic segment. For example:
 * ```tsx
 * import { useRouter } from 'next/navigation';
 * const router = useRouter();
 * const { id } = router.query;
 * ```
 * We can also use the useParams hook from next/navigation to access the dynamic segment. For example:
 * ```tsx
 * import { useParams } from 'next/navigation';
 * const { id } = useParams();
 * ```
 * In a server component, we can access the dynamic segment through the context parameter of the page component. For example:
 * ```tsx
 * const BlogDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
 *   const { id } = params;
 * }
 * ```
 * The Promise type is used here because the params object is resolved asynchronously, allowing us to fetch data based on the dynamic segment before rendering the page.
 */

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <div>Blog Details Page {id}</div>;
};

export default BlogDetailsPage;
