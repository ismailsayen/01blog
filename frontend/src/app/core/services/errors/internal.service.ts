import { Injectable, input, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InternalService {
  error = signal(false);
  type = signal("");
  title = signal("");
  text = signal("");
  showPopUp(type: string, title: string, text: string) {
    this.type.set(type)
    this.title.set(title)
    this.text.set(text)
    this.error.set(true)
  }
  reloadPage() {
    location.reload()
  }
}
