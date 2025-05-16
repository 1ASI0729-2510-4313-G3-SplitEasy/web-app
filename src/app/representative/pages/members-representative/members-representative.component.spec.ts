import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersRepresentativeComponent } from './members-representative.component';

describe('MembersRepresentativeComponent', () => {
  let component: MembersRepresentativeComponent;
  let fixture: ComponentFixture<MembersRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersRepresentativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
