import { Component, inject } from '@angular/core';
import { BlogsComponent } from './components/blogs-component/blogs-component';
import { SuggestedUsers } from './components/suggested-users/suggested-users';
import { ReportService } from '../../core/services/reports/report.service';
import { ReportModal } from "../blog/components/report-modal/report-modal";

@Component({
  selector: 'app-home-component',
  imports: [BlogsComponent, SuggestedUsers, ReportModal],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  reportService = inject(ReportService);
}
