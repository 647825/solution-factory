export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: string;  
  comments: Comment[];
}
