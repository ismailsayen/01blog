import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';
import { TokenService } from '../../core/services/token/token.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  tokenService = inject(TokenService);
  authService = inject(AuthService);
  router = inject(Router);

  sidebarOpen = signal<boolean>(false);

toggleSidebar() {
  this.sidebarOpen.set(!this.sidebarOpen()) ;
}

  onclick() {
    this.tokenService.clearToken();
    this.authService.currentUser.set(null);
    this.router.navigateByUrl('/auth/login');
  }
}
