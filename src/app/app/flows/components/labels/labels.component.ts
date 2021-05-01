import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EntityService } from 'src/app/app/entities/service/entity.service';

@Component({
  selector: 'labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelsComponent),
      multi: true,
    },
  ],
})
export class LabelsComponent implements OnInit, ControlValueAccessor {
  updateEntityLabels = true;
  @Input() removeEntityLabels = false;

  visible = true;
  selectable = true;

  @Input() removable = true;
  @Input() appearance: MatFormFieldAppearance = 'fill';

  separatorKeysCodes: number[] = [ENTER, COMMA];
  labelCtrl = new FormControl();

  // return value
  labels: string[] = [];
  // @Output() labelsChange = new EventEmitter<string[]>();

  activeEntity$ = this.entityService.activeEntity$;
  labelInput = '';

  allLabels$ = this.entityService.activeEntityLabels$;
  allLabels: string[] = [];
  @Input() InputLabels = '';

  filteredLabels = combineLatest([
    this.allLabels$,
    this.labelCtrl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([labels, query]) => {
      return labels?.filter((label: string) => {
        return label.toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    })
  );

  constructor(private entityService: EntityService) {
    this.allLabels$.subscribe((labelsData) => {
      // why not = data? because, it would link all the variables
      this.allLabels = labelsData ? [...labelsData] : [];
      this.removeEntityLabels &&
        (this.labels = labelsData ? [...labelsData] : []);
    });
  }

  onChange!: (labels: string[]) => void;
  onTouched!: () => void;

  writeValue(obj: string[]): void {
    this.labels = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
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

    this.setValue([...this.labels, ...[value.trim()]]);

    input.value = '';

    this.labelCtrl.setValue('');

    const active_entity = this.activeEntity$.value;

    if (this.updateEntityLabels && !this.allLabels.includes(value)) {
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

    this.setValue(this.labels.splice(index, 1));
    // remove label from entities
    if (!this.removeEntityLabels) {
      return;
    }

    // clone/copy current array
    this.allLabels = this.labels.slice();

    this.entityService
      .updateEntity(active_entity.id, {
        labels: this.labels.join(','),
      })
      .subscribe((data) => {
        console.log('removed label', data);
      });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.setValue([...this.labels, ...[event.option.viewValue]]);
    this.labelInput = '';
    this.labelCtrl.setValue('');
  }

  setValue(labels: string[]) {
    this.labels = labels;
    this.onChange(labels);
    this.onTouched();
  }
}
