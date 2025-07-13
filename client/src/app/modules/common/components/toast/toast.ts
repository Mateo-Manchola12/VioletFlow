import { Component, OnInit } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Toast as ToastBase } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  template: `<div
    class="relative w-80 mt-3 rounded shadow-md overflow-hidden text-white transition-transform duration-300"
  >
    <div class="flex items-center relative z-20 px-4 py-5 rounded">
      <span
        class="material-symbols-rounded !text-2xl !flex items-center justify-center w-6 h-6  animate-[fade-in-up] animate-duration-250 animate-fill-mode-forwards mr-3 text-white"
      >
        {{
          type === 'toast-error'
            ? 'error'
            : type === 'toast-warning'
              ? 'warning'
              : type === 'toast-info'
                ? 'info'
                : type === 'toast-success'
                  ? 'check_circle'
                  : ''
        }}
      </span>

      <div
        class="animate-[fade-in-up] animate-duration-250 animate-fill-mode-forwards"
      >
        {{ title }} {{ message }}
      </div>
    </div>
    <div
      class="h-96 w-96 absolute rounded-full top-0 right-0 origin-bottom-right z-10 bg-green-500 animate-[ripple] animate-fill-mode-forwards animate-ease-out animate-duration-400"
      [ngClass]="{
        'bg-red-500': type === 'toast-error',
        'bg-yellow-500': type === 'toast-warning',
        'bg-blue-500': type === 'toast-info',
        'bg-green-500': type === 'toast-success',
      }"
    ></div>
  </div> `,
  animations: [],
})
export class Toast extends ToastBase implements OnInit {
  type!: string;
  ngOnInit() {
    this.type = this.toastPackage.toastType;
  }

  override tapToast(): void {
    super.tapToast();
  }
}
