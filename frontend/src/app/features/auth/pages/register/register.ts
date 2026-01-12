import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../../../core/services/token/token.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Auth } from '../service/auth';
import { lengthValidator, ValidJob } from '../../utils/customValidators';
import { ButtonSubmit } from '../../components/button-submit/button-submit';
import { JobsSelect } from '../../components/jobs-select/jobs-select';
import { HeaderForm } from "../../components/header-form/header-form";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, ButtonSubmit, JobsSelect, HeaderForm],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  authService = inject(AuthService);
  tokenService = inject(TokenService);
  auth = inject(Auth);
  router = inject(Router);
  backendError = signal<string | null>(null);
  ngOnInit(): void {
    this.auth.showPassword.set(false)
  }

  registerForm = new FormGroup({
    userName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(20)],
      updateOn: 'submit',
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'submit',
    }),
    job: new FormControl('', {
      validators: [ ValidJob],
      updateOn: 'submit',
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@-_;:.?()<>!$]).+$/),
      lengthValidator,
    ]),
  });

  get userName() {
    return this.registerForm.get('userName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get job() {
    return this.registerForm.get('job') as FormControl;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.backendError.set(null);
      return;
    }
    const body = this.registerForm.getRawValue();
    this.auth.registerReq(body).subscribe({
      next: (res) => {
        this.authService.currentUser.set(res);
        this.tokenService.setTokent(res.token);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        if (err.status === 409 && err.error) {
          this.backendError.set(err.error);
          return;
        }
        if (err.status === 400 && err.error) {
          Object.keys(err.error).forEach((field: any) => {
            const control = this.registerForm.get(field);
            if (control) {
              control.setErrors({ backend: err.error[field] });
            }
          });
        }
      },
    });
  }
}
