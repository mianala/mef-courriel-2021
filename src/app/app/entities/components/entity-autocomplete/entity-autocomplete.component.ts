import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from '../../service/entity.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'entity-autocomplete',
  templateUrl: './entity-autocomplete.component.html',
  styleUrls: ['./entity-autocomplete.component.scss'],
})
export class EntityAutocompleteComponent implements OnInit {
  query = ''
  entities:Entity[] = []
  filteredOptions: Entity[] = [];
  selectedEntity: Entity = new Entity()

  constructor(private entityService: EntityService) {
    this.entityService.getEntities().subscribe(data => {
      next: this.getEntities(data.data)
    })
  }

  getEntities(data:any)
  {
    this.filteredOptions = this.entities = data.entity
    console.log(this.entities[1].short)
  }

  ngOnInit(): void {

  }

  _filter(e:any){
    this.filteredOptions = this.entities.filter(entity => entity.short.toLowerCase().includes(e.target.value));
    console.log(this.filteredOptions)
  }

  selected(e:any){
    Object.assign(this.selectedEntity, e)
  }

  resetSelection(){
    this.selectedEntity = new Entity()
  }
}
