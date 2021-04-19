import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFlowsComponent } from './empty-flows.component';

describe('EmptyFlowsComponent', () => {
  let component: EmptyFlowsComponent;
  let fixture: ComponentFixture<EmptyFlowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyFlowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
