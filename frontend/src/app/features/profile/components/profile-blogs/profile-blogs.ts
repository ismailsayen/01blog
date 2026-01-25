import { Component, inject, input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { BlogService } from '../../../blog/services/blog.service';
import { BlogCard } from "../../../blog/blog-card/blog-card";

@Component({
  selector: 'app-profile-blogs',
  imports: [BlogCard],
  templateUrl: './profile-blogs.html',
  styleUrl: './profile-blogs.scss',
})
export class ProfileBlogs implements OnChanges, OnDestroy {
  blogService = inject(BlogService)
  profileId = input<number | null>()
  loader = signal<boolean>(false)

  ngOnDestroy(): void {
    this.blogService.blogs.set([])
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.blogService.blogs.set([])
    this.loader.set(true)

    this.blogService.getProfileBlogs(changes['profileId'].currentValue).subscribe({
      next: (res => {
        if (location.pathname.startsWith('/profile')) {
          this.blogService.blogs.set(res)
        }
      }),
      error: (err => {
        console.log(err);

      }),
      complete: (() => {
        this.loader.set(false)

      })
    })
  }
}


