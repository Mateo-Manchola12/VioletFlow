import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Toast } from '../../../common/services/toast';
import { Session } from '../../services/session';
import { FormErrorTooltipComponent } from '../../../common/components/form-error-tooltip/form-error-tooltip.component';

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    FormErrorTooltipComponent,
  ],
  templateUrl: './sign-in.html',
})
export class SignIn {
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  isPasswordVisible: boolean = false;

  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      const signInResult = this.AuthService.signIn(email, password);
      signInResult.subscribe({
        next: (res) => {
          if (!res.success) return void this.toast.error(res.message);

          this.toast.success(res.message);
          this.session.setUser().subscribe({
            next: () => this.router.navigate(['/', 'dashboard']),
          });
        },
      });
    }
  }

  constructor(
    private AuthService: Auth,
    private toast: Toast,
    private router: Router,
    private session: Session,
  ) {}
}
