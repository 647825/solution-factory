import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {
  @Input() postId!: number;
  comment: Comment = {
    id: 0,
    author: '',
    text: '',
    createdAt: new Date().toISOString(),
    postId: 0,
    parentCommentId: undefined,
    replies: []
  };
  message: string | null = null; 

  constructor(private commentService: CommentService) { }

  onSubmit(): void {
    if (!this.comment.author || !this.comment.text) {
      this.message = 'All fields are required';
      return;
    }
    this.comment.postId = this.postId;
    this.commentService.createComment(this.comment).subscribe({
      next: () => {
        this.message = 'Comment added successfully';
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Wacht 2 seconden voordat je de pagina herlaadt
      },
      error: (err) => {
        this.message = 'Error adding comment';
        console.error('Error adding comment', err);
      }
    });
  }
}
