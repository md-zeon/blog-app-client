import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/analytics",
      },
    ],
  },
  {
    title: "Content Management",
    url: "#",
    items: [
      {
        title: "Manage Blogs",
        url: "/manage-blogs",
      },
    ],
  },
];
