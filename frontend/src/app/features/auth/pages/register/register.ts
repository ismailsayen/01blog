import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../../../core/services/token/token.service';
import { Router } from '@angular/router';
import { JsonPipe, NgClass } from '@angular/common';
import { ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  authService = inject(AuthService);
  tokenService = inject(TokenService);
  router = inject(Router);

  registerForm = new FormGroup(
    {
      userName: new FormControl(
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ],
          updateOn: 'submit'
        },

      ),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit'
      }),
      password: new FormControl('', [
        Validators.required,
        this.lengthValidator
      ]),
    },

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
  lengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) return null;
    if (control.value.length < 8 || control.value.length > 16) {
      return { lengthError: true }
    }
    return null;
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
      error: (err) => {
        this.authService.currentUser.set(null);
        console.log(err)
      },
    });
  }
}
