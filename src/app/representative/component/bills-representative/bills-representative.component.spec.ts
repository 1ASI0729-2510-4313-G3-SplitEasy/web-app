import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsRepresentativeComponent } from './bills-representative.component';

describe('BillsRepresentativeComponent', () => {
  let component: BillsRepresentativeComponent;
  let fixture: ComponentFixture<BillsRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsRepresentativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
