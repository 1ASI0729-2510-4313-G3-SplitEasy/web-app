import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheFooterComponent } from './the-footer.component';

describe('TheFooterComponent', () => {
  let component: TheFooterComponent;
  let fixture: ComponentFixture<TheFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
