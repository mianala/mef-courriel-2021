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
import { UserService } from 'src/app/app/users/user.service';

@Component({
  selector: 'labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss'],
})
export class LabelsComponent implements OnInit {
  visible = true;
  selectable = true;
  @Input() removable = true;
  @Input() appearance: MatFormFieldAppearance = 'fill';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  labelCtrl = new FormControl();
  filteredLabels: Observable<string[]>;

  // return value
  @Input() labels: string[] = ['Lemon'];
  @Output() labelsChange = new EventEmitter<string[]>();
  allLabels: string[] = ['JIRAMA', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  labelInput = '';
  @Input() InputLabels = '';

  constructor(private userService: UserService) {
    this.filteredLabels = this.labelCtrl.valueChanges.pipe(
      startWith(null),
      map((label: string | null) =>
        label ? this._filter(label) : this.allLabels.slice()
      )
    );
  }

  ngOnInit() {
    // this.allLabels = this.userService.active_user.value.entity.labels.split(',')
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our label
    if ((value || '').trim()) {
      this.labels.push(value.trim());
    }

    console.log('added', value);

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.labelCtrl.setValue(null);
  }

  remove(label: string): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.labels.push(event.option.viewValue);
    this.labelInput = '';
    this.labelCtrl.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLabels.filter(
      (label) => label.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
