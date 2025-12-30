import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.isLogged().subscribe({
      next: (res) => {
        this.authService.currentUser.set(res);
        
      },
      error: (err) => {
        this.authService.currentUser.set(null);
      },
    });
  }
}
