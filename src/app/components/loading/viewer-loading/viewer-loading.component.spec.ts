import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerLoadingComponent } from './viewer-loading.component';

describe('ViewerLoadingComponent', () => {
  let component: ViewerLoadingComponent;
  let fixture: ComponentFixture<ViewerLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
