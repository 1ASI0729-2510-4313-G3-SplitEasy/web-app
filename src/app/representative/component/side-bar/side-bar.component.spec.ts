import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SideBarRepresentativeComponent} from './side-bar.component';

describe('SideBarRepresentativeComponent', () => {
  let component: SideBarRepresentativeComponent;
  let fixture: ComponentFixture<SideBarRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarRepresentativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
