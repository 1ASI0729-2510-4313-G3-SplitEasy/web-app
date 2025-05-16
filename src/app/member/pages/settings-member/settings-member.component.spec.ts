import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMemberComponent } from './settings-member.component';

describe('SettingsMemberComponent', () => {
  let component: SettingsMemberComponent;
  let fixture: ComponentFixture<SettingsMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
