import { inject, Injectable, signal } from '@angular/core';
import { API_URL } from '../../../../core/shared/api-url';
import { User } from '../../../../core/shared/interfaces/userDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);
  showPassword = signal(false)

  show() {
    this.showPassword.set(!this.showPassword())
  }
  registerReq(data: any) {
    return this.http.post<User>(API_URL + '/auth/register', data);
  }

  loginReq(data: any) {
    return this.http.post<User>(API_URL + '/auth/login', data);
  }
}
