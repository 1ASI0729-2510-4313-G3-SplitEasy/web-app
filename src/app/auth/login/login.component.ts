import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NavBarComponent} from '../../core/component/nav-bar/nav-bar.component';
import {TheFooterComponent} from '../../core/component/the-footer/the-footer.component';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    NavBarComponent,
    TheFooterComponent
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {
    this.initializeMockUsers();
  }

  initializeMockUsers() {
    const existing = localStorage.getItem('mockUsers');
    if (!existing) {
      const users = [
        {
          email: 'member@example.com',
          password: 'member123',
          role: 'member'
        },
        {
          email: 'representative@example.com',
          password: 'rep123',
          role: 'representative'
        }
      ];
      localStorage.setItem('mockUsers', JSON.stringify(users));
    }
  }

  onSubmit() {
    const storedUsers = localStorage.getItem('mockUsers');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const user = users.find(
        (u: any) => u.email === this.email && u.password === this.password
      );
      if (user) {
        alert('Login successful!');
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (user.role === 'representative') {
          this.router.navigate(['/representative/home']);
        } else {
          this.router.navigate(['/member/home']);
        }
        return;
      }
    }
    this.errorMessage = 'Invalid credentials';
  }
}

