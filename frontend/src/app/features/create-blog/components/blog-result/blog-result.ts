import { Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-result',
  imports: [MarkdownModule],
  templateUrl: './blog-result.html',
  styleUrl: './blog-result.scss',
})
export class BlogResult {
  data=input<string | null>('')
}
