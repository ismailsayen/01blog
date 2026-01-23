import { Component, inject, input, OnInit } from '@angular/core';
import { BlogService } from '../../../blog/services/blog.service';
import { BlogCard } from "../../../blog/blog-card/blog-card";

@Component({
  selector: 'app-profile-blogs',
  imports: [BlogCard],
  templateUrl: './profile-blogs.html',
  styleUrl: './profile-blogs.scss',
})
export class ProfileBlogs implements OnInit {
  blogService = inject(BlogService)
  profileId = input<number | null>()
  ngOnInit(): void {

    this.blogService.getProfileBlogs(this.profileId()).subscribe({
      next: (res => {
        this.blogService.blogs.set(res)
      }),
      error: (err => {
        console.log(err);

      })
    })
  }

}
