import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-summary.component.html',
})
export class RegistrationSummaryComponent {
  @Input() userForm!: FormGroup;
  @Input() companyForm!: FormGroup;
}
