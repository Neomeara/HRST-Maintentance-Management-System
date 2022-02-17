import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLastnameComponent } from './first-lastname.component';

describe('FirstLastnameComponent', () => {
  let component: FirstLastnameComponent;
  let fixture: ComponentFixture<FirstLastnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstLastnameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLastnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
