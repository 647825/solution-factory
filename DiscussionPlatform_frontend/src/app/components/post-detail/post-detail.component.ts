import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, CreateCommentComponent, FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  comments: Comment[] = [];
  replyComment: Comment = {
    id: 0,
    author: '',
    text: '',
    createdAt: new Date().toISOString(),
    postId: 0,
    parentCommentId: undefined,
    replies: []
  };
  replyParentId: number | undefined = undefined;
  message: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe(post => {
      this.post = post;
    });
    this.commentService.getCommentsForPost(id).subscribe(comments => {
      this.comments = comments;
    });
  }

  startReply(parentCommentId: number): void {
    this.replyParentId = parentCommentId;
    this.replyComment = {
      id: 0,
      author: '',
      text: '',
      createdAt: new Date().toISOString(),
      postId: this.post.id,
      parentCommentId: parentCommentId,
      replies: []
    };
    this.message = null;
  }

  cancelReply(): void {
    this.replyParentId = undefined;
    this.replyComment = {
      id: 0,
      author: '',
      text: '',
      createdAt: new Date().toISOString(),
      postId: this.post.id,
      parentCommentId: undefined,
      replies: []
    };
    this.message = null; 
  }

  submitReply(): void {
    if (!this.replyComment.author || !this.replyComment.text) {
      this.message = 'All fields are required';
      return;
    }
    this.commentService.createComment(this.replyComment).subscribe({
      next: (newComment) => {
        const parentComment = this.comments.find(comment => comment.id === this.replyParentId);
        if (parentComment) {
          parentComment.replies.push(newComment);
        }
        this.cancelReply();
        this.message = 'Reply posted successfully';
        setTimeout(() => {
          this.message = null;
        }, 2000);
      },
      error: (err) => {
        this.message = 'Error posting reply';
        console.error('Error posting reply', err);
      }
    });
  }
}
