import { AbstractControl } from '@angular/forms';
import { itCategories, webDevJobs } from '../core/shared/webDevJobs';

export function lengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control.value) return null;
  if (control.value.length < 8 || control.value.length > 16) {
    return { lengthError: true };
  }
  return null;
}

export function ValidJob(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value == null) {
    return null;
  }

  const existsJob = webDevJobs.some((job) => job.elements.includes(control.value));

  const existsCategorie = itCategories.some((job) => job.elements.includes(control.value));

  return existsJob || existsCategorie ? null : { invalidJob: true };
}
