import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ReportService } from '../../../../core/services/reports/report.service';
import { ProfileService } from '../../profile.service';
import { ProfileData } from '../../../../core/shared/interfaces/userDTO';
import { Router } from '@angular/router';
import { Snackbar } from '../../../../core/shared/components/snackbar/snackbar';
import { SnackbarService } from '../../../../core/shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-profile-header',
  imports: [],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader implements OnInit {
  profileId = input<number | null>()
  reportService = inject(ReportService)
  profileService = inject(ProfileService)
  router = inject(Router)
  snackBar=inject(SnackbarService)
  profileData = signal<ProfileData | null>(null)
  ngOnInit(): void {
    this.profileService.fetchProfile(this.profileId()).subscribe({
      next:(res=>{
        this.profileData.set(res)
        
      }),
      error:(err=>{
        if(err.status===404){
          this.profileService.errorPage.set(true)
          return
        }
          this.snackBar.error("Failed to get user")
        this.router.navigateByUrl('/')
      })
    })
  }

}
