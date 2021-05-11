import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAutocompleteComponent } from './entity-autocomplete.component';

describe('EntityAutocompleteComponent', () => {
  let component: EntityAutocompleteComponent;
  let fixture: ComponentFixture<EntityAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
