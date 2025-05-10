import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';
import {NavBarComponent} from '../../core/component/nav-bar/nav-bar.component';
import {TheFooterComponent} from '../../core/component/the-footer/the-footer.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, NgIf, NavBarComponent, TheFooterComponent],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.password = this.newPassword;
      localStorage.setItem('mockUser', JSON.stringify(user));
      this.successMessage = 'Password successfully updated!';
      setTimeout(() => this.router.navigate(['/login']), 1500);
    } else {
      this.errorMessage = 'No user found';
    }
  }
}
