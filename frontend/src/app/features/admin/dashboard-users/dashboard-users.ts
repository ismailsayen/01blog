import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { ReportsData, StatiqueUsers } from '../../../core/shared/interfaces/dashboardInterfaces';
import { HeaderReports } from "../components/header-reports/header-reports";

@Component({
  selector: 'app-dashboard-users',
  imports: [HeaderReports],
  templateUrl: './dashboard-users.html',
  styleUrl: './dashboard-users.scss',
})
export class DashboardUsers implements OnInit {
  adminService = inject(AdminService);
  snackBar = inject(SnackbarService);
  router = inject(Router);

  statiques = signal<StatiqueUsers | null>(null);
  reports = signal<ReportsData[] | null>(null);


  ngOnInit(): void {
    this.adminService.getStatiquesUsers().subscribe({
      next: (res) => this.statiques.set(res),
      error: (err) => this.handleError(err),
    });

    this.adminService.getUsers().subscribe({
      next: (res) => console.log(res),
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
