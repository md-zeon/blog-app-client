"use server";

import { blogService } from "@/services/blog.service";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogService.getBlogPosts();
};

export const createBlog = async (blogData: {
  title: string;
  content: string;
  tags: string[];
}) => {
  const res = await blogService.createBlogPost(blogData);
  if (!res.error) {
    updateTag("blog-posts"); // Force immediate revalidation
  }

  return res;
};
