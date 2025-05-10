import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NavBarComponent} from '../../core/component/nav-bar/nav-bar.component';
import {TheFooterComponent} from '../../core/component/the-footer/the-footer.component';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, NavBarComponent, TheFooterComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  role: string = 'member'; // Valor predeterminado
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Simulación: guardar usuario en localStorage con su rol
    localStorage.setItem('mockUser', JSON.stringify({
      email: this.email,
      password: this.password,
      role: this.role
    }));

    alert('Registration successful!');
    // Redirigir al login después del registro
    this.router.navigate(['/login']);
  }
}
