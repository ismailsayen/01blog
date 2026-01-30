import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ReportsData, StatiqueInfo, StatiqueUsers } from '../../../core/shared/interfaces/dashboardInterfaces';
import { API_URL } from '../../../core/shared/api-url';
import { finalize } from 'rxjs';
import { UsersData } from '../../../core/shared/interfaces/userDTO';

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

  getStatiquesReports() {
    this.loader.set(true)
    return this.http.get<StatiqueInfo>(API_URL + "/user/admin/statiquesReports").pipe(
      finalize(() => {
        this.loader.set(false)
      })
    );
  }

  getStatiquesUsers() {
    
    return this.http.get<StatiqueUsers>(API_URL + "/user/admin/statiquesUsers")
  }

  getUsers() {
    this.loader.set(true)
    return this.http.get<UsersData[]>(API_URL + "/user/admin/allUsers").pipe(
      finalize(() => {
        this.loader.set(false)
      })
    );
  }

  getAllReports() {
    return this.http.get<ReportsData[]>(API_URL + "/report/all")
  }

}
