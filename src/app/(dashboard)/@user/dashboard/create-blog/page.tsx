import CreateBlogFormClient from "@/components/modules/user/CreateBlog/CreateBlogFormClient";
// import CreateBlogFormServer from "@/components/modules/user/CreateBlog/CreateBlogFormServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
const CreateBlogPage = async () => {
  const { data } = await blogService.getBlogPosts();
  return (
    <div>
      {/* <CreateBlogFormServer /> */}
      <CreateBlogFormClient />
      {data.data.map((blog: BlogPost) => (
        <p key={blog.id}>{blog.title}</p>
      ))}
    </div>
  );
};

export default CreateBlogPage;
