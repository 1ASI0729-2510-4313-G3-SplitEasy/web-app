import { Component } from '@angular/core';
import { UserSettingsComponent } from '../../core/components/user-settings/user-settings.component';
import { HouseSettingsComponent } from '../../core/components/house-settings/house-settings.component';
import { PeriodSettingsComponent } from '../../core/components/period-settings/period-settings.component';
import { PreferencesSettingsComponent } from '../../core/components/preferences-settings/preferences-settings.component';

@Component({
  selector: 'app-repre-settings',
  imports: [
    UserSettingsComponent,
    HouseSettingsComponent,
    PeriodSettingsComponent,
    PreferencesSettingsComponent,
  ],
  templateUrl: './repre-settings.component.html',
  styleUrl: './repre-settings.component.css',
})
export class RepreSettingsComponent {}
