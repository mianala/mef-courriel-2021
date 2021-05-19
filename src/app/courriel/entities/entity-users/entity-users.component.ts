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
  ) {
    this.entity_id = parseInt(this.route.snapshot.params.entity_id);
    this.entityService
      .getEntity(this.entity_id)
      .subscribe((data) => (this.entity = data[0]));
  }

  ngOnInit(): void {}
}
