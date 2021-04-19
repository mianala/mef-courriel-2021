import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from 'src/app/app/entities/service/entity.service';
import { UserService } from 'src/app/app/users/user.service';
import { Entity } from 'src/app/classes/entity';

@Component({
  selector: 'app-user-entity-page',
  templateUrl: './user-entity-page.component.html',
  styleUrls: ['./user-entity-page.component.scss']
})
export class UserEntityPageComponent implements OnInit {

  entity = new Entity()

  constructor(private entityService: EntityService, private userService: UserService, private route: ActivatedRoute) {
    const entity_id = this.route.snapshot.params.entity_id

    this.entityService.getEntityWithUsers(parseInt(entity_id)).subscribe(e => this.entity = e[0])
  }
  ngOnInit(): void {
  }

}
