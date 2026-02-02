import { Component, effect, HostListener, inject, OnInit, signal } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { NotificationsData } from '../../../core/shared/interfaces/userDTO';
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [NgClass],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications implements OnInit {

  notifService = inject(NotificationsService)
  snackBarService = inject(SnackbarService)

  notifs = signal<NotificationsData[]>([])

  // constructor(){
  //   effect(()=>{

  //   })
  // }
  ngOnInit(): void {
    this.notifService.getNotifs().subscribe({
      next: res => {
        this.notifs.set(res);
      },
      error: () => {
        this.snackBarService.error('error while getting Notifs.')
      }
    })
  }

  ReadOrUnread(id: number) {
    this.notifService.ReadOrUnread(id).subscribe({
      next: res => {

        this.notifs.update(not =>

          not.map(notif => {
            return notif.id === res.id ? { ...notif, readed: res.status } : notif
          })
        )
        // this.notifs.set(res);
      },
      error: () => {
        this.snackBarService.error('error.')
      }
    })
  }





}
