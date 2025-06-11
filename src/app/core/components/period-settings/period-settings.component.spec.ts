import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodSettingsComponent } from './period-settings.component';

describe('PeriodSettingsComponent', () => {
  let component: PeriodSettingsComponent;
  let fixture: ComponentFixture<PeriodSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
