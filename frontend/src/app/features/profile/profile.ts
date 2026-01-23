import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileHeader } from "./components/profile-header/profile-header";
import { ReportService } from '../../core/services/reports/report.service';
import { ReportModal } from "../../core/shared/components/report-modal/report-modal";
import { ProfileService } from './profile.service';
import { ProfileBlogs } from "./components/profile-blogs/profile-blogs";

@Component({
  selector: 'app-profile',
  imports: [ProfileHeader, ReportModal, ProfileBlogs],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  reportService = inject(ReportService)
  profileService = inject(ProfileService)

  profileId = inject(ActivatedRoute).snapshot.paramMap.get('id')
  check = Number(this.profileId)
}
