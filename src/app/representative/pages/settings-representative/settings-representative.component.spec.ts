import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsRepresentativeComponent } from './settings-representative.component';

describe('SettingsRepresentativeComponent', () => {
  let component: SettingsRepresentativeComponent;
  let fixture: ComponentFixture<SettingsRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsRepresentativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
