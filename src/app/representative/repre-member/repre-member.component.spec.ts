import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepreMemberComponent } from './repre-member.component';

describe('RepreMemberComponent', () => {
  let component: RepreMemberComponent;
  let fixture: ComponentFixture<RepreMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepreMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepreMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
