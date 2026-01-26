import { ElementRef, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObserverService {
  observer: IntersectionObserver | undefined

  createAndObserve(element: ElementRef, callBack: () => void) {
    this.observer?.disconnect();
    const options = {
      root: null,
      threshold: 0.1
    };
    this.observer = new IntersectionObserver((entries) => {
      
      const entry = entries[0];

      if (entry.isIntersecting) {
        callBack()
      }


    }, options)
    this.observer.observe(element.nativeElement)
  }
}
