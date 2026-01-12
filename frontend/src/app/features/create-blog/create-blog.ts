import { Component, inject } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { JobsSelect } from "../auth/components/jobs-select/jobs-select";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidJob } from '../auth/utils/customValidators';
import { ButtonSubmit } from "../auth/components/button-submit/button-submit";
import { BlogService } from './services/blog.service';

@Component({
  selector: 'app-create-blog',
  imports: [MarkdownModule, JobsSelect, ButtonSubmit, ReactiveFormsModule],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss',
})

export class CreateBlog {
  blogService = inject(BlogService)
  createForm = new FormGroup(
    {
      categorie: new FormControl('', {
        validators: [ValidJob],
        updateOn: 'submit',
      }),
      title: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50)
        ]
      }),
      content: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(10000)
        ]
      }),
    }, {
    updateOn: 'submit'
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

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched()
      return
    }
    console.log(this.createForm.value);

    const body = this.createForm.getRawValue();

    this.blogService.create(body).subscribe(
      {
        next: (res) => {
          console.log(res);

        },
        error: (err) => {

          if (err.status === 400 && err.error) {
            Object.keys(err.error).forEach((field: any) => {
              const control = this.createForm.get(field);
              if (control) {
                console.log(err);
                control.setErrors({ backend: err.error[field] });
              }
            });
          }

        }
      }
    )
  }

}
