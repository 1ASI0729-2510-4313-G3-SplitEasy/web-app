import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepreContributionsComponent } from './repre-contributions.component';

describe('RepreContributionsComponent', () => {
  let component: RepreContributionsComponent;
  let fixture: ComponentFixture<RepreContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepreContributionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepreContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
