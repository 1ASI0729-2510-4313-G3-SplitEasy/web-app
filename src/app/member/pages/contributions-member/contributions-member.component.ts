import { Component } from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contributions-member',
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf
  ],
  templateUrl: './contributions-member.component.html',
  styleUrl: './contributions-member.component.css'
})
export class ContributionsMemberComponent {
  totalContributed = 150.00;
  assignedGoal = 200.00;
  deadline = new Date('2025-06-15');
  status = 'In Progress';

  contributionHistory = [
    { date: new Date('2025-05-01'), amount: 50.00, comment: 'Monthly payment', status: 'Approved' },
    { date: new Date('2025-04-01'), amount: 100.00, comment: 'Initial contribution', status: 'Approved' }
  ];

  constructor(private router: Router) {}

  addContribution() {
    this.router.navigate(['/member/contributions/new']);
  }
}
