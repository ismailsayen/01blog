import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service';
import { Router, RouterLink } from '@angular/router';
import { StatiqueUsers } from '../../../core/shared/interfaces/dashboardInterfaces';
import { HeaderReports } from "../components/header-reports/header-reports";
import { UsersData } from '../../../core/shared/interfaces/userDTO';
import { NgClass } from '@angular/common';
import { ReportService } from '../../../core/services/reports/report.service';
import { ConfirmationPopUp } from "../../../core/shared/components/confirmation-pop-up/confirmation-pop-up";

@Component({
  selector: 'app-dashboard-users',
  imports: [HeaderReports, NgClass, RouterLink, ConfirmationPopUp],
  templateUrl: './dashboard-users.html',
  styleUrl: './dashboard-users.scss',
})
export class DashboardUsers implements OnInit {
  adminService = inject(AdminService);
  snackBar = inject(SnackbarService);
  router = inject(Router);
  reportsService = inject(ReportService)

  statiques = signal<StatiqueUsers | null>(null);
  users = signal<UsersData[] | null>(null);

  ngOnInit(): void {
    this.adminService.getStatiquesUsers().subscribe({
      next: (res) => this.statiques.set(res),
      error: (err) => this.handleError(err),
    });

    this.adminService.getUsers().subscribe({
      next: (res) => this.users.set(res),
      error: (err) => this.handleError(err),
    });
  }

  banOrUnban() {
    this.reportsService.BanOrUnban().subscribe({
      next: (res) => {
        this.users.update(users =>
          users?.map(user =>
            user.id === res.id
              ? { ...user, banned: res.status }
              : user
          ) ?? null
        );
        this.snackBar.success("The user has been successfully banned/unbanned.")
      }
      ,
      error: (err) => this.handleError(err),
    });
  }

  deleteUser() {
    this.reportsService.deleteUser().subscribe({
      next: (res) => {
        this.users.update(users =>
          users?.filter(user =>
            user.id !== res.id
          ) ?? null
        );
        this.snackBar.success("You have been deleted successfully")

      }
      ,
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
