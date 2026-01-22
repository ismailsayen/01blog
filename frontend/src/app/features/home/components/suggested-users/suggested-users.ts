import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchUsersService } from '../../../../layouts/header/services/search-users.service';
import { SearchedUsers } from '../../../../core/shared/interfaces/SearchedUsers';
import { UserCard } from "../../../auth/components/user-card/user-card";
import { SnackbarService } from '../../../../core/shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-suggested-users',
  imports: [UserCard],
  templateUrl: './suggested-users.html',
  styleUrl: './suggested-users.scss',
})
export class SuggestedUsers implements OnInit {
  searchUsersService = inject(SearchUsersService)
  users = signal<SearchedUsers[] | null | undefined>([])
  snackBar = inject(SnackbarService)



  ngOnInit(): void {
    this.searchUsersService.getSuggestedUser().subscribe({
      next: (res => {
        if (res.length === 0) {
          this.users.set(null)
          return
        }
        this.users.set(res)
      })
    })
  }
  sendFollowReq(id: number) {

    this.searchUsersService.sendRequestFollow(id).subscribe({
      next: (res => {
        this.users.update(users =>
          users?.map(user =>
            user.id === res.userId ? { ...user, followed: res.status } : user
          )
        )
        this.snackBar.success(res.action)
      }
      ),
      error: (() => {
        this.snackBar.error("failed to send follow Request")

      }),

    })
  }
}
