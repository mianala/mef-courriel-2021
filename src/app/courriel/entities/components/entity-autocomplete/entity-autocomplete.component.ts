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
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from 'src/app/services/entity.service';

@Component({
  selector: 'entity-autocomplete',
  templateUrl: './entity-autocomplete.component.html',
  styleUrls: ['./entity-autocomplete.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityAutocompleteComponent),
      multi: true,
    },
  ],
})
export class EntityAutocompleteComponent
  implements OnInit, ControlValueAccessor
{
  @Input() appearance: MatFormFieldAppearance = 'outline';

  entity = new Entity();
  allEntities$ = this.entityService.allEntities$;

  displayEntity = (value: Entity) => (value ? value.short : '');

  entityCtrl = new FormControl('');

  filteredEntities$ = combineLatest([
    this.allEntities$,
    this.entityCtrl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([entities, query]) => {
      query = query.id ? query.short : query;

      return entities.filter((entity) =>
        entity.short_header.toLowerCase().includes(query.toLowerCase())
      );
    })
  );

  @Input() must_select_entity: Boolean = false;
  @Input() label = 'Département';

  @Output() entitySelected: EventEmitter<Entity> = new EventEmitter();
  @Output() _keypress: EventEmitter<any> = new EventEmitter();
  @Output() _blur: EventEmitter<any> = new EventEmitter();
  @Output() _keyup: EventEmitter<any> = new EventEmitter();

  constructor(private entityService: EntityService) {
    this.entityCtrl.valueChanges.subscribe((value) =>
      this.setValue(new Entity({ short: value }))
    );
  }

  setValue(entity: Entity) {
    this.entity = entity;
    this.onChange(entity);
    this.onTouched();
  }

  optionSelected(e: MatAutocompleteSelectedEvent) {
    this.setValue(e.option.value);
  }

  onChange!: (entity: Entity) => void;
  onTouched!: () => void;

  writeValue(obj: Entity): void {
    this.entity = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {}

  select(e: Entity) {
    this.setValue(new Entity(e));
  }
}
