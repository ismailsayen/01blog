import { Component, inject, input } from '@angular/core';
import { ReportService } from '../../../../core/services/reports/report.service';

@Component({
  selector: 'app-header-card-blog',
  imports: [],
  templateUrl: './header-card-blog.html',
  styleUrl: './header-card-blog.scss',
})
export class HeaderCardBlog {
  id = input.required<number>();
  avatar = input<string|null>();
  userName = input.required<string>();
  job = input.required<string>();
  categorie = input.required<string>();
    reportService = inject(ReportService);


}
