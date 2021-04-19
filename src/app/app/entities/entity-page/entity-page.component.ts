import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';
import { UserService } from '../../users/user.service';
import { EntityService } from '../service/entity.service';

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss']
})
export class EntityPageComponent implements OnInit {

  entity = new Entity()

  constructor(private entityService: EntityService, private userService: UserService, private route: ActivatedRoute) {
    const entity_id = this.route.snapshot.params.entity_id

    this.entityService.getEntityWithUsers(parseInt(entity_id)).subscribe(e => this.entity = e[0])
  }

  ngOnInit(): void {
  }

}
