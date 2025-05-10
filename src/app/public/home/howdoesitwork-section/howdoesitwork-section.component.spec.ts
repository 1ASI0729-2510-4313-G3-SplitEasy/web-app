import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowdoesitworkSectionComponent } from './howdoesitwork-section.component';

describe('HowdoesitworkSectionComponent', () => {
  let component: HowdoesitworkSectionComponent;
  let fixture: ComponentFixture<HowdoesitworkSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowdoesitworkSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowdoesitworkSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
