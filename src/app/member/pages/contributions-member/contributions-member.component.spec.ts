import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionsMemberComponent } from './contributions-member.component';

describe('ContributionsMemberComponent', () => {
  let component: ContributionsMemberComponent;
  let fixture: ComponentFixture<ContributionsMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributionsMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionsMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
