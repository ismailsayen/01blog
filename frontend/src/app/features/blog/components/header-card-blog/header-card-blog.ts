import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header-card-blog',
  imports: [],
  templateUrl: './header-card-blog.html',
  styleUrl: './header-card-blog.scss',
})
export class HeaderCardBlog {
  avatar = input<string|null>();
  userName = input.required<string>();
  job = input.required<string>();
  categorie = input.required<string>();
}
