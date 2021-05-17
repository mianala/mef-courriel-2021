import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPageLoadingComponent } from './entity-page-loading.component';

describe('EntityPageLoadingComponent', () => {
  let component: EntityPageLoadingComponent;
  let fixture: ComponentFixture<EntityPageLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityPageLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPageLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
