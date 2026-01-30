import { Component, inject, input, model, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ReportService } from '../../../../core/services/reports/report.service';
import { ProfileService } from '../../profile.service';
import { ProfileData } from '../../../../core/shared/interfaces/userDTO';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../core/shared/components/snackbar/snackbar.service';
import { finalize } from 'rxjs';
import { SearchUsersService } from '../../../../layouts/components/header/services/search-users.service';

@Component({
  selector: 'app-profile-header',
  imports: [],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader implements OnChanges {
  profileId = input<number | null>()

  reportService = inject(ReportService)
  profileService = inject(ProfileService)
  searchUsersService = inject(SearchUsersService)
  router = inject(Router)
  snackBar = inject(SnackbarService)

  profileData = signal<ProfileData | null>(null)
  loaderFollow = signal<boolean>(false)
  loaderDataProfile = signal<boolean>(false)

  ngOnChanges(changes: SimpleChanges): void {
    this.loaderDataProfile.set(true)
    this.profileService.fetchProfile(changes['profileId'].currentValue).pipe(
      finalize(() => this.loaderDataProfile.set(false)
      )).subscribe({
        next: (res => {
          this.profileData.set(res)
        }),
        error: (err => {
          if (err.status === 404) {
            this.profileService.errorPage.set(true)
            return
          }
          this.snackBar.error("Failed to get user")
          this.router.navigateByUrl('/')
        }),

      })

  }

  sendFollowReq(id: number) {
    this.loaderFollow.set(true)
    this.searchUsersService.sendRequestFollow(id).subscribe({
      next: ((res) => {
        this.profileData.update((profile) => {
          if (!profile) {
            return profile
          }
          const n = res.status ? 1 : -1;
          return {
            ...profile,
            followers: Math.max(0, profile.followers + n),
            followed: res.status
          };
        })

      }),

      error: (() => {
        this.snackBar.error("failed to send follow Request")

      }),
      complete: (() => {
        this.loaderFollow.set(false)
      })
    })
  }

}
