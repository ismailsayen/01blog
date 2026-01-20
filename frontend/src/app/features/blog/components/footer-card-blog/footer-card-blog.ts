import { Component, inject, input, signal } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-footer-card-blog',
  imports: [],
  templateUrl: './footer-card-blog.html',
  styleUrl: './footer-card-blog.scss',
})
export class FooterCardBlog {
  id = input.required<number>();
  lastUpdateAt = input<Date | null>();
  likeCount = input.required<number>();
  commentsCount = input.required<number>();
  createdAt = input.required<Date>();
  liked = input.required<boolean>();

  blogService = inject(BlogService);
  loader = signal(false);

  onClik() {
    this.loader.set(true);
    this.blogService.ReactToBlog(this.id()).subscribe({
      next: (res) => {
        const n = res.status ? 1 : -1;

        this.blogService.blogs.update((blogs) =>
          blogs.map((blog) =>
            blog.id === this.id()
              ? { ...blog, likeCount: Math.max(0, blog.likeCount + n), liked: res.status }
              : blog

          )
        );
        this.loader.set(false);
      },
    });
  }
}
