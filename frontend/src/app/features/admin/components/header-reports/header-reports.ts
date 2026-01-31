import { StatiqueBlogs, StatiqueUsers } from './../../../../core/shared/interfaces/dashboardInterfaces';
import { Component, input } from '@angular/core';
import { StatiqueInfo } from '../../../../core/shared/interfaces/dashboardInterfaces';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header-reports',
  imports: [NgClass],
  templateUrl: './header-reports.html',
  styleUrl: './header-reports.scss',
})
export class HeaderReports {
  statiques = input<StatiqueInfo | null>(null);
  statiquesUsers = input<StatiqueUsers | null>(null);
  statiquesBlogs = input<StatiqueBlogs | null>(null)
  type = input<string>('report')

  get statsConfig() {
    if (this.type() === 'report') {
      return [
        {
          icon: 'bi-people-fill',
          bg: 'bg-primary',
          label: 'users reported',
          value: this.statiques()?.usersCount
        },
        {
          icon: 'bi-journal-text',
          bg: 'bg-success',
          label: 'blogs reported',
          value: this.statiques()?.blogsCount
        },
        {
          icon: 'bi-flag-fill',
          bg: 'bg-danger',
          label: 'Total reports',
          value: this.statiques()?.reportsCount
        }
      ]
    }
    if (this.type() === "users") {
      // users context
      return [
        {
          icon: 'bi-people-fill',
          bg: 'bg-primary',
          label: 'Total users',
          value: this.statiquesUsers()?.usersCount
        },
        {
          icon: 'bi-person-check-fill',
          bg: 'bg-success',
          label: 'Active users',
          value: this.statiquesUsers()?.ActiveCount
        },
        {
          icon: 'bi-person-x-fill',
          bg: 'bg-danger',
          label: 'Banned users',
          value: this.statiquesUsers()?.BannnedCount
        }
      ]
    }

    // blogs context
    return [
      {
        icon: 'bi-journal-text',
        bg: 'bg-primary',
        label: 'Total blogs',
        value: this.statiquesBlogs()?.blogsCount
      },
      {
        icon: 'bi-eye-fill',
        bg: 'bg-success',
        label: 'Active blogs',
        value: this.statiquesBlogs()?.activeCount
      },
      {
        icon: 'bi-eye-slash-fill',
        bg: 'bg-danger',
        label: 'Hidden blogs',
        value: this.statiquesBlogs()?.hiddenCount
      }
    ]
  }


}
