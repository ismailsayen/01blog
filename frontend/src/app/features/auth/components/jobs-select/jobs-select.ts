import { Component, input, Input } from '@angular/core';
import { webDevJobs } from '../../../../core/shared/webDevJobs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobs-select',
  imports: [ReactiveFormsModule],
  templateUrl: './jobs-select.html',
  styleUrl: './jobs-select.scss',
})
export class JobsSelect {
  
  jobs = webDevJobs;
  control = input.required<FormControl>();
  label=input('Job')
}
