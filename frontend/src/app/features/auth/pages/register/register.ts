import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../../../core/services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  authService = inject(AuthService);
  tokenService = inject(TokenService);
  router = inject(Router);
  ngOnInit(): void {
    if (this.authService.currentUser()) {
      this.router.navigateByUrl('/');
    }
  }
  registerForm = new FormGroup(
    {
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    {
      updateOn: 'submit',
    }
  );

  get userName() {
    return this.registerForm.get('userName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const body = this.registerForm.getRawValue();
    this.authService.registerReq(body).subscribe({
      next: (res) => {
        this.authService.currentUser.set(res);
        this.tokenService.setTokent(res.token);
        this.router.navigateByUrl('/');
      },
      error: (err) => console.log(err),
    });
  }
}
