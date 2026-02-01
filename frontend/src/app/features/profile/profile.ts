import { Component, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ProfileHeader } from "./components/profile-header/profile-header"
import { ReportService } from '../../core/services/reports/report.service'
import { ReportModal } from "../../core/shared/components/report-modal/report-modal"
import { ProfileService } from './profile.service'
import { ProfileBlogs } from "./components/profile-blogs/profile-blogs"
import { ConfirmationPopUp } from "../../core/shared/components/confirmation-pop-up/confirmation-pop-up"
import { BlogService } from '../blog/services/blog.service'
import { SnackbarService } from '../../core/shared/components/snackbar/snackbar.service'

@Component({
  selector: 'app-profile',
  imports: [ProfileHeader, ReportModal, ProfileBlogs, ConfirmationPopUp],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  reportService = inject(ReportService)
  profileService = inject(ProfileService)
  blogService = inject(BlogService)
  snackBar = inject(SnackbarService)
  router = inject(Router);
  route = inject(ActivatedRoute);

  profileId = signal<number | null>(null)

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      const id = Number(pm.get('id'));
      if (Number.isNaN(id)) {
        this.snackBar.error('Invalid profile id');
        this.router.navigateByUrl('/');
        return;
      }
      this.profileService.errorPage.set(false)
      this.profileId.set(id)
    }
    )
  }

  DelteBlog() {
    this.reportService.deleteBlog().subscribe({
      next: ((res) => {
        this.blogService.blogs.update(blogs => {
          return blogs.filter(ele => {
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
}
