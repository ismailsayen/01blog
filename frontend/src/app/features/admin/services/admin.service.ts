import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ReportsData, StatiqueInfo } from '../../../core/shared/interfaces/dashboardInterfaces';
import { API_URL } from '../../../core/shared/api-url';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  http = inject(HttpClient)
  loader = signal<boolean>(false)
  getStatiques() {
    this.loader.set(true)
    return this.http.get<StatiqueInfo>(API_URL + "/user/admin/statiques").pipe(
      finalize(() => {
        this.loader.set(false)
      })
    );
  }
  getNewReports() {
    return this.http.get<ReportsData[]>(API_URL + "/report")
  }

}
