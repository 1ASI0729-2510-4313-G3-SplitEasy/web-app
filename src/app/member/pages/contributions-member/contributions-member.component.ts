import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import {
  MemberService,
  MemberContribution,
  MemberSummary,
} from '../../../shared/service/member.service';

@Component({
  selector: 'app-contributions-member',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgForOf],
  templateUrl: './contributions-member.component.html',
  styleUrl: './contributions-member.component.css',
})
export class ContributionsMemberComponent implements OnInit {
  totalContributed = 0;
  assignedGoal = 0;
  deadline = new Date();
  status = '';
  contributionHistory: MemberContribution[] = [];

  memberId = 'm1';

  constructor(private router: Router, private memberService: MemberService) {}

  ngOnInit(): void {
    this.memberService.getMemberSummary(this.memberId).subscribe({
      next: (member: MemberSummary) => {
        this.totalContributed = member.totalContributed;
        this.assignedGoal = member.assignedGoal;
        this.deadline = new Date(member.deadline);
        this.status = member.status;
        this.contributionHistory = member.contributionHistory.map((c) => ({
          ...c,
          date: new Date(c.date),
        }));
      },
      error: (err) => console.error('Error fetching member data', err),
    });
  }

  addContribution() {
    this.router.navigate(['/member/contributions/new']);
  }
}
