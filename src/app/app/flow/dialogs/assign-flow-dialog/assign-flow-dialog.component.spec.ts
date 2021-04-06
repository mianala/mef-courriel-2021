import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFlowDialogComponent } from './assign-flow-dialog.component';

describe('AssignFlowDialogComponent', () => {
  let component: AssignFlowDialogComponent;
  let fixture: ComponentFixture<AssignFlowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignFlowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignFlowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
