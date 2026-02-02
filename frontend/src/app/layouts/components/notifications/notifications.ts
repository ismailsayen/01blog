import { Component, effect, inject, OnInit, signal } from '@angular/core'
import { NotificationsService } from './notifications.service'
import { NotificationsData } from '../../../core/shared/interfaces/userDTO'
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service'
import { NgClass } from '@angular/common'

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
  readNotifs = signal<boolean>(false)
  numNotifs = signal<number>(0)

  ngOnInit(): void {
    this.notifService.getNotifs().subscribe({
      next: res => {
        this.notifs.set(res)
      },
      error: () => {
        this.snackBarService.error('error while getting Notifs.')
      }
    })
  }
  constructor() {
    effect(() => {
      const some = this.notifs().every(ele => ele.readed === true)
      const unreadNotifs = this.notifs().filter(ele => ele.readed == false).length
      this.readNotifs.set(some)
      this.numNotifs.set(unreadNotifs)
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

      },
      error: () => {
        this.snackBarService.error('error.')
      }
    })
  }


  ReadAll() {

    if (this.readNotifs()) {
      this.snackBarService.info("All your notifs was already readded")
      return
    }
    this.notifService.ReadAll().subscribe({
      next: () => {
        this.notifs.update(not =>
          not.map(notif => {

            return !notif.readed ? { ...notif, readed: true } : notif
          })
        )

      },
      error: () => {
        this.snackBarService.error('error.')
      }
    })
  }
  DeleteNotif(id: number) {
    this.notifService.DeletNotif(id).subscribe({
      next: res => {

        this.notifs.update(not =>
          not.filter(notif => {
            return notif.id !== res.id
          })
        )

      },
      error: () => {
        this.snackBarService.error('error.')
      }
    })
  }

  DeleteAll() {
    if (this.notifs().length === 0) {
      this.snackBarService.info("You don't have any notif")
      return
    }

    this.notifService.DeletAll().subscribe({
      next: () => {
        this.notifs.set([])
      },
      error: () => {
        this.snackBarService.error('error.')
      }
    })
  }

}
