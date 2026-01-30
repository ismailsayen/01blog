import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchModals } from '../search-modals/search-modals';
import { TokenService } from '../../../core/services/token/token.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [SearchModals,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  tokenService = inject(TokenService);
  authService = inject(AuthService);
  router = inject(Router);

  onclick() {
    this.tokenService.clearToken();
    this.authService.currentUser.set(null);
    this.router.navigateByUrl('/auth/login');
  }
}
