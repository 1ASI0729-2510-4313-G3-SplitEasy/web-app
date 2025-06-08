import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavBarComponent } from '../../core/component/nav-bar/nav-bar.component';
import { TheFooterComponent } from '../../core/component/the-footer/the-footer.component';
import { AuthService } from '../../shared/service/auth/auth.service';
import { User } from '../../shared/service/models/interfaces/auth.interface';
import { Roles } from '../../shared/service/models/enums/roles.enum';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NavBarComponent,
    TheFooterComponent,
  ],
  templateUrl: './login.component.html',
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
