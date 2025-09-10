import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormErrorTooltipComponent } from '../../../../../common/components/form-error-tooltip/form-error-tooltip.component';

@Component({
  selector: 'app-user-info-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorTooltipComponent],
  templateUrl: './user-info-step.component.html',
  animations: [
    trigger('slideInOut', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [animate('200ms ease-out')]),
      transition('visible => hidden', [animate('150ms ease-in')]),
    ]),
  ],
})
export class UserInfoStepComponent {
  @Input() userForm!: FormGroup;
  @Input() isPasswordVisible: boolean = false;
  @Input() animationState: 'hidden' | 'visible' = 'hidden';

  @Output() passwordVisibilityToggle = new EventEmitter<void>();
  @Output() passwordFocus = new EventEmitter<void>();
  @Output() passwordBlur = new EventEmitter<void>();

  @ViewChild('passwordInput') passwordInputRef!: ElementRef;
  @ViewChild('passwordHints') passwordHintsRef!: ElementRef;

  get userFormFields() {
    return this.userForm.controls;
  }

  togglePasswordVisibility() {
    this.passwordVisibilityToggle.emit();
  }

  handleFocus() {
    this.passwordFocus.emit();
  }

  handleBlur() {
    this.passwordBlur.emit();
  }
}
