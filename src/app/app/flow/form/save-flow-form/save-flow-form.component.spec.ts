import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFlowFormComponent } from './save-flow-form.component';

describe('SaveFlowFormComponent', () => {
  let component: SaveFlowFormComponent;
  let fixture: ComponentFixture<SaveFlowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveFlowFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFlowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
