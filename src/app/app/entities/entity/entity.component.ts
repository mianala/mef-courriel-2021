import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from '../service/entity.service';

@Component({
  selector: 'entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit {
  @Input() entity: Entity = new Entity()
  constructor(private entityService: EntityService) { }

  remove() {
    const short = prompt(`Entrez '${this.entity.short}' pour valider`)
    short == this.entity.short ? this.entityService.desactivateEntity(this.entity.id) : null
  }

  ngOnInit(): void {

  }
}
