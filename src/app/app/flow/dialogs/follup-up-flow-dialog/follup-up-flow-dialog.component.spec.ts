import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollupUpFlowDialogComponent } from './follup-up-flow-dialog.component';

describe('FollupUpFlowDialogComponent', () => {
  let component: FollupUpFlowDialogComponent;
  let fixture: ComponentFixture<FollupUpFlowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollupUpFlowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollupUpFlowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
