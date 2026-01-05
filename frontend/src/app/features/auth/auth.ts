import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from "../../core/shared/components/loader/loader";

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
}
