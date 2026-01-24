import { Component, inject, input } from '@angular/core';
import { ReportService } from '../../../../core/services/reports/report.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-card-blog',
  imports: [RouterLink],
  templateUrl: './header-card-blog.html',
  styleUrl: './header-card-blog.scss',
})
export class HeaderCardBlog {
  reportService = inject(ReportService);
  
  id = input.required<number>();
  avatar = input<string | null>();
  userName = input.required<string>();
  job = input.required<string>();
  userId = input.required<number>();
  categorie = input.required<string>();
  myBlog = input.required<boolean>();

}
