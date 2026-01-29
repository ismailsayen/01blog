import { Component, model } from '@angular/core';
import { ReportsData } from '../../../../core/shared/interfaces/dashboardInterfaces';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-table-reports',
  imports: [RouterLink],
  templateUrl: './table-reports.html',
  styleUrl: './table-reports.scss',
})
export class TableReports {
  reports = model<ReportsData[] | null>(null)
}
