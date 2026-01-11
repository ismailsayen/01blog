import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InternalService } from './core/services/errors/internal.service';
import { Errors } from "./core/shared/components/errors/errors";
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Errors],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  err = inject(InternalService);
}
