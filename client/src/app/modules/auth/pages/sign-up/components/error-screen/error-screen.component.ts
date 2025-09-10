import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
})
export class ErrorScreenComponent {
  @Input() errorMessage?: string;
}
