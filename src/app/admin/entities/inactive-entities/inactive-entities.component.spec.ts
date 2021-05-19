import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveEntitiesComponent } from './inactive-entities.component';

describe('InactiveEntitiesComponent', () => {
  let component: InactiveEntitiesComponent;
  let fixture: ComponentFixture<InactiveEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveEntitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
