import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/interfaces/userDTO';
import { API_URL } from '../../shared/api-url';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http = inject(HttpClient);
  currentUser = signal<User | undefined | null>(undefined);

  isLogged() {
    return this.http.post<User>(API_URL + '/auth/isLogged', null).pipe(
      tap(user => {
        this.currentUser.set(user)
      }),
      catchError((err) => {
        this.currentUser.set(null)
        return of(null)
      })
    )
  }
}

