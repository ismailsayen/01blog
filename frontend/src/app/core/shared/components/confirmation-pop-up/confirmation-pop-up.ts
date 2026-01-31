import { Component, EventEmitter, HostListener, inject, input, Output, signal } from '@angular/core';
import { ReportService } from '../../../services/reports/report.service';

@Component({
  selector: 'app-confirmation-pop-up',
  imports: [],
  templateUrl: './confirmation-pop-up.html',
  styleUrl: './confirmation-pop-up.scss',
})
export class ConfirmationPopUp {
  reportService = inject(ReportService);

  @Output() confirm = new EventEmitter<void>()
  submit() {
    this.confirm.emit()
  }

  @HostListener('document:click')
  close(){
    
    this.reportService.hideConfirm()
  }
}
