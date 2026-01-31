import { Component, inject, OnInit, signal } from '@angular/core'
import { AdminService } from '../services/admin.service'
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service'
import { Router, RouterLink } from '@angular/router'
import { ReportService } from '../../../core/services/reports/report.service'
import { BlogsData, StatiqueBlogs } from '../../../core/shared/interfaces/dashboardInterfaces'
import { HeaderReports } from "../components/header-reports/header-reports";
import { NgClass } from '@angular/common'
import { ConfirmationPopUp } from "../../../core/shared/components/confirmation-pop-up/confirmation-pop-up";

@Component({
  selector: 'app-dashboard-blogs',
  imports: [HeaderReports, NgClass, RouterLink, ConfirmationPopUp],
  templateUrl: './dashboard-blogs.html',
  styleUrl: './dashboard-blogs.scss',
})
export class DashboardBlogs implements OnInit {
  adminService = inject(AdminService)
  snackBar = inject(SnackbarService)
  router = inject(Router)
  reportsService = inject(ReportService)

  statiques = signal<StatiqueBlogs | null>(null)
  blogs = signal<BlogsData[] | null>(null)

  ngOnInit(): void {
    this.adminService.getStatiqueBlogs().subscribe({
      next: (res) => this.statiques.set(res),
      error: (err) => this.handleError(err),
    })

    this.adminService.getBlogs().subscribe({
      next: (res) => this.blogs.set(res),
      error: (err) => this.handleError(err),
    })
  }

  private handleError(err: any) {
    if (err?.status === 403) {
      this.router.navigateByUrl('/')
      this.snackBar.error("You don't have access.")
      return
    }
    this.snackBar.error("Error while getting data. Please try later.")
  }

  deleteBlog() {
    this.reportsService.deleteBlog().subscribe({
      next: ((res) => {
        this.blogs.update(blgs => {
          if (!blgs) {
            return null;
          }
          return blgs.filter(ele => {
            return ele.id !== res.id;
          })
        })
        this.snackBar.success(res.action)
      }),
      error: (() => {
        this.snackBar.error("Faild to Delete please try again")

      })
    })
  }
  HideOrUnhide(){


    this.reportsService.HideOrUnhide().subscribe({
      next: (res) => {
        this.blogs.update(blgs =>
          blgs?.map(blg =>
            blg.id === res.id
              ? { ...blg, status: res.status }
              : blg
          ) ?? null
        );
        this.snackBar.success("The user has been successfully banned/unbanned.")
      }
      ,
      error: (err) => this.handleError(err),
    });
  }
}
