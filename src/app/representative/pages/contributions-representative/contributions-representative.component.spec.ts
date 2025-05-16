import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionsRepresentativeComponent } from './contributions-representative.component';

describe('ContributionsRepresentativeComponent', () => {
  let component: ContributionsRepresentativeComponent;
  let fixture: ComponentFixture<ContributionsRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributionsRepresentativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionsRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
