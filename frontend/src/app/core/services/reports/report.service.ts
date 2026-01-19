import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  showReport = signal<boolean>(true);

  show(id: number, type: string) {
    console.log(id, type);

    this.showReport.set(true);
  }

  hide() {
    this.showReport.set(false);
  }
}
