import { Component } from '@angular/core';
import { NavBarComponent } from '../../core/layout/nav-bar/nav-bar.component';
import { TheFooterComponent } from '../../core/layout/the-footer/the-footer.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../core/models/interfaces/auth.interface';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NavBarComponent,
    TheFooterComponent,
    NgIf,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  public forgotPasswordForm!: FormGroup;
  public errorMessage!: string;
  public message!: string;
  public userID!: string;

  constructor(private fb: FormBuilder, private _authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public validationEmail() {
    const formValue = this.forgotPasswordForm.value;
    if (this.forgotPasswordForm.valid) {
      this._authService.existUser(formValue.email).subscribe({
        next: (res: User[]) => {
          if (res.length > 0) {
            this.message = 'send change password to email';
            this.errorMessage = '';
            this.userID = res[0].id;
          } else {
            this.message = '';
            this.userID = '';
            this.errorMessage = 'email not register';
          }
        },
        error: (err) => {
          this.message = '';
          this.userID = '';
          this.errorMessage = 'error in database';
          console.log(err);
        },
      });
    }
  }
}
