import { AuthService } from './../../../../core/services/auth/auth.service'
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TokenService } from '../../../../core/services/token/token.service'
import { Router, RouterLink } from '@angular/router'
import { NgClass } from '@angular/common'
import { Auth } from '../service/auth'
import { ButtonSubmit } from '../../components/button-submit/button-submit'
import { JobsSelect } from '../../components/jobs-select/jobs-select'
import { HeaderForm } from "../../components/header-form/header-form"
import { lengthValidator, ValidJob } from '../../../../utils/customValidators'
import { SnackbarService } from '../../../../core/shared/components/snackbar/snackbar.service'
import { ValidImage, VerifySize } from '../../../../utils/ValidationMedia'
import { MediaService } from '../../../../core/services/media/media.service'
import { catchError, defaultIfEmpty, from, mergeMap, of, switchMap, tap, throwError } from 'rxjs'

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, ButtonSubmit, JobsSelect, HeaderForm],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit, OnDestroy {
  authService = inject(AuthService)
  tokenService = inject(TokenService)
  auth = inject(Auth)
  router = inject(Router)
  backendError = signal<string | null>(null)
  snackbarService = inject(SnackbarService)
  previewUrl = signal<{ previewUrl: string, file: File } | null>(null)
  mediaService = inject(MediaService)
  ngOnInit(): void {
    this.auth.showPassword.set(false)
  }
  ngOnDestroy(): void {
    this.mediaService.removeFiles()
    this.previewUrl.set(null)
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
      validators: [ValidJob],
      updateOn: 'submit',
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@-_;:.?()<>!$]).+$/),
      lengthValidator,
    ]),
    avatar: new FormControl(null)
  })

  get userName() {
    return this.registerForm.get('userName')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get job() {
    return this.registerForm.get('job') as FormControl
  }

  get avatar() {
    return this.registerForm.get('avatar') as FormControl
  }

  removePerview() {
    URL.revokeObjectURL(this.previewUrl()?.previewUrl ?? "")
    this.previewUrl.set(null)
    this.mediaService.removeFiles()

  }


  onUploadMedia(event: Event) {
    const inputElement = event.target as HTMLInputElement
    if (!inputElement.files || inputElement.files.length === 0) {

      return
    }
    const file = inputElement.files[0]
    if (!ValidImage(file.type)) {
      this.avatar.markAsTouched()
      this.avatar.setErrors({
        invalidMedia: true,
      })
      inputElement.value = ""
      return
    }

    if (!VerifySize(file.type, file.size)) {

      this.avatar.markAsTouched()
      this.avatar.setErrors({
        invalidMedia: true,
      })
      inputElement.value = ""
      return
    }
    this.avatar.setErrors(null)
    this.previewUrl.set({ previewUrl: URL.createObjectURL(file), file })
    this.mediaService.serveMediaLocaly(file)
    inputElement.value = ""
  }


  onSubmit() {

    if (this.registerForm.invalid) {
      this.backendError.set(null)
      this.avatar.setErrors(null)
      return
    }

    from(this.mediaService.mediaItems).pipe(
      mergeMap((item) => {
        let form = new FormData();
        form.append('file', item.file);
        form.append('oldUrl', item.previewUrl);

        return this.mediaService.saveMedia(form).pipe(
          catchError((err) => {
            return throwError(() => err)
          })
        );
      }, 1),
      tap((result) => {
        this.avatar?.setValue(result.newURL)
      }),
      defaultIfEmpty(null),
      switchMap(() => {
        const body = this.registerForm.getRawValue()
        return this.auth.registerReq(body)
      })
    ).subscribe({
      next: (res) => {
        this.authService.currentUser.set(res)
        this.tokenService.setTokent(res.token)
        this.router.navigateByUrl('/')
        this.snackbarService.success("Your account is being created.")
      },
      error: (err) => {
        if (err.status === 409 && err.error) {
          this.backendError.set(err.error)
          return
        }
        if (err.status === 400 && err.error) {
          Object.keys(err.error).forEach((field: any) => {
            const control = this.registerForm.get(field)
            if (control) {
              control.setErrors({ backend: err.error[field] })
            }
          })
        }
      },
    })
  }
}
