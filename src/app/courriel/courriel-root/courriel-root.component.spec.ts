import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourrielRootComponent } from './courriel-root.component';

describe('AppPageComponent', () => {
  let component: CourrielRootComponent;
  let fixture: ComponentFixture<CourrielRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourrielRootComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourrielRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
