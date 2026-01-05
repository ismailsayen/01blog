import { Component, inject, signal } from '@angular/core';
import { InternalService } from '../../../services/errors/internal.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-errors',
  imports: [NgClass],
  templateUrl: './errors.html',
  styleUrl: './errors.scss',
})
export class Errors {
  err = inject(InternalService);
}
