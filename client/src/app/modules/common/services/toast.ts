import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Toast as ToastComponent } from '../components/toast/toast';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  constructor(private toastr: ToastrService) {}

  show(message: string, title?: string) {
    this.toastr.show(message, title, {
      toastComponent: ToastComponent,
      toastClass: 'pointer-events-auto cursor-pointer',
      timeOut: 5000,
      tapToDismiss: true,
    });
  }

  success(message: string, title?: string) {
    this.toastr.success(message, title, {
      toastComponent: ToastComponent,
      toastClass: 'pointer-events-auto cursor-pointer',
      timeOut: 5000,
      tapToDismiss: true,
    });
  }
  error(message: string, title?: string) {
    this.toastr.error(message, title, {
      toastComponent: ToastComponent,
      toastClass: 'pointer-events-auto cursor-pointer',
      timeOut: 5000,
      tapToDismiss: true,
    });
  }
  info(message: string, title?: string) {
    this.toastr.info(message, title, {
      toastComponent: ToastComponent,
      toastClass: 'pointer-events-auto cursor-pointer',
      timeOut: 5000,
      tapToDismiss: true,
    });
  }
  warning(message: string, title?: string) {
    this.toastr.warning(message, title, {
      toastComponent: ToastComponent,
      toastClass: 'pointer-events-auto cursor-pointer',
      timeOut: 5000,
      tapToDismiss: true,
    });
  }
}
