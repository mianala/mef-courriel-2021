import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterTextsComponent } from './letter-texts.component';

describe('LetterTextsComponent', () => {
  let component: LetterTextsComponent;
  let fixture: ComponentFixture<LetterTextsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterTextsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
