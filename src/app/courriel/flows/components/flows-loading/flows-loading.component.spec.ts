import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowsLoadingComponent } from './flows-loading.component';

describe('FlowsLoadingComponent', () => {
  let component: FlowsLoadingComponent;
  let fixture: ComponentFixture<FlowsLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowsLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowsLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
