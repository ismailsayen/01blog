import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { TokenService } from '../../../../core/services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  authService = inject(AuthService);
  tokenService = inject(TokenService);
  router = inject(Router);

  ngOnInit(): void {
    if (this.authService.currentUser()) {
      this.router.navigateByUrl('/');
    }
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
      return;
    }
    const body = this.loginForm.getRawValue();
    this.authService.loginReq(body).subscribe({
      next: (res) => {
        this.authService.currentUser.set(res);
        this.tokenService.setTokent(res.token);
        this.router.navigateByUrl('/');
      },
      error: (err) => console.log(err),
    });
  }
}
