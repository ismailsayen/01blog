import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/userDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = import.meta.env.NG_APP_BACKENDURL;
  http = inject(HttpClient);

  currentUser = signal<User | undefined | null>(undefined);

  registerReq(data: any) {
    return this.http.post<User>(this.API_URL + '/auth/register', data);
  }

  loginReq(data: any) {
    return this.http.post<User>(this.API_URL + '/auth/login', data);
  }

  isLogged() {
    return this.http.post<User>(this.API_URL + '/auth/isLogged', null);
  }
}
