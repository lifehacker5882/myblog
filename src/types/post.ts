export type Post = {
  userId: string;
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number };
};
