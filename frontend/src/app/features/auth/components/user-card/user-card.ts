import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { SearchUsersService } from '../../../../layouts/header/services/search-users.service';
import { RouterLink } from "@angular/router";
import { SearchedUsers } from '../../../../core/shared/interfaces/userDTO';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  users = input<SearchedUsers[] | null | undefined>();
  req = inject(SearchUsersService)
  @Output() confirm = new EventEmitter<number>()

  onClick(id: number) {
    this.confirm.emit(id)
  }
}
