import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CurrencyPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-home-member',
  templateUrl: './home-member.component.html',
  imports: [
    CurrencyPipe,
    NgIf
  ],
  styleUrls: ['./home-member.component.css']
})
export class HomeMemberComponent {
  memberName = 'Ana López';
  householdName = 'Sunny Apartments';
  memberContribution = 120.5;
  joinDate = '2023-08-15';
  lastBill = {
    description: 'Electricity - March',
    amount: 40.75
  };

  constructor(private router: Router) {}

  viewContributionHistory() {
    this.router.navigate(['/member/contributions']);
  }

  viewBills() {
    this.router.navigate(['/member/bills']);
  }

  contactRepresentative() {
    this.router.navigate(['/member/contact-rep']);
  }
}
