import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button-submit',
  imports: [],
  templateUrl: './button-submit.html',
  styleUrl: './button-submit.scss',
})
export class ButtonSubmit {
  value = input('login')
}
