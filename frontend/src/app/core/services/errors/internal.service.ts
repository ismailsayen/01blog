import { inject, Injectable, input, signal } from '@angular/core';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InternalService {
  tokenService = inject(TokenService);
  authService = inject(AuthService);
  router = inject(Router);
  error = signal(false);
  type = signal("");
  title = signal("");
  text = signal("");
  showPopUp(type: string, title: string, text: string) {
    if (type === "banne") {
      this.tokenService.clearToken();
    }
    this.type.set(type)
    this.title.set(title)
    this.text.set(text)
    this.error.set(true)
  }
  reloadPage() {
    this.error.set(false)
  }

  LogOut() {
    this.error.set(false)
    this.authService.currentUser.set(null)
  }
}
