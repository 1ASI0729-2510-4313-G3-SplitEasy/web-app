import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {
  MemberService,
  MemberContribution,
  MemberSummary,
} from '../../../shared/service/member.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contributions-member',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgForOf, ReactiveFormsModule, NgIf],
  templateUrl: './contributions-member.component.html',
  styleUrl: './contributions-member.component.css',
})
export class ContributionsMemberComponent implements OnInit {
  totalContributed = 0;
  assignedGoal = 0;
  deadline = new Date();
  status = '';
  contributionHistory: MemberContribution[] = [];
  formNewContribution!: FormGroup;
  activateForm!: boolean;

  memberId = 'm1';

  constructor(
    private router: Router,
    private memberService: MemberService,
    private fb: FormBuilder
  ) {}

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

  createNewContribution() {
    const formValue = this.formNewContribution.value;
    debugger;
    if (this.formNewContribution.valid) {
      this.memberService
        .addContribution('m1', {
          date: formValue.date,
          amount: formValue.amount,
          comment: formValue.comment,
          status: 'Pending',
        })
        .subscribe((updatedHistory) => {
          this.contributionHistory = updatedHistory; // Mostrar en tabla
        });
    }
  }

  addContribution() {
    this.formNewContribution = this.fb.group({
      date: [new Date(), [Validators.required]],
      amount: [0.0, [Validators.required, Validators.min(0)]],
      comment: ['', [Validators.required]],
    });
    this.activateForm = !this.activateForm;
  }
}
