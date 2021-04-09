import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from './service/entity.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
})
export class EntitiesComponent implements OnInit {


entities:Entity[] = []

  constructor( private entityService:EntityService) {
    this.entityService.entities.subscribe(this.gotEntities.bind(this))
  }

  ngOnInit(): void {

  }

  gotEntities(entities:Entity[])
  {
    this.entities = entities
  }

}
