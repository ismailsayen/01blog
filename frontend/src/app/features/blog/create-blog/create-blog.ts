import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { JobsSelect } from '../../auth/components/jobs-select/jobs-select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonSubmit } from '../../auth/components/button-submit/button-submit';
import { BlogService } from '../services/blog.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  from,
  mergeMap,
  switchMap,
  tap,
  throwError,
  toArray,
} from 'rxjs';
import { BlogResult } from '../blog-result/blog-result';
import { NgClass } from '@angular/common';
import { ValidJob } from '../../../utils/customValidators';
import { ValidImage, ValidVideo, VerifySize } from '../../../utils/ValidationMedia';
import { itCategories } from '../../../core/shared/webDevJobs';
import { MediaService } from '../../../core/services/media/media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service';
import { BlogUpdateOutput } from '../../../core/shared/interfaces/BlogInterface';

@Component({
  selector: 'app-create-blog',
  imports: [JobsSelect, ButtonSubmit, ReactiveFormsModule, BlogResult, NgClass],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss',
})
export class CreateBlog implements OnDestroy, OnInit {

  blogService = inject(BlogService);
  showResult = signal(false);
  mediaService = inject(MediaService);
  router = inject(Router);
  categories = itCategories;
  snackbarService = inject(SnackbarService);
  blogId = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'))
  blogInfo = signal<BlogUpdateOutput | null>(null)
  path = location.pathname
  ngOnInit(): void {
    if (isNaN(this.blogId)) {
      this.router.navigateByUrl('/')
      return
    }
    if (this.blogId) {
      this.blogService.getBLogById(this.blogId).subscribe({
        next: ((res) => {
          this.blogInfo.set(res)
          this.createForm.patchValue({
            categorie: res.categorie,
            title: res.title,
            content: res.content,
          });

        }),
        error: ((err) => {
          console.log("err:", err);

        })
      })
    }
  }


  createForm = new FormGroup({
    categorie: new FormControl("", {
      validators: [ValidJob],
      updateOn: 'submit',
    }),
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)],
      updateOn: 'submit',
    }),
    content: new FormControl('', {
      validators: [Validators.required, Validators.minLength(100), Validators.maxLength(10000)],
    }),
    media: new FormControl(null),
  });
  ngOnDestroy(): void {
    this.mediaService.removeFiles()
  }

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
      return;
    }

    const file = inputElement.files[0];
    if ((!ValidImage(file.type) && file.type.startsWith("image/")) || (!ValidVideo(file.type) && file.type.startsWith("video/"))) {
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
      return;
    }
    const fileToMarkdow = file.type.startsWith("video/") ? this.mediaService.generateVideoHtml(file_url) : `\n![media](${file_url})`
    this.content?.setValue(this.content?.value + fileToMarkdow);
    inputElement.value = '';
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.mediaService.checkTextContainMedia(this.content?.value);
    this.snackbarService.info('Your blog is being saved...');
    from(this.mediaService.mediaItems)
      .pipe(
        mergeMap((item, i) => {
          let form = new FormData();
          form.append('file', item.file);
          form.append('oldUrl', item.previewUrl);

          return this.mediaService.saveMedia(form).pipe(
            catchError((err) => {
              return throwError(() => err)
            })
          );
        }, 3),
        toArray(),
        tap((results) => {
          let value = this.content?.value ?? '';

          results.forEach((res) => {
            value = value.replaceAll(res.OldUrl, res.newURL);
          });

          this.content?.setValue(value);
        }),
        switchMap(() => {
          const body = this.createForm.getRawValue();
          return this.blogService.create(body, location.pathname,this.blogInfo()?.id);
        })
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
          this.snackbarService.success('Your blog was created successfully.');
        },
        error: (err) => {
          console.log(err);

          if (err.status === 400 && err.error) {
            Object.keys(err.error).forEach((field: any) => {
              const control = this.createForm.get(field);
              if (control) {
                control.setErrors({ backend: err.error[field] });
              }
            });
          }
          this.snackbarService.error('Failed to create your blog.');
        },
      });
  }

}
