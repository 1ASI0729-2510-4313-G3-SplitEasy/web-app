import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeManagementComponent } from './home-management.component';

describe('HomeManagementComponent', () => {
  let component: HomeManagementComponent;
  let fixture: ComponentFixture<HomeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
