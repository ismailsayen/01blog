import { Component, inject, model } from '@angular/core';
import { ReportsData } from '../../../../core/shared/interfaces/dashboardInterfaces';
import { Router, RouterLink } from "@angular/router";
import { ReportService } from '../../../../core/services/reports/report.service';
import { ConfirmationPopUp } from "../../../../core/shared/components/confirmation-pop-up/confirmation-pop-up";
import { SnackbarService } from '../../../../core/shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-table-reports',
  imports: [RouterLink, ConfirmationPopUp],
  templateUrl: './table-reports.html',
  styleUrl: './table-reports.scss',
})
export class TableReports {
  reportsService = inject(ReportService)
  reports = model<ReportsData[] | null>(null)

  snackBar = inject(SnackbarService);
  router = inject(Router);

  ResolveReport() {
    this.reportsService.ResolveReport().subscribe({
      next: (res) => {
        this.reports.update(rpts => {
          if (!rpts) {
            return null;
          }

          return rpts.map(rpt =>
            rpt.id === res.reportID
              ? { ...rpt, resolved: true }
              : rpt
          );
        });

        this.snackBar.success(res.message)
      }
      ,
      error: ((err) => {
        this.handleError(err)

      })
    })

  }

  deleteReport() {
    this.reportsService.RejectReport().subscribe({
      next: (res) => {
        this.reports.update(rpts => {
          if (!rpts) {
            return null;
          }

          return rpts.filter(rpt => rpt.id !== res.reportID);
        });
        this.snackBar.success(res.message)
      }
      ,
      error: ((err) => {
        this.handleError(err)
      })
    })
  }

  private handleError(err: any) {
    if (err?.status === 403) {
      this.router.navigateByUrl('/');
      this.snackBar.error("You don't have access.");
      return;
    }
    if (err?.status === 404) {
      this.snackBar.error("No Report found");
    }

    this.snackBar.error("Error while getting data. Please try later.");
  }
}
