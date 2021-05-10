import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { BehaviorSubject } from 'rxjs';
import {
  catchError,
  map,
  scan,
  skip,
  skipWhile,
  switchMap,
} from 'rxjs/operators';

import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';

import { NotificationService } from 'src/app/services/notification.service';
import Observable from 'zen-observable';
import { UserService } from '../../../services/user.service';

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
  // store in localstorage
  entities$: BehaviorSubject<Entity[]> = new BehaviorSubject<Entity[]>([]);

  // store in localstorage remove on logout
  relativeEntities$: BehaviorSubject<Entity[]> = new BehaviorSubject<Entity[]>(
    []
  );

  // store in cookie
  activeEntity$: BehaviorSubject<Entity | null> = new BehaviorSubject<Entity | null>(
    null
  );

  activeEntityInfo$ = this.activeEntity$.pipe(
    switchMap((entity: Entity | null) => {
      return this.getUserEntityInfo(entity ? entity.id : null).pipe(
        map(
          (info: Entity): IEntityInfo => {
            return {
              labels: info?.labels ? info?.labels.split(',') : null,
              letter_texts: info?.letter_texts
                ? info?.letter_texts.split(',')
                : null,
              type_texts: info?.type_texts ? info?.type_texts.split(',') : null,
              observations: info?.observations
                ? info?.observations.split(',')
                : null,
            };
          }
        )
      );
    }),
    catchError(async () => null)
  );

  // why not just combinelatest with user.entity.id?
  activeEntityLabels$ = this.activeEntityInfo$.pipe(
    map((info: IEntityInfo | null) => info?.labels)
  );

  activeEntityObservations$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  activeEntityTypeTexts$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  activeEntityLetterTexts$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private notification: NotificationService
  ) {
    this.activeEntity$.subscribe((entity) => {
      console.log('active entity', entity);
    });

    this.userService.loggedOut$.subscribe((loggedOut) => {
      if (loggedOut) {
        this.logout();
      }
    });

    const entities =
      localStorage.getItem('entities') !== null
        ? JSON.parse(localStorage.getItem('entities') || '[]')
        : null;

    if (entities === null) {
      this.getEntities().subscribe(this.updateEntities.bind(this));
    } else {
      console.log('entities from localstorage');

      this.entities$.next(entities);
    }

    this.userService.activeUser$.subscribe((user: User | null) => {
      if (!user) {
        return;
      }

      const activeEntity =
        localStorage.getItem('active_entity') !== null
          ? JSON.parse(localStorage.getItem('active_entity') || '[]')
          : null;

      if (activeEntity === null) {
        this.getUserEntity(user.entity.id);
      } else {
        console.log('active_entity from localstorage');
        this.activeEntity$.next(new Entity(activeEntity));
      }
    });
  }

  logout() {
    this.activeEntity$.next(new Entity());
    localStorage.removeItem('active_entity');
  }

  getUserEntityInfo(entity_id: number | null) {
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
    return this.apollo
      .watchQuery({
        query: GET_ENTITY_LABEL_QUERY,
        variables: { entity_id: entity_id },
        fetchPolicy: 'cache-and-network',
      })
      .valueChanges.pipe(map((data: any) => data.data.entity[0]));
  }

  getUserEntity(entity_id: number) {
    if (entity_id == 0) {
      return;
    }
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

    this.apollo
      .watchQuery({
        query: GET_USER_ENTITY_QUERY,
        variables: { entity_id: entity_id },
        fetchPolicy: 'cache-and-network',
      })
      .valueChanges.subscribe((data: any) => {
        let entity_query_result = data.data.entity[0];

        let entity = new Entity(entity_query_result);
        if (!entity.parent === null) {
          entity.parent = new Entity(entity_query_result.parent);
          entity.parent.children = entity_query_result.parent.children.map(
            (entity: any) => new Entity(entity)
          );
        }

        entity.children = entity_query_result.children.map((child: any) => {
          let newChild = new Entity(child);
          let c = child.children.map(
            (grandchild: any) => new Entity(grandchild)
          );
          newChild.children = c.filter((e: any) => {
            return e.level < entity.level + 3;
          });

          return newChild;
        });

        this.activeEntity$.next(entity);
        localStorage.setItem('active_entity', JSON.stringify(entity));
      });
  }

  updateEntitiesFromLocalStorage() {}

  updateEntities(entities: Entity[]) {
    this.entities$.next(entities);
    localStorage.setItem('entities', JSON.stringify(entities));
  }

  getEntities() {
    const GET_ENTITIES_QUERY = gql`
      ${Entity.CORE_ENTITY_FIELDS}
      query get_entities {
        entity(order_by: { id: asc }) {
          ...CoreEntityFields
        }
      }
    `;

    return this.apollo
      .query({
        query: GET_ENTITIES_QUERY,
      })
      .pipe(this.mapEntity);
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
      .pipe(this.mapEntity);
  }

  mapEntity = map((val: any) => {
    return val.data.entity.map((val: any) => {
      return new Entity(val);
    });
  });

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
      .pipe(this.mapEntity);
  }

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

    console.log(set);

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
      this.notification.open('Entité desactivé');
    });
  }

  activateEntity(entity_id: number) {
    const set = { active: true };
    this.updateEntity(entity_id, set).subscribe((data: any) => {
      console.log('activated entity', data);
      this.notification.open('Entité activé');
    });
  }

  incrementEntitySentCount() {
    const inc = { sent_count: 1 };
    const activeEntity = this.activeEntity$.value;

    this.updateEntity(activeEntity.id, {}, inc).subscribe((data) =>
      console.log(data)
    );

    activeEntity.sent_count += 1;
    this.activeEntity$.next(activeEntity);
  }

  relativeEntityPipe = (entity: Entity[]) => {
    console.log(entity);
  };

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
