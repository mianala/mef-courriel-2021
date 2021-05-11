import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowRouteItemComponent } from './flow-route-item.component';

describe('RouteItemComponent', () => {
  let component: FlowRouteItemComponent;
  let fixture: ComponentFixture<FlowRouteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowRouteItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowRouteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
