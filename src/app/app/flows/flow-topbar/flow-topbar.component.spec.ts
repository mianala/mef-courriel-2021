import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowTopbarComponent } from './flow-topbar.component';

describe('FlowTopbarComponent', () => {
  let component: FlowTopbarComponent;
  let fixture: ComponentFixture<FlowTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowTopbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
