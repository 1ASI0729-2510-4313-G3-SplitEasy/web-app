import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavBarComponent } from '../../core/layout/nav-bar/nav-bar.component';
import { TheFooterComponent } from '../../core/layout/the-footer/the-footer.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, NavBarComponent, TheFooterComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  public resetPasswordForm!: FormGroup;
  public userId!: string;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });
    const queryParams = this.route.snapshot.queryParamMap;
    this.userId = queryParams.get('user') as string;
    if (!this.userId) {
      this.router.navigate(['/forgot-password']);
    }
  }
  public changePassword() {
    const formValue = this.resetPasswordForm.value;
    if (
      this.resetPasswordForm.valid &&
      formValue.password == formValue.repeatPassword
    ) {
      this._authService
        .changePassword(this.userId, formValue.password)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      alert('New password is diff to Confirm Password');
    }
  }
}
