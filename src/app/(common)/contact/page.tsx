"use client";
import { getBlogs } from "@/actions/blog.action";
import React from "react";

const ContactPage = () => {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState<string | null>(null);

  console.log(data, error);
  React.useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();
      setData(data);
      setError(error);
    })();
  }, []);
  return <div>Contact Page</div>;
};

export default ContactPage;
