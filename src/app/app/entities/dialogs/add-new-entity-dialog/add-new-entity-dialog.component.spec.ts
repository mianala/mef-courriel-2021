import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEntityDialogComponent } from './add-new-entity-dialog.component';

describe('AddNewEntityDialogComponent', () => {
  let component: AddNewEntityDialogComponent;
  let fixture: ComponentFixture<AddNewEntityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewEntityDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
