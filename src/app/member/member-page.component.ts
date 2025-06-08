import { Component } from '@angular/core';
import { SideBarMemberComponent } from './pages/side-bar/side-bar.component';

@Component({
  selector: 'app-member-page',
  imports: [SideBarMemberComponent],
  templateUrl: './member-page.component.html',
})
export class MemberPageComponent {}
