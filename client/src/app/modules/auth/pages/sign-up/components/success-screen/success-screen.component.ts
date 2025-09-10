import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success-screen',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './success-screen.component.html',
})
export class SuccessScreenComponent {
  @Input() userForm!: FormGroup;
}
