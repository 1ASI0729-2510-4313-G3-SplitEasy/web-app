import { Component } from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-status-member',
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf
  ],
  templateUrl: './status-member.component.html',
  styleUrl: './status-member.component.css'
})
export class StatusMemberComponent {
  totalContributed = 300.00;
  monthlyGoal = 500.00;
  compliance = 300.00;
  contributorCount = 3;

  memberStatusList = [
    {
      name: 'Alice Johnson',
      amountContributed: 100.00,
      assignedAmount: 150.00,
      deadline: new Date('2025-06-15'),
      status: 'On Track'
    },
    {
      name: 'Bob Smith',
      amountContributed: 100.00,
      assignedAmount: 150.00,
      deadline: new Date('2025-06-15'),
      status: 'On Track'
    },
    {
      name: 'You',
      amountContributed: 100.00,
      assignedAmount: 200.00,
      deadline: new Date('2025-06-15'),
      status: 'Pending'
    }
  ];

  constructor(private router: Router) {}

  addContribution() {
    this.router.navigate(['/member/contributions/new']);
  }
}
