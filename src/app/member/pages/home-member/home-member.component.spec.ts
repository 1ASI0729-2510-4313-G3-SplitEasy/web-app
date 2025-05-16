import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMemberComponent } from './home-member.component';

describe('HomeMemberComponent', () => {
  let component: HomeMemberComponent;
  let fixture: ComponentFixture<HomeMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
