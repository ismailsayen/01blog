import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule, } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs'

@Component({
  selector: 'app-search-modals',
  templateUrl: './search-modals.html',
  styleUrl: './search-modals.scss',
  imports: [ReactiveFormsModule],
})
export class SearchModals implements OnInit {
  userInput = new FormControl('')
  ngOnInit(): void {
    this.userInput.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value?.trim()) {
          return of([]);
        }
        return of();
        // return this.searchService.search(value);
      })
    ).subscribe(value => {
      // console.log('local test:', value?.trim());
    });
  }
}
