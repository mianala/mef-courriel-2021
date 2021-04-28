import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { delay, map, skip, startWith, switchMap } from 'rxjs/operators';
import { EntityService } from 'src/app/app/entities/service/entity.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss'],
})
export class LabelsComponent implements OnInit {
  updateEntityLabels = true;
  @Input() removeEntityLabels = false;

  visible = true;
  selectable = true;

  @Input() removable = true;
  @Input() appearance: MatFormFieldAppearance = 'fill';

  separatorKeysCodes: number[] = [ENTER, COMMA];
  labelCtrl = new FormControl();

  allLabels$ = this.entityService.activeEntityLabels$;
  allLabels: string[] = [];

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

  activeEntity$ = this.entityService.activeEntity$;
  activeEntityLabels$ = this.entityService.activeEntityLabels$;
  labelInput = '';

  @Input() InputLabels = '';

  constructor(
    private userService: UserService,
    private entityService: EntityService
  ) {
    this.allLabels$.pipe().subscribe((labelsData) => {
      // why not = data? because, it would link all the variables
      this.allLabels = [...labelsData];
      if (this.removeEntityLabels) {
        this.labels = [...labelsData];
      }
    });
  }

  ngOnInit() {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const index = this.labels.indexOf(value);

    if (index >= 0) {
      return;
    }
    // if nothing in
    if (!(value || '').trim()) {
      return;
    }

    this.labels.push(value.trim());

    input.value = '';

    this.labelCtrl.setValue('');

    const active_entity = this.activeEntity$.value;

    console.log('alllabels plus value', [...this.allLabels, ...[value]]);
    console.log(this.labels);

    if (this.updateEntityLabels && !this.allLabels.includes(value)) {
      console.log([...this.allLabels, ...[value]]);

      this.entityService
        .updateEntity(active_entity.id, {
          labels: [...this.allLabels, ...[value]].join(','),
        })
        .subscribe((data) => {
          this.allLabels = [...this.allLabels, ...[value]];
          console.log('added label', data);
        });
    }
  }

  remove(label: string): void {
    const index = this.labels.indexOf(label);
    const active_entity = this.activeEntity$.value;

    if (index < 0) {
      return;
    }

    this.labels.splice(index, 1);

    // remove label from entities
    if (!this.removeEntityLabels) {
      return;
    }

    this.allLabels = this.labels;

    this.entityService
      .updateEntity(active_entity.id, {
        labels: this.labels.join(','),
      })
      .subscribe((data) => {
        console.log('removed label', data);
      });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.labels.push(event.option.viewValue);
    this.labelInput = '';
    this.labelCtrl.setValue('');
  }
}
