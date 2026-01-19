import { Component, input } from '@angular/core';

@Component({
  selector: 'app-body-card-blog',
  imports: [],
  templateUrl: './body-card-blog.html',
  styleUrl: './body-card-blog.scss',
})
export class BodyCardBlog {
  image = input<string | null>('');
  title = input.required<string>();
  content = input.required<string>();
}
