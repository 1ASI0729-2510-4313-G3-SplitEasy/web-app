import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';
import {NavBarComponent} from '../../core/component/nav-bar/nav-bar.component';
import {TheFooterComponent} from '../../core/component/the-footer/the-footer.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NavBarComponent, TheFooterComponent],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    const storedUser = localStorage.getItem('mockUser');
    if (!storedUser) {
      this.errorMessage = 'No user registered.';
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.email === this.email) {
      this.message = 'Reset link sent! Redirecting...';
      setTimeout(() => this.router.navigate(['/reset-password']), 1500);
    } else {
      this.errorMessage = 'Email not found';
    }
  }
}
