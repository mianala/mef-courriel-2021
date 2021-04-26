import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from '../../service/entity.service';

@Component({
  selector: 'entity-autocomplete',
  templateUrl: './entity-autocomplete.component.html',
  styleUrls: ['./entity-autocomplete.component.scss'],
})
export class EntityAutocompleteComponent implements OnInit {
  @Input() appearance: MatFormFieldAppearance = 'outline';

  entities: Entity[] = [];
  filteredOptions: Entity[] = [];

  @Input() entity = new Entity();
  @Output() entityChange: EventEmitter<Entity> = new EventEmitter();

  @Input() must_select_entity: Boolean = false;
  @Input() label = 'Département';

  @Output() entitySelected: EventEmitter<Entity> = new EventEmitter();
  @Output() _keypress: EventEmitter<any> = new EventEmitter();
  @Output() _blur: EventEmitter<any> = new EventEmitter();
  @Output() _keyup: EventEmitter<any> = new EventEmitter();

  constructor(private entityService: EntityService) {
    this.entityService.entities$.subscribe(this.getEntities.bind(this));
  }

  getEntities(entities: any) {
    this.filteredOptions = this.entities = entities;
  }

  ngOnInit(): void {}

  _filter(e: any) {
    this.filteredOptions = this.entities.filter((entity) =>
      entity.short_header
        .toLowerCase()
        .includes(this.entity.short.toLowerCase())
    );
    this._keyup.emit(e.target.value);
  }

  select(e: Entity) {
    this.entity = new Entity(e);
    this.entityChange.emit(this.entity);
  }

  resetSelection(e: any) {
    console.log(e);

    this.entity = new Entity({ short: this.entity.short });
    this.entityChange.emit(this.entity);
  }
}
