import { Component, inject, OnInit, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators, } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs'
import { UserCard } from '../../../features/auth/components/user-card/user-card';
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service';
import { SearchedUsers } from '../../../core/shared/interfaces/userDTO';
import { SearchUsersService } from '../header/services/search-users.service';

@Component({
  selector: 'app-search-modals',
  templateUrl: './search-modals.html',
  styleUrl: './search-modals.scss',
  imports: [ReactiveFormsModule, UserCard],
})
export class SearchModals implements OnInit {
  searchService = inject(SearchUsersService)
  snackBar = inject(SnackbarService)

  users = signal<SearchedUsers[] | null | undefined>(undefined);
  loader = signal(false)


  userInput = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]
    ,
  )

  ngOnInit(): void {
    this.userInput.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value?.trim()) {
          return of(null);
        }
        if (this.userInput.invalid) {
          this.userInput.markAsTouched()
          return of(this.users());
        }
        this.loader.set(true)
        return this.searchService.search(value);
      })
    ).subscribe({
      next: (res) => {
        if (res?.length === 0) {
          this.loader.set(false)
          this.users.set(null)
          return
        }
        this.users.set(res)
        this.loader.set(false)

      }
    });
  }

  sendFollowReq(id: number) {
    this.searchService.sendRequestFollow(id).subscribe({
      next: (res => {
        this.users.update(users =>
          users?.map(user =>
            user.id === res.userId ? { ...user, followed: res.status } : user
          )
        )
        this.snackBar.success(res.action)
      }
      ),
      error: (err => {
        console.log(err);

      })
    })

  }
}
