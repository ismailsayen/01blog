import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ReportsData, StatiqueInfo } from '../../../core/shared/interfaces/dashboardInterfaces';
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { TableReports } from "../components/table-reports/table-reports";

@Component({
  selector: 'app-dashboard-home',
  imports: [TableReports],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})
export class DashboardHome implements OnInit {
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
    this.adminService.getStatiques().subscribe({
      next: (res) => this.statiques.set(res),
      error: (err) => this.handleError(err),
    });
  }

  private loadNewReports() {
    this.adminService.getNewReports().subscribe({
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