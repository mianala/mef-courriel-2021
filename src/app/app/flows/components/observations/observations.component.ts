import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  selector: 'observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {
  visible = true;
  selectable = true;
  @Input() removable = true;
  @Input() appearance: MatFormFieldAppearance = 'fill';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  observationCtrl = new FormControl();
  filteredLabels: Observable<string[]>;

  // return value
  @Input() observations: string[] = ['Lemon'];
  @Output() observationsChange = new EventEmitter<string[]>();
  allLabels: string[] = ['JIRAMA', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  observationInput = '';
  @Input() InputLabels = '';

  constructor(private userService: UserService) {
    this.filteredLabels = this.observationCtrl.valueChanges.pipe(
      startWith(null),
      map((observation: string | null) =>
        observation ? this._filter(observation) : this.allLabels.slice()
      )
    );

  }

  ngOnInit() {
    // this.allLabels = this.userService.active_user.value.entity.observations.split(',')
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our observation
    if ((value || '').trim()) {
      this.observations.push(value.trim());
    }

    console.log("added", value)

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.observationCtrl.setValue(null);
  }

  remove(observation: string): void {
    const index = this.observations.indexOf(observation);

    if (index >= 0) {
      this.observations.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.observations.push(event.option.viewValue);
    this.observationInput = '';
    this.observationCtrl.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLabels.filter(
      (observation) => observation.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
