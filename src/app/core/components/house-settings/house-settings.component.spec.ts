import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSettingsComponent } from './house-settings.component';

describe('HouseSettingsComponent', () => {
  let component: HouseSettingsComponent;
  let fixture: ComponentFixture<HouseSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
