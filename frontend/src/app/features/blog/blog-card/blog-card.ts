import { Component, input } from '@angular/core';
import { BlogInterface } from '../../../core/shared/interfaces/BlogInterface';
import { HeaderCardBlog } from '../components/header-card-blog/header-card-blog';
import { BodyCardBlog } from "../components/body-card-blog/body-card-blog";
import { FooterCardBlog } from "../components/footer-card-blog/footer-card-blog";

@Component({
  selector: 'app-blog-card',
  imports: [HeaderCardBlog, BodyCardBlog, FooterCardBlog],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss',
})
export class BlogCard {
  blog = input.required<BlogInterface>();
}
