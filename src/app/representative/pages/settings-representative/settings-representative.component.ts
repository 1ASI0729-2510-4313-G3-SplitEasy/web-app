import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-settings-representative',
  imports: [
    FormsModule
  ],
  templateUrl: './settings-representative.component.html',
  styleUrl: './settings-representative.component.css'
})
export class SettingsRepresentativeComponent {
  settings = {
    houseName: 'Casa Lima',
    description: 'Our shared home in Lima',
    currency: 'PEN',
    language: 'en',
    monthlyGoal: 300,
    dueDate: new Date(),
    notifyNewExpense: true,
    notifyLatePayments: true
  };

  onSaveSettings() {
    console.log('Settings saved:', this.settings);
  }

  onDeleteHouse() {
    // logic for deleting
  }

}
