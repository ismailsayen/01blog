import { Component, HostListener, inject, input } from '@angular/core';
import { ReportService } from '../../../../core/services/reports/report.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './report-modal.html',
  styleUrl: './report-modal.scss',
})
export class ReportModal {
  reportService = inject(ReportService);
  reason = new FormControl('', Validators.required);
  clickOnWindow(event: Event) {
    const ele = event.target as HTMLElement;
    if (
      !(
        ele.parentElement?.classList.contains('info-report') ||
        ele.classList.contains('info-report')
      )
    ) {
      this.reportService.hide();
    }
  }
  onClick() {
    console.log(this.reason.value);
  }
}
