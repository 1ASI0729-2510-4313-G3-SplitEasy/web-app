import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepreBillingComponent } from './repre-billing.component';

describe('RepreBillingComponent', () => {
  let component: RepreBillingComponent;
  let fixture: ComponentFixture<RepreBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepreBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepreBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
