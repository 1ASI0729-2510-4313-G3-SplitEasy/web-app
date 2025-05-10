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

  constructor(private router: Router) {}

  onSubmit() {
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === this.email && user.password === this.password) {
        alert('Login successful!');
        // Redirigir a la página correcta según el rol del usuario
        if (user.role === 'representative') {
          this.router.navigate(['/representative/home']); // Página para el representante
        } else {
          this.router.navigate(['/home']); // Página para el miembro
        }
        return;
      }
    }
    this.errorMessage = 'Invalid credentials';
  }
}
