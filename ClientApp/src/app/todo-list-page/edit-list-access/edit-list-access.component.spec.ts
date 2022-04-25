import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListAccessComponent } from './edit-list-access.component';

describe('EditListAccessComponent', () => {
  let component: EditListAccessComponent;
  let fixture: ComponentFixture<EditListAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
