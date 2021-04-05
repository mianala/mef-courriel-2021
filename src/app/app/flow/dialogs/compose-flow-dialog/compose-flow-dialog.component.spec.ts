import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeFlowDialogComponent } from './compose-flow-dialog.component';

describe('ComposeFlowDialogComponent', () => {
  let component: ComposeFlowDialogComponent;
  let fixture: ComponentFixture<ComposeFlowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeFlowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeFlowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
