import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Entity } from 'src/app/classes/entity';

import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from './user.service';

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
  static instance: EntityService;

  static getInstance() {
    if (EntityService.instance) {
      return EntityService.instance;
    }

    return EntityService.instance;
  }

  mapEntities = map((val: any): Entity[] => {
    return val.data.entity.map((val: any) => {
      return new Entity(val);
    });
  });

  mapEntity = map((val: any) => {
    val.data.entity;
  });

  mapEntityInfo = map((info: any): IEntityInfo => {
    return {
      labels: info?.labels ? info?.labels.split(',') : null,
      letter_texts: info?.letter_texts ? info?.letter_texts.split(',') : null,
      type_texts: info?.type_texts ? info?.type_texts.split(',') : null,
      observations: info?.observations ? info?.observations.split(',') : null,
    };
  });

  mapEntityLabelsInfo = map((info: IEntityInfo | null) =>
    info ? info.labels : null
  );

  mapUserEntity = map((val: any): Entity => {
    const entity_query_result = val.data.entity[0];

    let entity = new Entity(entity_query_result);

    if (!entity.parent === null) {
      entity.parent = new Entity(entity_query_result.parent);
      entity.parent.children = entity_query_result.parent.children.map(
        (entity: any) => new Entity(entity)
      );
    }

    entity.children = entity_query_result.children.map((child: any) => {
      let newChild = new Entity(child);
      let c = child.children.map((grandchild: any) => new Entity(grandchild));
      newChild.children = c.filter((e: any) => {
        return e.level < entity.level + 3;
      });

      return newChild;
    });

    return entity;
  });

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

  allEntities$ = this.allEntitiesQuery.valueChanges.pipe(this.mapEntities);
  activeEntities$ = this.allEntities$.pipe(
    map((entities) => entities.filter((entity) => entity.active))
  );
  inactiveEntities$ = this.allEntities$.pipe(
    map((entities) => entities.filter((entity) => !entity.active))
  );

  activeUserEntityId$ = this.userService.activeUserEntityId$;

  userEntity$ = new BehaviorSubject<Entity | null>(null);
  userEntityInfo$ = new BehaviorSubject<IEntityInfo | null>(null);

  userEntityLabels$ = this.userEntityInfo$.pipe(this.mapEntityLabelsInfo);
  userEntityObservations$: Observable<any> | undefined;
  userEntityTypeTexts$: Observable<any> | undefined;
  userEntityLetterTexts$: Observable<any> | undefined;

  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private notification: NotificationService
  ) {
    if (!EntityService.instance) {
      EntityService.instance = this;
    }

    this.activeUserEntityId$.subscribe((userEntityId) => {
      this.userEntityInfoQuery = this.userEntityInfo(userEntityId);
      this.userEntityQuery = this.userEntity(userEntityId);

      this.userEntityInfoQuery.valueChanges
        .pipe(this.mapEntityInfo)
        .subscribe((info) => this.userEntityInfo$.next(info));

      this.userEntityQuery.valueChanges
        .pipe(this.mapUserEntity)
        .subscribe((entity) => {
          this.userEntity$.next(entity);
          this._userEntity = entity;
        });
    });
  }

  logout() {
    this.userEntity$.next(null);
  }

  userEntityInfo(entity_id: number) {
    const GET_ENTITY_LABEL_QUERY = gql`
      query get_entity($entity_id: Int!) {
        entity(where: { id: { _eq: $entity_id } }) {
          labels
          observations
          letter_texts
          type_texts
        }
      }
    `;
    return this.apollo.watchQuery({
      query: GET_ENTITY_LABEL_QUERY,
      variables: { entity_id: entity_id },
      fetchPolicy: 'cache-and-network',
    });
  }

  userEntity(entity_id: number) {
    const GET_USER_ENTITY_QUERY = gql`
      ${Entity.CORE_ENTITY_FIELDS}

      query getUserEntity($entity_id: Int!) {
        entity(where: { id: { _eq: $entity_id } }) {
          ...CoreEntityFields
          labels
          observations
          letter_texts
          parent {
            ...CoreEntityFields
            children {
              ...CoreEntityFields
            }
          }
          children {
            ...CoreEntityFields
            children {
              ...CoreEntityFields
            }
          }
        }
      }
    `;

    return this.apollo.watchQuery({
      query: GET_USER_ENTITY_QUERY,
      variables: { entity_id: entity_id },
      fetchPolicy: 'cache-and-network',
    });
  }

  allEntities() {
    const GET_ENTITIES_QUERY = gql`
      ${Entity.CORE_ENTITY_FIELDS}
      query get_entities {
        entity(order_by: { id: asc }) {
          ...CoreEntityFields
        }
      }
    `;

    return this.apollo.watchQuery({
      query: GET_ENTITIES_QUERY,
      fetchPolicy: 'cache-and-network',
    });
  }

  getEntity(id: number) {
    const GET_ENTITY_QUERY = gql`
      ${Entity.CORE_ENTITY_FIELDS}
      query get_entity($id: Int!) {
        entity(where: { id: { _eq: $id } }) {
          ...CoreEntityFields
        }
      }
    `;
    return this.apollo
      .query({
        query: GET_ENTITY_QUERY,
        variables: {
          id: id,
        },
      })
      .pipe(this.mapEntities);
  }

  getEntityWithUsers(id: number) {
    const GET_ENTITY_QUERY_WITH_USERS = gql`
      ${Entity.CORE_ENTITY_FIELDS}
      query get_entity($id: Int!) {
        entity(where: { id: { _eq: $id } }) {
          ...CoreEntityFields
          users {
            id
            firstname
            lastname
            title
            im
            entity {
              ...CoreEntityFields
            }
          }
        }
      }
    `;
    return this.apollo
      .query({
        query: GET_ENTITY_QUERY_WITH_USERS,
        variables: {
          id: id,
        },
      })
      .pipe(this.mapEntities);
  }

  // CREATIONS AND UPDATES

  updateEntity(entity_id: number, set: any = {}, inc: any = {}) {
    const UPDATE_ENTITY_MUTATION = gql`
      mutation update_entity_mutation(
        $entity_id: Int!
        $_set: entity_set_input = {}
        $_inc: entity_inc_input = {}
      ) {
        update_entity(
          where: { id: { _eq: $entity_id } }
          _set: $_set
          _inc: $_inc
        ) {
          affected_rows
          returning {
            id
            labels
          }
        }
      }
    `;

    return this.apollo.mutate({
      mutation: UPDATE_ENTITY_MUTATION,
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
    const ADD_NEW_ENTITY_MUTATION = gql`
      ${Entity.CORE_ENTITY_FIELDS}
      mutation add_new_entity(
        $short: String!
        $long: String!
        $short_header: String!
        $id_text: String!
        $level: Int!
        $parent_entity_id: Int!
      ) {
        insert_entity(
          objects: {
            level: $level
            short: $short
            long: $long
            short_header: $short_header
            id_text: $id_text
            parent_entity_id: $parent_entity_id
          }
        ) {
          returning {
            ...CoreEntityFields
          }
        }

        update_entity(
          where: { id: { _eq: $parent_entity_id } }
          _inc: { sub_entities_count: 1 }
        ) {
          returning {
            id
            short
            sub_entities_count
          }
        }
      }
    `;
    return this.apollo.mutate({
      mutation: ADD_NEW_ENTITY_MUTATION,
      variables: variables,
    });
  }
}
