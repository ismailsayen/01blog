import { Component, input } from '@angular/core';
import { BlogInterface } from '../../../core/shared/interfaces/BlogInterface';
import { HeaderCardBlog } from '../components/header-card-blog/header-card-blog';

@Component({
  selector: 'app-blog-card',
  imports: [HeaderCardBlog],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss',
})
export class BlogCard {
  blog = input.required<BlogInterface>();
}
