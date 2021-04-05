import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFlowDialogComponent } from './save-flow-dialog.component';

describe('SaveFlowDialogComponent', () => {
  let component: SaveFlowDialogComponent;
  let fixture: ComponentFixture<SaveFlowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveFlowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFlowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
