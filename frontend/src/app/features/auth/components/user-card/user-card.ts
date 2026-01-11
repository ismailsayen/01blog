import { Component, input } from '@angular/core';
import { SearchedUsers } from '../../../../core/shared/interfaces/SearchedUsers';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  users = input<SearchedUsers[] | null | undefined>();
}
