import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from 'src/app/services/entity.service';

@Component({
  selector: 'app-entity-users',
  templateUrl: './entity-users.component.html',
  styleUrls: ['./entity-users.component.scss'],
})
export class EntityUsersComponent implements OnInit {
  entity_id: number = 0;
  entity: Entity = new Entity();
  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {}
}
