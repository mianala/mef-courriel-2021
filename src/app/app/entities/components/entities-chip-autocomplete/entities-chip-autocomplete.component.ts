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

  @Input() entities: Entity[] = [];
  @Output() entitiesChange: EventEmitter<Entity[]> = new EventEmitter();

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

  writeValue(obj: any): void {
    this.entities = obj;
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our entity
    if ((value || '').trim()) {
      const newEntity = new Entity();
      newEntity.short = value.trim();
      this.entities.push(newEntity);
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
    }
  }

  selected(e: Entity): void {
    this.entities.push(new Entity(e));
    this.entityInput.nativeElement.value = '';
    this.entityCtrl.setValue('');
  }
}
