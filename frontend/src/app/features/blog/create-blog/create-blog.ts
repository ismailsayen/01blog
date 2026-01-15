import { Component, inject, signal } from '@angular/core';
import { JobsSelect } from '../../auth/components/jobs-select/jobs-select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonSubmit } from '../../auth/components/button-submit/button-submit';
import { BlogService } from '../services/blog.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, from, interval, map, mergeMap, of, single, switchMap, tap, toArray } from 'rxjs';
import { BlogResult } from '../blog-result/blog-result';
import { NgClass } from '@angular/common';
import { ValidJob } from '../../../utils/customValidators';
import { ValidMedia, VerifySize } from '../../../utils/ValidationMedia';
import { itCategories } from '../../../core/shared/webDevJobs';
import { MediaService } from '../../../core/services/media/media.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  imports: [JobsSelect, ButtonSubmit, ReactiveFormsModule, BlogResult, NgClass],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss',
})
export class CreateBlog {
  blogService = inject(BlogService);
  showResult = signal(false);
  mediaService = inject(MediaService);
  router = inject(Router)
  categories = itCategories;

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
  });

  changeVisibility() {
    this.showResult.set(!this.showResult());
  }

  data = toSignal(
    this.createForm.controls.content.valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
    {
      initialValue: '',
    }
  );

  get title() {
    return this.createForm.get('title');
  }

  get content() {
    return this.createForm.get('content');
  }

  get categorie() {
    return this.createForm.get('categorie') as FormControl;
  }

  get media() {
    return this.createForm.get('media');
  }

  onUploadMedia(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files || inputElement.files.length === 0) {
      return
    };

    const file = inputElement.files[0];
    if (!ValidMedia(file.type)) {
      this.createForm.controls.content.markAllAsTouched();
      this.createForm.controls.content.setErrors({
        invalidMedia: true,
      });
      return;
    }

    if (!VerifySize(file.type, file.size)) {
      this.createForm.controls.content.markAllAsTouched();
      this.createForm.controls.content.setErrors({
        invalidMedia: true,
      });
      return;
    }

    this.mediaService.checkTextContainMedia(this.content?.value);

    const file_url = this.mediaService.serveMediaLocaly(file);

    if (!file_url) {
      this.createForm.controls.content.markAllAsTouched();
      this.createForm.controls.content.setErrors({
        maxMedia: true,
      });
      return
    }
    inputElement.value = ""
    this.content?.setValue(this.content?.value + `\n\n![media](${file_url})\n`);
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.mediaService.checkTextContainMedia(this.content?.value)

    from(this.mediaService.mediaItems).pipe(
      mergeMap(
        (item, i) => {
          let form = new FormData()
          form.append("file", item.file)
          form.append("oldUrl", item.previewUrl)

          return this.mediaService.saveMedia(form).pipe(
            catchError(err => {
              throw of({ err: true, i, error: err });
            })
          )
        }, 3),
      toArray(),
      tap(results => {
        let value = this.content?.value ?? '';

        results.forEach(res => {
          value = value.replaceAll(res.OldUrl, res.newURL);
        });

        this.content?.setValue(value);
      }),
      switchMap(() => {
        const body = this.createForm.getRawValue();
        return this.blogService.create(body);
      })
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('/')
      },
      error: (err) => {

        if (err.status === 400 && err.error) {
          Object.keys(err.error).forEach((field: any) => {
            const control = this.createForm.get(field);
            if (control) {
              control.setErrors({ backend: err.error[field] });
            }
          });
        }
      },
    });
  }
}
