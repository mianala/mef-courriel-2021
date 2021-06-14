import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';
import { UserService } from '../../../services/user.service';
import { EntityService } from 'src/app/services/entity.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss'],
})
export class EntityPageComponent implements OnInit {
  labelsToggle = false;
  observationsToggle = false;
  letterTextsToggle = false;

  entityUsers$: Observable<User[]> | undefined;
  entity$: Observable<Entity> | undefined;
  params$ = this.route.queryParams.pipe(
    tap((data) => {
      let entity_id = data.entity_id;
      if (entity_id) {
        this.entity$ = this.entityService.getEntity(entity_id);
        this.entityUsers$ = this.userService.entityUsers$;
        return;
      }

      entity_id = this.userService.activeUser$.value?.entity_id;

      this.entity$ = this.entityService.getEntity(entity_id);
      this.entityUsers$ = this.userService.getMapEntityUsers(entity_id);
    })
  );

  constructor(
    private entityService: EntityService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.params$.subscribe();
  }

  ngOnInit(): void {}
}
