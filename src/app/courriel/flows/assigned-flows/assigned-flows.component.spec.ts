import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedFlowsComponent } from './assigned-flows.component';

describe('AssignedFlowsComponent', () => {
  let component: AssignedFlowsComponent;
  let fixture: ComponentFixture<AssignedFlowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedFlowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
