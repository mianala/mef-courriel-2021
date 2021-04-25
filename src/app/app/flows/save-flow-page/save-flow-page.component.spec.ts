import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFlowPageComponent } from './save-flow-page.component';

describe('SaveFlowPageComponent', () => {
  let component: SaveFlowPageComponent;
  let fixture: ComponentFixture<SaveFlowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveFlowPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFlowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
