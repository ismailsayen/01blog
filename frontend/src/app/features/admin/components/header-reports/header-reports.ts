import { StatiqueUsers } from './../../../../core/shared/interfaces/dashboardInterfaces';
import { Component, input } from '@angular/core';
import { StatiqueInfo } from '../../../../core/shared/interfaces/dashboardInterfaces';

@Component({
  selector: 'app-header-reports',
  imports: [],
  templateUrl: './header-reports.html',
  styleUrl: './header-reports.scss',
})
export class HeaderReports {
 statiques = input<StatiqueInfo | null>(null);
 statiquesUsers = input<StatiqueUsers | null>(null);

 type=input<string>('report')
}
