import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntityPageComponent } from './user-entity-page.component';

describe('UserEntityPageComponent', () => {
  let component: UserEntityPageComponent;
  let fixture: ComponentFixture<UserEntityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEntityPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEntityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
