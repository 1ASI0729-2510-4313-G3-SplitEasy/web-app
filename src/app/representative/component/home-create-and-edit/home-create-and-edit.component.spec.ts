import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCreateAndEditComponent } from './home-create-and-edit.component';

describe('HomeCreateAndEditComponent', () => {
  let component: HomeCreateAndEditComponent;
  let fixture: ComponentFixture<HomeCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
