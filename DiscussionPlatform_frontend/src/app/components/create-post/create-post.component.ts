import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  post: Post = {
    id: 0,
    title: '',
    author: '',
    content: '',
    createdAt: new Date().toISOString(),
    comments: []
  };
  message: string | null = null; 

  constructor(private postService: PostService, private router: Router) { }

  onSubmit(): void {
    if (!this.post.title || !this.post.author || !this.post.content) {
      this.message = 'All fields are required';
      return;
    }
    this.postService.createPost(this.post).subscribe({
      next: (newPost) => {
        this.message = 'Post created successfully';
        console.log('Post created successfully', newPost);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000); // Wacht 2 seconden voordat je doorstuurt naar de homepagina
      },
      error: (err) => {
        this.message = 'Error creating post';
        console.error('Error creating post', err);
      }
    });
  }
}
