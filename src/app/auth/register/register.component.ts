import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavBarComponent } from '../../core/layout/nav-bar/nav-bar.component';
import { TheFooterComponent } from '../../core/layout/the-footer/the-footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { Roles } from '../../core/models/enums/roles.enum';
import { User } from '../../core/models/interfaces/auth.interface';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NavBarComponent,
    TheFooterComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fisrtName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
      role: ['member', [Validators.required]],
    });
  }

  public registerUser() {
    const user = this.registerForm.value;
    if (this.registerForm.valid && user.password === user.repeatPassword) {
      this._authService.existUser(user.email).subscribe({
        next: (users: User[]) => {
          if (users.length == 0) {
            this._authService.register(user).subscribe({
              next: (res) => {
                alert('Login successful!');
                localStorage.setItem('currentUser', JSON.stringify(res));
                if (user.role === Roles.REPRESENTATIVE) {
                  this.router.navigate(['/representative/home']);
                } else {
                  this.router.navigate(['/member/home']);
                }
              },
              error: (err) => {
                console.log(err);
              },
            });
          } else {
            alert('this is email exist!!');
          }
        },
        error: (err) => {
          alert('Error in database');
        },
      });
    } else {
      alert('password diff register password or fields incomplet');
    }
  }
}
