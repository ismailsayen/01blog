import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_URL } from '../../../core/shared/api-url';
import { followResponse, SearchedUsers } from '../../../core/shared/interfaces/userDTO';
import { finalize } from 'rxjs';

interface loaderByIdInterface {
  isLoad: boolean,
  id: number
}
@Injectable({
  providedIn: 'root',
})
export class SearchUsersService {

  http = inject(HttpClient);
  loaderById = signal<loaderByIdInterface | null>(null)
  search(value: string) {

    return this.http.get<SearchedUsers[]>(API_URL + `/user/search?name=${value}`)
  }

  getSuggestedUser() {
    return this.http.get<SearchedUsers[]>(API_URL + `/user/suggested`)
  }

  sendRequestFollow(userId: number) {
    this.loaderById.set({ isLoad: true, id: userId })
    return this.http.post<followResponse>(API_URL + `/follow/${userId}`, null).pipe(
      finalize(() => {
        this.loaderById.set(null)
      })
    )

  }
}
