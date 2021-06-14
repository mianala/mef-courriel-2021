import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { NotificationService } from 'src/app/services/notification.service';
import EntityQueries from '../queries/entity.queries';
import { UserService } from './user.service';

class EntityWithActions extends Entity {
  desactivate() {
    EntityService.getInstance().desactivateEntity(this.id);
  }

  activate() {
    EntityService.getInstance().activateEntity(this.id);
  }

  delete() {}

  static mapEntities = map((val: any): Entity[] => {
    return val.data.entity.map((val: any) => {
      return new EntityWithActions(val);
    });
  });

  static mapEntityInfo = map((info: any): IEntityInfo => {
    return {
      labels: info?.labels ? info?.labels.split(',') : null,
      letter_texts: info?.letter_texts ? info?.letter_texts.split(',') : null,
      type_texts: info?.type_texts ? info?.type_texts.split(',') : null,
      observations: info?.observations ? info?.observations.split(',') : null,
    };
  });

  static mapEntityLabelsInfo = map((info: IEntityInfo | null) =>
    info ? info.labels : null
  );

  static mapUserEntity = map((val: any): Entity => {
    const entity_query_result = val.data.entity[0];

    let entity = new EntityWithActions(entity_query_result);

    if (!entity.parent === null) {
      entity.parent = new EntityWithActions(entity_query_result.parent);
      entity.parent.children = entity_query_result.parent.children.map(
        (entity: any) => new EntityWithActions(entity)
      );
    }

    entity.children = entity_query_result.children.map((child: any) => {
      let newChild = new EntityWithActions(child);
      let c = child.children.map(
        (grandchild: any) => new EntityWithActions(grandchild)
      );
      newChild.children = c.filter((e: any) => {
        return e.level < entity.level + 3;
      });

      return newChild;
    });

    return entity;
  });
}
interface IEntityInfo {
  labels: string[] | null;
  observations: string[] | null;
  letter_texts: string[] | null;
  type_texts: string[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  _userEntity: Entity | undefined;

  userEntityInfoQuery:
    | QueryRef<
        unknown,
        {
          entity_id: number;
        }
      >
    | undefined;
  activeUserIdEntityInfoQuery:
    | QueryRef<
        unknown,
        {
          entity_id: number;
        }
      >
    | undefined;
  userEntityQuery:
    | QueryRef<
        unknown,
        {
          entity_id: number;
        }
      >
    | undefined;
  allEntitiesQuery = this.allEntities();

  allEntities$ = this.allEntitiesQuery.valueChanges.pipe(
    EntityWithActions.mapEntities
  );
  activeEntities$ = this.allEntities$.pipe(
    map((entities) => entities.filter((entity) => entity.active))
  );
  inactiveEntities$ = this.allEntities$.pipe(
    map((entities) => entities.filter((entity) => !entity.active))
  );

  activeUserEntityId$ = this.userService.activeUserEntityId$;

  userEntity$ = new BehaviorSubject<Entity | null>(null);
  userEntityInfo$ = new BehaviorSubject<IEntityInfo | null>(null);

  userEntityLabels$ = this.userEntityInfo$.pipe(
    EntityWithActions.mapEntityLabelsInfo
  );
  userEntityObservations$: Observable<any> | undefined;
  userEntityTypeTexts$: Observable<any> | undefined;
  userEntityLetterTexts$: Observable<any> | undefined;

  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private notification: NotificationService
  ) {
    this.activeUserEntityId$.subscribe((userEntityId) => {
      this.userEntityInfoQuery = this.userEntityInfo(userEntityId);
      this.userEntityQuery = this.userEntity(userEntityId);

      this.userEntityInfoQuery.valueChanges
        .pipe(EntityWithActions.mapEntityInfo)
        .subscribe((info) => this.userEntityInfo$.next(info));

      this.userEntityQuery.valueChanges
        .pipe(EntityWithActions.mapUserEntity)
        .subscribe((entity) => {
          this.userEntity$.next(entity);
          this._userEntity = entity;
        });
    });

    if (!EntityService.instance) {
      EntityService.instance = this;
    }
  }

  logout() {
    this.userEntity$.next(null);
  }

  userEntityInfo(entity_id: number) {
    return this.apollo.watchQuery({
      query: EntityQueries.INFO,
      variables: { entity_id: entity_id },
      fetchPolicy: 'cache-and-network',
    });
  }

  userEntity(entity_id: number) {
    return this.apollo.watchQuery({
      query: EntityQueries.USER_ENTITY,
      variables: { entity_id: entity_id },
      fetchPolicy: 'cache-and-network',
    });
  }

  allEntities() {
    return this.apollo.watchQuery({
      query: EntityQueries.ALL_ENTITIES,
      fetchPolicy: 'cache-and-network',
    });
  }

  // TODO: check where this function is used and refactor to observable
  getEntity(id: number) {
    return this.apollo
      .query({
        query: EntityQueries.ENTITY,
        variables: {
          id: id,
        },
      })
      .pipe(
        EntityWithActions.mapEntities,
        map((entities) => entities[0])
      );
  }

  getEntityWithUsers(id: number) {
    return this.apollo
      .query({
        query: EntityQueries.WITH_USERS,
        variables: {
          id: id,
        },
      })
      .pipe(EntityWithActions.mapEntities);
  }

  // CREATIONS AND UPDATES

  updateEntity(entity_id: number, set: any = {}, inc: any = {}) {
    return this.apollo.mutate({
      mutation: EntityQueries.UPDATE,
      variables: {
        entity_id: entity_id,
        _set: set,
        _inc: inc,
      },
    });
  }

  desactivateEntity(entity_id: number) {
    const set = { active: false };
    this.updateEntity(entity_id, set).subscribe((data: any) => {
      console.log('desactivated entity', data);
      this.notification.notify('Entité desactivé');
    });
  }

  activateEntity(entity_id: number) {
    const set = { active: true };
    this.updateEntity(entity_id, set).subscribe((data: any) => {
      console.log('activated entity', data);
      this.notification.notify('Entité activé');
    });
  }

  incrementEntitySentCount() {
    const inc = { sent_count: 1 };

    this.updateEntity(this._userEntity!.id, {}, inc).subscribe((data) =>
      console.log('incremented entity sent count', data)
    );

    this._userEntity!.sent_count += 1;
  }

  addNewEntity(variables: any) {
    return this.apollo.mutate({
      mutation: EntityQueries.ADD,
      variables: variables,
    });
  }

  static instance: EntityService;

  static getInstance() {
    if (EntityService.instance) {
      return EntityService.instance;
    }

    return EntityService.instance;
  }
}
