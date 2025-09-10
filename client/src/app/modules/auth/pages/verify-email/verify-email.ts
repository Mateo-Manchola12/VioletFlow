import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Session } from '../../services/session';
import { Toast } from '../../../common/services/toast';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-email.html',
})
export class VerifyEmailComponent {
  email!: string;
  isResending: boolean = false;

  constructor(
    private session: Session,
    private toast: Toast,
    private authService: Auth,
  ) {
    const userData = session.getUserData();
    if (userData && userData.email) {
      this.email = userData.email;
    } else {
      this.email = 'No email provided';
    }
  }

  resendVerificationEmail() {
    if (this.isResending || this.email === 'No email provided') return;

    this.isResending = true;

    this.authService.verifyEmail().subscribe({
      next: (response) => {
        if (response.success) {
          this.toast.success(
            response.message || 'Enlace de verificación reenviado con éxito',
          );
        } else {
          this.toast.error(response.message);
        }
      },
      error: () => {
        this.toast.error('Error al reenviar el enlace de verificación');
      },
      complete: () => {
        this.isResending = false;
      },
    });
  }

  checkVerificationStatus() {
    this.session.setUser().subscribe({
      next: () => {
        const userData = this.session.getUserData();
        if (userData?.is_email_verified) {
          this.toast.success('¡Email verificado correctamente!');
          window.location.reload();
        } else {
          this.toast.info('El email aún no ha sido verificado');
        }
      },
      error: () => {
        this.toast.error('Error al verificar el estado del email');
      },
    });
  }
}
