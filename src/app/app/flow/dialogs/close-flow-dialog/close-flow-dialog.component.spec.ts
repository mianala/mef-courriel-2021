import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseFlowDialogComponent } from './close-flow-dialog.component';

describe('CloseFlowDialogComponent', () => {
  let component: CloseFlowDialogComponent;
  let fixture: ComponentFixture<CloseFlowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseFlowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseFlowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
