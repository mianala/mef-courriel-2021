import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFlowPageComponent } from './view-flow-page.component';

describe('FlowPageComponent', () => {
  let component: ViewFlowPageComponent;
  let fixture: ComponentFixture<ViewFlowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFlowPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFlowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
