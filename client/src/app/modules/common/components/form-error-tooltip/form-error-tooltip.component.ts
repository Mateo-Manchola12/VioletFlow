import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { formErrorAnimations } from '../../animations/form-animations';

@Component({
  selector: 'app-form-error-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="control && control.invalid && control.touched"
      class="absolute top-full left-0 z-10 mt-1 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-red-600 text-sm shadow-lg"
      [@expandCollapse]
    >
      <div class="absolute -top-1 left-4 w-2 h-2 bg-red-50 border-l border-t border-red-200 transform rotate-45"></div>

      <!-- Error por campo requerido -->
      <span
        *ngIf="control.errors?.['required']"
        class="block"
        [@showError]="control.errors?.['required'] ? 'visible' : 'hidden'"
      >
        {{ requiredMessage || getDefaultRequiredMessage() }}
      </span>

      <!-- Error de email inválido -->
      <span
        *ngIf="control.errors?.['email']"
        class="block"
        [@showError]="control.errors?.['email'] ? 'visible' : 'hidden'"
      >
        {{ emailMessage || 'El correo electrónico no es válido.' }}
      </span>

      <!-- Error de longitud mínima -->
      <span
        *ngIf="control.errors?.['minlength']"
        class="block"
        [@showError]="control.errors?.['minlength'] ? 'visible' : 'hidden'"
      >
        {{ minLengthMessage || getDefaultMinLengthMessage() }}
      </span>

      <!-- Error de longitud máxima -->
      <span
        *ngIf="control.errors?.['maxlength']"
        class="block"
        [@showError]="control.errors?.['maxlength'] ? 'visible' : 'hidden'"
      >
        {{ maxLengthMessage || getDefaultMaxLengthMessage() }}
      </span>

      <!-- Error de patrón -->
      <span
        *ngIf="control.errors?.['pattern']"
        class="block"
        [@showError]="control.errors?.['pattern'] ? 'visible' : 'hidden'"
      >
        {{ patternMessage || 'El formato no es válido.' }}
      </span>

      <!-- Errores personalizados adicionales -->
      <ng-container *ngFor="let error of customErrors">
        <span
          *ngIf="control.errors?.[error.key]"
          class="block"
          [@showError]="control.errors?.[error.key] ? 'visible' : 'hidden'"
        >
          {{ error.message }}
        </span>
      </ng-container>
    </div>
  `,
  animations: formErrorAnimations
})
export class FormErrorTooltipComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = '';
  @Input() requiredMessage: string = '';
  @Input() emailMessage: string = '';
  @Input() minLengthMessage: string = '';
  @Input() maxLengthMessage: string = '';
  @Input() patternMessage: string = '';
  @Input() customErrors: Array<{key: string, message: string}> = [];
  @Input() multipleErrors: boolean = false;

  getDefaultRequiredMessage(): string {
    const fieldNames: {[key: string]: string} = {
      'first_name': 'El nombre es obligatorio.',
      'last_name': 'El apellido es obligatorio.',
      'email': 'El correo electrónico es obligatorio.',
      'phone': 'El número de teléfono es obligatorio.',
      'phoneCountryCode': 'El código de país es obligatorio.',
      'password': 'La contraseña es obligatoria.',
      'name': 'El nombre de la empresa es obligatorio.',
      'size': 'El tamaño de la empresa es obligatorio.',
      'country': 'El país es obligatorio.',
      'city': 'La ciudad es obligatoria.'
    };

    return fieldNames[this.fieldName] || `Este campo es obligatorio.`;
  }

  getDefaultMinLengthMessage(): string {
    const minLength = this.control?.errors?.['minlength']?.requiredLength || 0;

    if (this.fieldName === 'phone') {
      return 'El número de teléfono debe tener al menos 9 dígitos.';
    }
    if (this.fieldName === 'phoneCountryCode') {
      return 'El código de país debe tener al menos 2 dígitos.';
    }

    return `Este campo debe tener al menos ${minLength} caracteres.`;
  }

  getDefaultMaxLengthMessage(): string {
    const maxLength = this.control?.errors?.['maxlength']?.requiredLength || 0;

    if (this.fieldName === 'phone') {
      return 'El número de teléfono no puede tener más de 15 dígitos.';
    }
    if (this.fieldName === 'phoneCountryCode') {
      return 'El código de país no puede tener más de 5 dígitos.';
    }

    return `Este campo no puede tener más de ${maxLength} caracteres.`;
  }
}
