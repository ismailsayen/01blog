import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { TokenService } from '../../../../core/services/token/token.service';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../service/auth';
import { ButtonSubmit } from '../../components/button-submit/button-submit';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ButtonSubmit, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  authService = inject(AuthService);
  tokenService = inject(TokenService);
  router = inject(Router);
  auth = inject(Auth)
  backendError = signal<string | null>(null)

  ngOnInit(): void {
    this.auth.showPassword.set(false)
  }

  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
    },
    {
      updateOn: 'submit',
    }
  );
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.backendError.set(null);
      return;
    }
    const body = this.loginForm.getRawValue();
    this.auth.loginReq(body).subscribe({
      next: (res) => {
        this.authService.currentUser.set(res);
        this.tokenService.setTokent(res.token);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.authService.currentUser.set(null);
        if (err.status === 400 && err.error) {
          this.backendError.set(err.error["detail"]);
        }
      },
    });
  }
}
