import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepreSettingsComponent } from './repre-settings.component';

describe('RepreSettingsComponent', () => {
  let component: RepreSettingsComponent;
  let fixture: ComponentFixture<RepreSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepreSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepreSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
