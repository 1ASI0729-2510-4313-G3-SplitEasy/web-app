import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-members-representative',
  standalone: true,
  imports: [NgForOf, NgIf, CurrencyPipe, DatePipe],
  templateUrl: './members-representative.component.html',
  styleUrls: ['./members-representative.component.css']
})
export class MembersRepresentativeComponent {
  members = [
    {
      name: 'Ana López',
      email: 'ana@example.com',
      role: 'Member',
      totalContribution: 120.5,
      state: 'Active',
      history: [
        { title: 'January Contribution', amount: 40.5, date: new Date('2024-01-15') },
        { title: 'February Contribution', amount: 40.0, date: new Date('2024-02-15') },
        { title: 'March Contribution', amount: 40.0, date: new Date('2024-03-15') }
      ]
    },
    {
      name: 'Carlos Ruiz',
      email: 'carlos@example.com',
      role: 'Member',
      totalContribution: 89.99,
      state: 'Pending',
      history: [
        { title: 'February Contribution', amount: 50.0, date: new Date('2024-02-10') },
        { title: 'March Contribution', amount: 39.99, date: new Date('2024-03-20') }
      ]
    },
    {
      name: 'Jean Ruiz',
      email: 'jean@example.com',
      role: 'Member',
      totalContribution: 99.99,
      state: 'Active',
      history: [
        { title: 'January Contribution', amount: 49.99, date: new Date('2024-01-05') },
        { title: 'February Contribution', amount: 50.0, date: new Date('2024-02-05') }
      ]
    }
  ];

  selectedMember: any = null;

  viewProfile(member: any) {
    this.selectedMember = member;
  }

  addMember() {
    console.log('Add new member');
  }
}
