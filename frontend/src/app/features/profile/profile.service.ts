import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  errorPage = signal<boolean>(false)

  fetchProfile(idUser: number) {
    
  }
}
