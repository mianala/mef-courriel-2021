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
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from '../../service/entity.service';

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
  implements OnInit, ControlValueAccessor {
  @Input() appearance: MatFormFieldAppearance = 'outline';

  entities: Entity[] = [];
  filteredOptions: Entity[] = [];

  entity = new Entity();
  allEntities$ = this.entityService.entities$;

  entityCtrl = new FormControl('');
  filteredEntities$ = combineLatest([
    this.allEntities$,
    this.entityCtrl.valueChanges,
  ]).pipe(
    map(([entities, query]) => {
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
    this.entityService.entities$.subscribe(this.getEntities.bind(this));
  }

  setValue(entity: Entity) {
    this.entity = entity;
    this.onChange(entity);
    this.onTouched();
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

  getEntities(entities: any) {
    this.filteredOptions = this.entities = entities;
  }

  ngOnInit(): void {}

  select(e: Entity) {
    this.setValue(new Entity(e));
  }

  resetSelection(e: any) {
    this.setValue(new Entity({ short: this.entity.short }));
  }
}
