import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchUsersService } from '../../../../layouts/header/services/search-users.service';
import { SearchedUsers } from '../../../../core/shared/interfaces/SearchedUsers';
import { UserCard } from "../../../auth/components/user-card/user-card";

@Component({
  selector: 'app-suggested-users',
  imports: [UserCard],
  templateUrl: './suggested-users.html',
  styleUrl: './suggested-users.scss',
})
export class SuggestedUsers implements OnInit {
  searchUsersService = inject(SearchUsersService)
  users = signal<SearchedUsers[]>([])
  ngOnInit(): void {
    this.searchUsersService.getSuggestedUser().subscribe({
      next: (res => {
        this.users.set(res)

      })
    })
  }

}
