import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesChipAutocompleteComponent } from './entities-chip-autocomplete.component';

describe('EntitiesChipAutocompleteComponent', () => {
  let component: EntitiesChipAutocompleteComponent;
  let fixture: ComponentFixture<EntitiesChipAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesChipAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesChipAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
