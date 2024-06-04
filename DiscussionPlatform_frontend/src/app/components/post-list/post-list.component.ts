import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, DatePipe, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewInit {
  posts: Post[] = [];
  page = 0;
  pageSize = 10;
  loading = false;

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadInitialPosts();
  }

  ngAfterViewInit(): void {
    this.setupScrollListener();
  }

  loadInitialPosts(): void {
    this.loading = true;
    this.postService.getPosts(this.page, this.pageSize).subscribe({
      next: (newPosts) => {
        this.posts = newPosts;
        this.sortPostsByDate();
        console.log('Initial load:', this.posts); // Voeg log toe om de volgorde te controleren
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading posts', err);
        this.loading = false;
      }
    });
  }

  loadMorePosts(): void {
    if (this.loading) {
      return;
    }

    const scrollOffset = this.viewport.measureScrollOffset();

    this.loading = true;
    this.postService.getPosts(this.page, this.pageSize).subscribe({
      next: (newPosts) => {
        if (newPosts.length > 0) {
          const oldPostsLength = this.posts.length;
          this.posts = [...this.posts, ...newPosts];
          this.sortPostsByDate();
          console.log('After scroll load:', this.posts); // Voeg log toe om de volgorde te controleren

          // Gebruik een setTimeout om de scrollpositie in te stellen na het updaten van de DOM
          setTimeout(() => {
            this.viewport.scrollToOffset(scrollOffset);
          }, 100);

          this.page++;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading posts', err);
        this.loading = false;
      }
    });
  }

  sortPostsByDate(): void {
    this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  setupScrollListener(): void {
    fromEvent(this.viewport.elementRef.nativeElement, 'scroll')
      .pipe(throttleTime(200))
      .subscribe(() => this.onScroll());
  }

  onScroll(): void {
    const end = this.viewport.measureScrollOffset('bottom');
    if (end < 200 && !this.loading) {
      this.loadMorePosts();
    }
  }
}
