import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteListItemDialogComponent } from './delete-list-item-dialog.component';

describe('DeleteListItemDialogComponent', () => {
  let component: DeleteListItemDialogComponent;
  let fixture: ComponentFixture<DeleteListItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteListItemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteListItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
