import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  animateChild,
  query,
} from '@angular/animations';
import { Auth } from '../../services/auth';
import { Toast } from '../../../common/services/toast';
import { Router, RouterLink } from '@angular/router';
import { Session } from '../../services/session';
import { UserInfoStepComponent } from './components/user-info-step/user-info-step.component';
import { CompanyInfoStepComponent } from './components/company-info-step/company-info-step.component';
import { RegistrationSummaryComponent } from './components/registration-summary/registration-summary.component';
import { SuccessScreenComponent } from './components/success-screen/success-screen.component';
import { ErrorScreenComponent } from './components/error-screen/error-screen.component';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    UserInfoStepComponent,
    CompanyInfoStepComponent,
    RegistrationSummaryComponent,
    SuccessScreenComponent,
    ErrorScreenComponent,
  ],
  templateUrl: './sign-up.html',
  animations: [
    trigger('slideInOut', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [animate('200ms ease-out')]),
      transition('visible => hidden', [animate('150ms ease-in')]),
    ]),
  ],
})
export class SignUp {
  userForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(15),
      Validators.pattern(/^\+?[0-9\s]+$/),
    ]),
    phoneCountryCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?[0-9]+$/),
      Validators.minLength(2),
      Validators.maxLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
      ),
    ]),
  });
  companyForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    site: new FormControl(''),
    size: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  isPasswordVisible: boolean = false;
  showPasswordHints = false;
  step: 1 | 2 | 3 | 4 = 1;
  totalSteps = 3;
  registerSuccess?: boolean;
  errorMessage: string = '';
  loading: boolean = false;

  @ViewChild('passwordInput') passwordInputRef!: ElementRef;
  @ViewChild('passwordHints') passwordHintsRef!: ElementRef;

  animationState: 'hidden' | 'visible' = 'hidden';

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  handleFocus() {
    this.animationState = 'visible';
  }

  handleBlur() {
    this.animationState = 'hidden';
  }

  get userFormFields() {
    return this.userForm.controls;
  }
  get companyFormFields() {
    return this.companyForm.controls;
  }

  goToNextStep() {
    if (this.canGoToNextStep()) {
      if (this.step < 3) this.step++;
    } else {
      this.markCurrentFormAsTouched();
    }
  }

  private markCurrentFormAsTouched(): void {
    switch (this.step) {
      case 1:
        this.userForm.markAllAsTouched();
        break;
      case 2:
        this.companyForm.markAllAsTouched();
        break;
    }
  }

  goToPreviousStep() {
    if (this.step > 1) this.step--;
  }

  canGoToNextStep(): boolean {
    switch (this.step) {
      case 1:
        return this.userForm.valid;
      case 2:
        return this.companyForm.valid;
      case 3:
        return true;
      default:
        return false;
    }
  }

  isStepActive(step: number): boolean {
    return this.step === step;
  }

  isStepCompleted(step: number): boolean {
    return this.step > step;
  }

  isFinalStep(): boolean {
    return this.step === 4;
  }

  getStepCircleClasses(step: number): string {
    const baseClasses =
      'size-7 flex justify-center items-center shrink-0 font-medium rounded-full stepper-step-circle leading-0';
    if (this.isFinalStep() && this.registerSuccess) {
      return `${baseClasses} bg-teal-500 text-white animate-scale-in`;
    } else if (this.isFinalStep() && !this.registerSuccess) {
      return `${baseClasses} bg-red-500 text-white animate-scale-in`;
    } else if (this.isStepCompleted(step)) {
      return `${baseClasses} bg-primary text-white animate-scale-in`;
    } else if (this.isStepActive(step)) {
      return `${baseClasses} bg-primary text-white shadow-md shadow-primary`;
    } else {
      return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStepTextClasses(step: number): string {
    const baseClasses = 'ms-2 text-sm font-medium stepper-step-text';

    if (this.isStepCompleted(step) || this.isStepActive(step)) {
      return `${baseClasses} text-gray-800`;
    } else {
      return `${baseClasses} text-gray-500`;
    }
  }

  getStepConnectorClasses(step: number): string {
    const baseClasses = 'h-px flex-1 stepper-connector';
    if (this.isFinalStep() && this.registerSuccess) {
      return `${baseClasses} bg-teal-500`;
    } else if (this.isFinalStep() && !this.registerSuccess) {
      return `${baseClasses} bg-red-500`;
    } else if (this.isStepCompleted(step)) {
      return `${baseClasses} bg-primary`;
    } else if (this.isStepActive(step)) {
      return `${baseClasses} bg-primary`;
    } else {
      return `${baseClasses} bg-gray-200`;
    }
  }

  getNextButtonText(): string {
    switch (this.step) {
      case 1:
        return 'Continuar a empresa';
      case 2:
        return 'Continuar a registro';
      default:
        return 'Siguiente';
    }
  }

  isNextButtonDisabled(): boolean {
    return !this.canGoToNextStep();
  }

  finishRegistration(): void {
    if (this.userForm.valid && this.companyForm.valid) {
      this.loading = true;

      this.step = 4;

      const signInResult = this.AuthService.signUp(
        this.userForm.value,
        this.companyForm.value,
      );
      signInResult.subscribe({
        next: (res) => {
          this.loading = false;
          this.registerSuccess = res.success;
          if (!res.success) return void (this.errorMessage = res.message);

          this.toast.success(res.message);
          this.session.setUser();
        },
      });
    }
  }
  constructor(
    private AuthService: Auth,
    private toast: Toast,
    private session: Session,
  ) {}
}
