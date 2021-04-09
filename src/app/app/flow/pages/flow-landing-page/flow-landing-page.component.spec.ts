import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowLandingPageComponent } from './flow-landing-page.component';

describe('FlowLandingPageComponent', () => {
  let component: FlowLandingPageComponent;
  let fixture: ComponentFixture<FlowLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
