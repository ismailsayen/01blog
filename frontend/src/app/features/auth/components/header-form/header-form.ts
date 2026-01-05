import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header-form',
  imports: [RouterLink],
  templateUrl: './header-form.html',
  styleUrl: './header-form.scss',
})
export class HeaderForm {
  page = input('login')
}
