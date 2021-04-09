import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityUsersComponent } from './entity-users.component';

describe('EntityUsersComponent', () => {
  let component: EntityUsersComponent;
  let fixture: ComponentFixture<EntityUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
