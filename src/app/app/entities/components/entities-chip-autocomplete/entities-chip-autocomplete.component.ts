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
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from '../../service/entity.service';

/**
 * @title Entities Chips Autocomplete
 */
@Component({
  selector: 'entities-chip-autocomplete',
  templateUrl: './entities-chip-autocomplete.component.html',
  styleUrls: ['./entities-chip-autocomplete.component.scss'],
})
export class EntitiesChipAutocompleteComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  selected_entity_short_header = '';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  entityCtrl = new FormControl();
  filteredEntities: Entity[] = [];
  entities_text: string[] = [];

  @Input() entities: Entity[] = [];
  @Output() entitiesChange: EventEmitter<Entity[]> = new EventEmitter();

  allEntities!: Entity[];

  @ViewChild('entityInput') entityInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(private entityService: EntityService) {
    this.entityService.entities$.subscribe((e) => {
      this.allEntities = e;
      this.filteredEntities = e;
    });

    this.entityCtrl.valueChanges.subscribe((e) => {
      this._filter(e);
    });
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

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredEntities = this.allEntities.filter((entity) =>
      entity.short_header.toLowerCase().includes(filterValue)
    );
  }
}
