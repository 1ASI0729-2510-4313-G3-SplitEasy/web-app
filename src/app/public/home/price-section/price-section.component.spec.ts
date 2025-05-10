import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSectionComponent } from './price-section.component';

describe('PriceSectionComponent', () => {
  let component: PriceSectionComponent;
  let fixture: ComponentFixture<PriceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
