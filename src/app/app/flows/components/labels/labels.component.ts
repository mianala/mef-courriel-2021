import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { EntityService } from 'src/app/app/entities/service/entity.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss'],
})
export class LabelsComponent implements OnInit {
  updateEntity = true;

  visible = true;
  selectable = true;

  @Input() removable = true;
  @Input() appearance: MatFormFieldAppearance = 'fill';

  separatorKeysCodes: number[] = [ENTER, COMMA];
  labelCtrl = new FormControl();

  filteredLabels = this.labelCtrl.valueChanges.pipe(
    startWith(''),
    switchMap((query: string) =>
      this.allLabels$.pipe(
        map((labels: string[]) => {
          return labels.filter((label: string) => {
            return label.toLowerCase().indexOf(query.toLowerCase()) === 0;
          });
        })
      )
    )
  );

  // return value
  @Input() labels: string[] = [];
  @Output() labelsChange = new EventEmitter<string[]>();

  allLabels$ = this.entityService.activeEntityLabels$;

  labelInput = '';

  @Input() InputLabels = '';

  constructor(
    private userService: UserService,
    private entityService: EntityService
  ) {}

  ngOnInit() {
    if (this.updateEntity) {
      console.log(this.entityService.activeEntity$.value);
      const active_entity = this.entityService.activeEntity$.value;
      this.labels = active_entity.labels ? active_entity.labels.split(',') : [];
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // if nothing in
    if (!(value || '').trim()) {
      return;
    }

    this.labels.push(value.trim());

    input.value = '';

    this.labelCtrl.setValue('');

    const active_entity = this.entityService.activeEntity$.value;

    if (this.updateEntity) {
      if (!active_entity.labels?.includes(value)) {
        this.entityService
          .updateEntity(active_entity.id, {
            labels: `${active_entity.labels},${value}`,
          })
          .subscribe((data) => {
            console.log(data);
          });
      }
    }
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
}
