import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFlowDialogComponent } from './send-flow-dialog.component';

describe('SendFlowDialogComponent', () => {
  let component: SendFlowDialogComponent;
  let fixture: ComponentFixture<SendFlowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendFlowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFlowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
