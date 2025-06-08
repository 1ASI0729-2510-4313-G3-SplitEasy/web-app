import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-member',
  imports: [FormsModule],
  templateUrl: './settings-member.component.html',
  styleUrl: './settings-member.component.css',
})
export class SettingsMemberComponent {
  fullName = 'John Doe';
  email = 'john@example.com';
  notificationsEnabled = true;

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  updatePersonalInfo() {
    alert('Personal information updated!');
    // Aquí iría lógica real para actualizar el backend.
  }

  savePreferences() {
    alert('Preferences saved!');
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }
    alert('Password changed!');
    // Aquí iría lógica real para cambiar contraseña.
  }

  leaveHome() {
    alert('You have left the household.');
    // Aquí podrías limpiar el householdId, actualizar el backend, etc.
    this.router.navigate(['/home']);
  }
}
