import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
  HostBinding,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from '../../service/entity.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @title Entities Chips Autocomplete
 */
@Component({
  selector: 'entities-chip-autocomplete',
  templateUrl: './entities-chip-autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntitiesChipAutocompleteComponent),
      multi: true,
    },
  ],
  styleUrls: ['./entities-chip-autocomplete.component.scss'],
})
export class EntitiesChipAutocompleteComponent
  implements OnInit, ControlValueAccessor {
  visible = true;
  selectable = true;
  removable = true;
  selected_entity_short_header = '';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  entityCtrl = new FormControl('');
  entities_text: string[] = [];

  entities: Entity[] = [];
  // @Output() entitiesChange: EventEmitter<Entity[]> = new EventEmitter();

  allEntities$ = this.entityService.entities$;

  filteredEntities$ = combineLatest([
    this.allEntities$,
    this.entityCtrl.valueChanges,
  ]).pipe(
    map(([entities, query]) => {
      const filterValue = query.toLowerCase();
      return entities.filter((entity) =>
        entity.short_header.toLowerCase().includes(filterValue)
      );
    })
  );

  @ViewChild('entityInput') entityInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(private entityService: EntityService) {}

  onChange!: (entities: Entity[]) => void;
  onTouched!: () => void;

  writeValue(obj: any): void {
    if (!obj) {
      this.entities = [];
      return;
    }
    this.entities = obj;
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our entity
    if ((value || '').trim()) {
      const newEntity = new Entity();
      newEntity.short = value.trim();
      this.setValue([...this.entities, ...[newEntity]]);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.entityCtrl.setValue('');
  }

  remove(entity: Entity): void {
    const index = this.entities.indexOf(entity);

    if (index >= 0) {
      this.entities.splice(index, 1);
      this.setValue(this.entities);
    }
  }

  selected(e: Entity): void {
    this.setValue([...this.entities, ...[new Entity(e)]]);
    this.entityInput.nativeElement.value = '';
    this.entityCtrl.setValue('');
  }

  setValue(entities: Entity[]) {
    this.entities = entities;
    this.onChange(entities);
    this.onTouched();
  }
}
