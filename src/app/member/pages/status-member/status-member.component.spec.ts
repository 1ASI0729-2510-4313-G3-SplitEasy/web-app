import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMemberComponent } from './status-member.component';

describe('StatusMemberComponent', () => {
  let component: StatusMemberComponent;
  let fixture: ComponentFixture<StatusMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
