import { Component } from '@angular/core';
import { SideBarMemberComponent } from '../core/layout/side-bar/side-bar.component';

@Component({
  selector: 'app-member',
  imports: [SideBarMemberComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css',
})
export class MemberComponent {}
