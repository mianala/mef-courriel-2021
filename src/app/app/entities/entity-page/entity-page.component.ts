import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';
import { UserService } from '../../users/user.service';
import { EntityService } from '../service/entity.service';

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss'],
})
export class EntityPageComponent implements OnInit {
  entity = new Entity();
  labelsToggle = false;
  observationsToggle = false;
  letterTextsToggle = false;

  constructor(
    private entityService: EntityService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(this.getEntity.bind(this));
  }

  getEntity(data: any) {
    if (!data.entity_id) {
      this.entityService.activeEntity$.subscribe((entity) => {
        this.entityService.getEntityWithUsers(entity.id).subscribe((e) => {
          this.entity = e[0];
        });
      });

      return;
    }

    this.entityService
      .getEntityWithUsers(parseInt(data.entity_id))
      .subscribe((e) => {
        this.entity = e[0];
      });
  }

  ngOnInit(): void {}
}
