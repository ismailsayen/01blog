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

    return this.http.patch<ActionResponse>(API_URL + `/notif/${id}`, null);
  }


  DeletNotif(id: number) {
    return this.http.delete<ActionResponse>(API_URL + `/notif/${id}`);
  }

   DeletAll() {
    return this.http.delete(API_URL + `/notif/deleteAll`);
  }

  ReadAll() {
    return this.http.patch(API_URL + `/notif/markAllAsRead`, null);
  }
}
