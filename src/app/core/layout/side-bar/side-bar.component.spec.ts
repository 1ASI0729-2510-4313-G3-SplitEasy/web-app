import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SideBarMemberComponent} from './side-bar.component';

describe('SideBarMemberComponent', () => {
  let component: SideBarMemberComponent;
  let fixture: ComponentFixture<SideBarMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
