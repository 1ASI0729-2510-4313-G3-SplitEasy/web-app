import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContributionsMemberComponent } from './contributions-member.component';
import { of } from 'rxjs';
import { MemberService } from '../../../shared/service/member.service';

describe('ContributionsMemberComponent', () => {
  let component: ContributionsMemberComponent;
  let fixture: ComponentFixture<ContributionsMemberComponent>;

  beforeEach(async () => {
    const mockMemberService = {
      getMemberSummary: () => of({
        totalContributed: 150,
        assignedGoal: 200,
        deadline: '2025-06-15',
        status: 'In Progress',
        contributionHistory: [
          {
            date: '2025-05-01',
            amount: 50.00,
            comment: 'Monthly payment',
            status: 'Approved'
          },
          {
            date: '2025-04-01',
            amount: 100.00,
            comment: 'Initial contribution',
            status: 'Approved'
          }
        ]
      })
    };

    await TestBed.configureTestingModule({
      imports: [ContributionsMemberComponent],
      providers: [{ provide: MemberService, useValue: mockMemberService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ContributionsMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
