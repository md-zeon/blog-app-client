import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = env.API_URL;

const CreateBlogFormServer = () => {
  const createBlog = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tagsString = formData.get("tags") as string;
    const tags = tagsString
      ? tagsString
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    const blogData = {
      title,
      content,
      tags,
    };

    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(blogData),
    });
    if (res.ok) {
      // On demand revalidation for blog posts list
      revalidateTag("blog-posts", "max"); // Mark tag for revalidation
      // updateTag("blog-posts"); // Force immediate revalidation
      // Use either revalidateTag or updateTag based on your needs. revalidateTag will mark the tag for revalidation on next access, while updateTag will trigger immediate revalidation.
    }
  };
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Blog</CardTitle>
        <CardDescription>
          Fill in the details below to create a new blog post.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="create-blog-form" action={createBlog} className="space-y-4">
          <FieldGroup>
            {/* Title */}
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input type="text" name="title" required />
            </Field>
            {/* Content */}
            <Field>
              <FieldLabel>Content</FieldLabel>
              <Textarea name="content" required />
            </Field>
            {/* Tags */}
            <Field>
              <FieldLabel>Tags (Comma Separated) </FieldLabel>
              <Input type="text" name="tags" />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="create-blog-form" className="w-full">
          Create Blog
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateBlogFormServer;
