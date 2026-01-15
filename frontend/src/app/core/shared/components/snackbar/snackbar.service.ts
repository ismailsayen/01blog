import { Injectable, signal } from '@angular/core';

type SnackbarType = 'info' | 'success' | 'error';

interface SnackbarState {
  message: string;
  type: SnackbarType;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  state = signal<SnackbarState | null>(null);
  show(message: string, type: SnackbarType = 'info', duration = 3000) {
    this.state.set({ message, type, duration });
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  clear() {
    this.state.set(null);
  }
}
