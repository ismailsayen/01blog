import { Component, inject, input, signal } from '@angular/core';
import { ReportService } from '../../../../core/services/reports/report.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationPopUp } from '../confirmation-pop-up/confirmation-pop-up';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-report-modal',
  imports: [ReactiveFormsModule, ConfirmationPopUp],
  templateUrl: './report-modal.html',
  styleUrl: './report-modal.scss',
})
export class ReportModal {
  reportService = inject(ReportService);
  snackbarService = inject(SnackbarService)
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

  SaveReport() {
    this.reportService.reportBlogOrProfile(this.reason.value).subscribe({
      next: (res) => {
        this.reportService.hide()
        this.reportService.hideConfirm()
        this.snackbarService.success(res.Message)
      },
      error: () => {

        this.snackbarService.error("Faild to report please try again")
      },
      complete:()=>{
        this.reportService.loader.set(false)
      }
    })
  }
  onClick() {
    if (this.reason.invalid) {
      this.reason.markAllAsDirty()
      return
    }
    this.reportService.showConfirm()
  }
}
