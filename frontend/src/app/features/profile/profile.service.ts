import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProfileData } from '../../core/shared/interfaces/userDTO';
import { API_URL } from '../../core/shared/api-url';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient)
  errorPage = signal<boolean>(false)

  fetchProfile(idUser: number | null | undefined) {
  return  this.http.get<ProfileData>(API_URL + `/user/${idUser}`)
  }
}
