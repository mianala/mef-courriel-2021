import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentFlowsComponent } from './sent-flows.component';

describe('SentFlowsComponent', () => {
  let component: SentFlowsComponent;
  let fixture: ComponentFixture<SentFlowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentFlowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
