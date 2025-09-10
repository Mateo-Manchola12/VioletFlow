import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormErrorTooltipComponent } from '../../../../../common/components/form-error-tooltip/form-error-tooltip.component';

@Component({
  selector: 'app-company-info-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorTooltipComponent],
  templateUrl: './company-info-step.component.html',
})
export class CompanyInfoStepComponent {
  @Input() companyForm!: FormGroup;

  get companyFormFields() {
    return this.companyForm.controls;
  }
}
