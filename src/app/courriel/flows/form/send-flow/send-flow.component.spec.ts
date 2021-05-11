import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFlowFormComponent } from './send-flow.component';

describe('SendFlowFormComponent', () => {
  let component: SendFlowFormComponent;
  let fixture: ComponentFixture<SendFlowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendFlowFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFlowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
