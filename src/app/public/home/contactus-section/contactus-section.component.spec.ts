import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusSectionComponent } from './contactus-section.component';

describe('ContactusSectionComponent', () => {
  let component: ContactusSectionComponent;
  let fixture: ComponentFixture<ContactusSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactusSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
