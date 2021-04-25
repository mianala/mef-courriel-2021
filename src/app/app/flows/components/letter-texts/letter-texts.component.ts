import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EntityService } from 'src/app/app/entities/service/entity.service';
import { UserService } from 'src/app/app/users/user.service';

@Component({
  selector: 'app-letter-texts',
  templateUrl: './letter-texts.component.html',
  styleUrls: ['./letter-texts.component.scss'],
})
export class LetterTextsComponent implements OnInit {
  visible = true;
  selectable = true;
  @Input() removable = true;
  @Input() updapte = false;
  @Input() appearance: MatFormFieldAppearance = 'fill';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  letterCtrl = new FormControl();
  filteredLetters: Observable<string[]>;

  // return value
  @Input() letters: string[] = ['Lemon'];
  @Output() lettersChange = new EventEmitter<string[]>();
  allLetters: string[] = ['JIRAMA', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  letterInput = '';
  @Input() InputLetters = '';

  constructor(
    private userService: UserService,
    public entityService: EntityService
  ) {
    this.filteredLetters = this.letterCtrl.valueChanges.pipe(
      startWith(null),
      map((letter: string | null) =>
        letter ? this._filter(letter) : this.allLetters.slice()
      )
    );
  }

  ngOnInit() {
    // this.allLetters = this.userService.active_user.value.entity.letters.split(',')
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our letter
    if ((value || '').trim()) {
      this.letters.push(value.trim());
    }

    console.log('added', value);

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.letterCtrl.setValue(null);
  }

  remove(letter: string): void {
    const index = this.letters.indexOf(letter);

    if (index >= 0) {
      this.letters.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.letters.push(event.option.viewValue);
    this.letterInput = '';
    this.letterCtrl.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLetters.filter(
      (letter) => letter.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
