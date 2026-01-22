import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_URL } from '../../../core/shared/api-url';
import { SearchedUsers } from '../../../core/shared/interfaces/SearchedUsers';
import { followResponse } from '../../../core/shared/interfaces/userDTO';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchUsersService {

  http = inject(HttpClient);
  loader = signal<boolean>(false)
  search(value: string) {

    return this.http.get<SearchedUsers[]>(API_URL + `/user/search?name=${value}`)
  }

  getSuggestedUser() {
    return this.http.get<SearchedUsers[]>(API_URL + `/user/suggested`)
  }

  sendRequestFollow(userId:number){
    this.loader.set(true)
    return this.http.post<followResponse>(API_URL+`/follow/${userId}`,null).pipe(
      finalize(()=>{
        this.loader.set(false)
      })
    );
  }
}
