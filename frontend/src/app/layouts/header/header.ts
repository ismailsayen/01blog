import { Component, inject } from '@angular/core';
import { TokenService } from '../../core/services/token/token.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { SearchModals } from '../components/search-modals/search-modals';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage,SearchModals],
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
