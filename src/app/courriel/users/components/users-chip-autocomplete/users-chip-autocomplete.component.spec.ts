import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersChipAutocompleteComponent } from './users-chip-autocomplete.component';

describe('UsersChipAutocompleteComponent', () => {
  let component: UsersChipAutocompleteComponent;
  let fixture: ComponentFixture<UsersChipAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersChipAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersChipAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
