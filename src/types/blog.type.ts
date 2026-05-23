export interface BlogPost {
  id: string | number;
  title: string;
  content: string;
  thumbnail?: string | null;
  tags?: string[];
  views: number;
  _count?: {
    comments: number;
  };
  isFeatured?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  parentId: string | null;
  status: "APPROVED" | "DRAFT" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}
