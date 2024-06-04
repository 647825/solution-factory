export interface Comment {
  id: number;
  author: string;
  text: string;
  createdAt: string; 
  postId: number;
  parentCommentId?: number; 
  parentComment?: Comment;
  replies: Comment[];
}
