import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MembContributionsComponent } from './memb-contributions/memb-contributions.component';
import { MembStatusComponent } from './memb-status/memb-status.component';
import { MembSettingsComponent } from './memb-settings/memb-settings.component';
import { MembHomeComponent } from './memb-home/memb-home.component';
import { PrimeNgModule } from '../../../prime-ng/prime-ng.module';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    MembHomeComponent,
    MembContributionsComponent,
    MembSettingsComponent,
    MembStatusComponent,
    MembSettingsComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    PrimeNgModule,
    DropdownModule
  ]
})
export class MemberModule { }
