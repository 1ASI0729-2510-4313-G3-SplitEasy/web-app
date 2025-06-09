import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavBarComponent } from '../../core/layout/nav-bar/nav-bar.component';
import { TheFooterComponent } from '../../core/layout/the-footer/the-footer.component';
import { Roles } from '../../core/models/enums/roles.enum';
import { User } from '../../core/models/interfaces/auth.interface';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NavBarComponent,
    TheFooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formLogin = this.loginForm.value;
      this._authService.login(formLogin.email, formLogin.password).subscribe({
        next: (users: User[]) => {
          const user = users[0];
          if (user) {
            alert('Login successful!');
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (user.role === Roles.REPRESENTATIVE) {
              this.router.navigate(['/representative/home']);
            } else {
              this.router.navigate(['/member/home']);
            }
            return;
          } else {
            alert('User not register');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
