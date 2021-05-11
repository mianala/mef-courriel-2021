import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowItemComponent } from './flow-item.component';

describe('FlowItemComponent', () => {
  let component: FlowItemComponent;
  let fixture: ComponentFixture<FlowItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
