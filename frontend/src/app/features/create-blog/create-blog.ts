import { Component, inject, signal } from '@angular/core'
import { JobsSelect } from '../auth/components/jobs-select/jobs-select'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonSubmit } from '../auth/components/button-submit/button-submit'
import { BlogService } from './services/blog.service'
import { toSignal } from '@angular/core/rxjs-interop'
import { debounceTime, distinctUntilChanged, single } from 'rxjs'
import { BlogResult } from "./components/blog-result/blog-result"
import { NgClass } from '@angular/common'
import { ValidJob } from '../../utils/customValidators'
import { ValidMedia, VerifySize } from '../../utils/ValidationMedia'

@Component({
  selector: 'app-create-blog',
  imports: [JobsSelect, ButtonSubmit, ReactiveFormsModule, BlogResult, NgClass],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss',
})

export class CreateBlog {
  blogService = inject(BlogService)
  showResult = signal(false)
  files_url: string[] = []

  createForm = new FormGroup({
    categorie: new FormControl('', {
      validators: [ValidJob],
      updateOn: 'submit',
    }),
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(50)],
      updateOn: 'submit',
    }),
    content: new FormControl('', {
      validators: [Validators.required, Validators.minLength(100), Validators.maxLength(10000)],
    }),
    media: new FormControl(null),
  })

  changeVisibility() {
    this.showResult.set(!this.showResult())
  }

  data = toSignal(this.createForm.controls.content.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged()
  ),
    {
      initialValue: ''
    })

  get title() {
    return this.createForm.get('title')
  }

  get content() {
    return this.createForm.get('content')
  }

  get categorie() {
    return this.createForm.get('categorie') as FormControl
  }

  get media() {
    return this.createForm.get('media')
  }

  onUploadMedia(event: Event) {
    const inputElement = event.target as HTMLInputElement
    if (!inputElement.files || inputElement.files.length === 0) return

    const file = inputElement.files[0]
    if (!ValidMedia(file.type)) {
      this.createForm.controls.content.markAllAsTouched()
      this.createForm.controls.content.setErrors({
        invalidMedia: true
      })
      return
    }

    if (!VerifySize(file.type, file.size)) {
      this.createForm.controls.content.markAllAsTouched()
      this.createForm.controls.content.setErrors({
        invalidMedia: true
      })
      return
    }

    for (let i = 0; i < this.files_url.length; i++) {
      if (!this.content?.value?.includes(this.files_url[i])) {
        URL.revokeObjectURL(this.files_url[i])
        this.files_url.splice(i, 1);
      }
    }

    const file_url = URL.createObjectURL(file)
    this.files_url.push(file_url)
    this.content?.setValue(this.content?.value + `\n\n![Drag Racing](${file_url})`)
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched()
      return
    }
    console.log(this.createForm.value)

    const body = this.createForm.getRawValue()

    this.blogService.create(body).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        if (err.status === 400 && err.error) {
          Object.keys(err.error).forEach((field: any) => {
            const control = this.createForm.get(field)
            if (control) {
              console.log(err)
              control.setErrors({ backend: err.error[field] })
            }
          })
        }
      },
    })
  }
}
