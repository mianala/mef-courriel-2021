import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowLoadingComponent } from './flow-loading.component';

describe('FlowLoadingComponent', () => {
  let component: FlowLoadingComponent;
  let fixture: ComponentFixture<FlowLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
