import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { ReportsData, StatiqueInfo } from '../../../core/shared/interfaces/dashboardInterfaces';
import { HeaderReports } from "../components/header-reports/header-reports";
import { TableReports } from "../components/table-reports/table-reports";

@Component({
  selector: 'app-dashboard-reports',
  imports: [HeaderReports, TableReports],
  templateUrl: './dashboard-reports.html',
  styleUrl: './dashboard-reports.scss',
})
export class DashboardReports {
adminService = inject(AdminService);
  snackBar = inject(SnackbarService);
  router = inject(Router);

  statiques = signal<StatiqueInfo | null>(null);
  reports = signal<ReportsData[] | null>(null);

  ngOnInit(): void {
    this.loadStatiques();
    this.loadNewReports();
  }

  private loadStatiques() {
    this.adminService.getStatiquesReports().subscribe({
      next: (res) => this.statiques.set(res),
      error: (err) => this.handleError(err),
    });
  }

  private loadNewReports() {
    this.adminService.getAllReports().subscribe({
      next: (res) => this.reports.set(res),
      error: (err) => this.handleError(err),
    });
  }

  private handleError(err: any) {
    if (err?.status === 403) {
      this.router.navigateByUrl('/');
      this.snackBar.error("You don't have access.");
      return;
    }
    this.snackBar.error("Error while getting data. Please try later.");
  }
}
