import { Component, inject, input, OnInit } from '@angular/core';
import { ReportService } from '../../../../core/services/reports/report.service';
import { ProfileService } from '../../profile.service';

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

  ngOnInit(): void {

  }

}
