import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActionResponse, NotificationsData } from '../../../core/shared/interfaces/userDTO';
import { API_URL } from '../../../core/shared/api-url';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  http = inject(HttpClient)


  getNotifs() {
    return this.http.get<NotificationsData[]>(API_URL + "/notif");
  }


  ReadOrUnread(id: number) {

    return this.http.patch<ActionResponse>(API_URL + `/notif/${id}`,null);
  }

}
