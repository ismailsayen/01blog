import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/shared/api-url';
import { SearchedUsers } from '../../../core/shared/interfaces/SearchedUsers';

@Injectable({
  providedIn: 'root',
})
export class SearchUsersService {

  http = inject(HttpClient);

  search(value: string) {
    console.log(value);

    return this.http.get<SearchedUsers[]>(API_URL + `/user/search?name=${value}`)
  }

  getSuggestedUser() {
    return this.http.get<SearchedUsers[]>(API_URL + `/user/suggested`)
  }

}
