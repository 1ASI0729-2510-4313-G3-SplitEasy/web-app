import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepreHomeComponent } from './repre-home.component';

describe('RepreHomeComponent', () => {
  let component: RepreHomeComponent;
  let fixture: ComponentFixture<RepreHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepreHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
