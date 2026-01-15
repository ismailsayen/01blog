import { Component, effect, inject } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-snackbar',
  imports: [NgClass],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
})
export class Snackbar {
  snackbarService = inject(SnackbarService);
  state = this.snackbarService.state;
  constructor() {
    effect(() => {
      const value = this.state();
      if (value) {
        setTimeout(() => {
          console.log(1);

          this.snackbarService.clear();
        }, value.duration);
      }
    });
  }
}
