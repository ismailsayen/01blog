import { Component, inject } from '@angular/core';
import { TokenService } from '../../../../core/services/token/token.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  tokenService = inject(TokenService);
  authService = inject(AuthService);
  router = inject(Router);
  onclick() {
    this.tokenService.clearToken();
    this.authService.currentUser.set(null)
    this.router.navigateByUrl('/auth/login');
  }
}
