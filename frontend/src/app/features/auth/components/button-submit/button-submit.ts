import { Component, inject, input } from '@angular/core';
import { MethodPostLoaderService } from '../../../../core/services/loaders/method-post-loader.service';
import { Loader } from "../../../../core/shared/components/loader/loader";

@Component({
  selector: 'app-button-submit',
  imports: [Loader],
  templateUrl: './button-submit.html',
  styleUrl: './button-submit.scss',
})
export class ButtonSubmit {
  value = input('login')
  loader = inject(MethodPostLoaderService);

}
