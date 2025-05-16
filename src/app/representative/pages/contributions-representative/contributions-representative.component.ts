import { Component } from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-contributions-representative',
  imports: [
    NgClass,
    NgForOf,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './contributions-representative.component.html',
  styleUrl: './contributions-representative.component.css'
})
export class ContributionsRepresentativeComponent {
  summary = {
    totalContributed: 300,
    monthlyGoal: 300,
    compliancePercent: 100,
    contributors: 3,
    totalMembers: 3
  };

  contributions = [
    {
      memberName: 'Ana Lopez',
      contributed: 100,
      assigned: 100,
      deadline: new Date('2025-05-31'),
      status: 'Paid'
    },
    {
      memberName: 'Carlos Ruiz',
      contributed: 100,
      assigned: 100,
      deadline: new Date('2025-05-31'),
      status: 'Paid'
    },
    {
      memberName: 'Luis Perez',
      contributed: 100,
      assigned: 100,
      deadline: new Date('2025-05-31'),
      status: 'Paid'
    }
  ];

}
