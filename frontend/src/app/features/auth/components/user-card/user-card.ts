import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SearchedUsers } from '../../../../core/shared/interfaces/userDTO';
import { SearchUsersService } from '../../../../layouts/header/services/search-users.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink, NgClass],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  users = input<SearchedUsers[] | null | undefined>();
  page=input("search")
  req = inject(SearchUsersService)
  @Output() confirm = new EventEmitter<number>()

  onClick(id: number) {
    this.confirm.emit(id)
  }
}
