import { Injectable } from '@angular/core';
import { yearsPerRow } from '@angular/material/datepicker';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from '../../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private notification: NotificationService
  ) {
    const entities =
      localStorage.getItem('entities') !== null
        ? JSON.parse(localStorage.getItem('entities') || '[]')
        : null;

    if (entities === null) {
      this.getEntities().subscribe(this.updateEntities.bind(this));
    } else {
      console.log('entities from localstorage');

      this.entities.next(entities);
    }

    this.userService.active_user.subscribe((user: User) => {
      if (user === null || user.id === 0) {
        return;
      }

      const active_entity =
        localStorage.getItem('active_entity') !== null
          ? JSON.parse(localStorage.getItem('active_entity') || '[]')
          : null;

      console.log(active_entity);

      if (active_entity === null) {
        this.getUserEntity(user.entity.id);
      } else {
        console.log('active_entity from localstorage');
        this.active_entity.next(active_entity);
      }
    });
  }

  getUserEntity(entity_id: number) {
    const get_relative_entities = gql`
      ${Entity.core_entity_fields}
      query getUserEntity($entity_id: Int!) {
        entity(where: { id: { _eq: $entity_id } }) {
          ...CoreEntityFields
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
      .query({
        query: get_relative_entities,
        variables: { entity_id: entity_id },
      })
      .subscribe((data: any) => {
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

        this.active_entity.next(entity);
        localStorage.setItem('active_entity', JSON.stringify(entity));
      });
  }

  updateEntitiesFromLocalStorage() {}

  updateEntities(entities: Entity[]) {
    this.entities.next(entities);
    localStorage.setItem('entities', JSON.stringify(entities));
  }

  // store in localstorage
  entities: BehaviorSubject<Entity[]> = new BehaviorSubject<Entity[]>([]);

  // store in localstorage remove on logout
  relative_entities: BehaviorSubject<Entity[]> = new BehaviorSubject<Entity[]>(
    []
  );

  // store in cookie
  active_entity: BehaviorSubject<Entity> = new BehaviorSubject(new Entity());

  getEntities() {
    const GET_ENTITIES_QUERY = gql`
      ${Entity.core_entity_fields}
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
      .pipe(
        map((val: any) => {
          return val.data.entity.map((val: any) => {
            return new Entity(val);
          });
        })
      );
  }

  getEntity(id: number) {
    const GET_ENTITY_QUERY = gql`
      ${Entity.core_entity_fields}
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
      .pipe(
        map((val: any) => {
          return val.data.entity.map((val: any) => {
            return new Entity(val);
          });
        })
      );
  }

  getEntityWithUsers(id: number) {
    const GET_ENTITY_QUERY_WITH_USERS = gql`
      ${Entity.core_entity_fields}
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
      .pipe(
        map((val: any) => {
          return val.data.entity.map((val: any) => {
            console.log(val);

            return new Entity(val);
          });
        })
      );
  }

  updateEntityInfo(entity: any) {
    const UDPATE_ENTITY_INFO = gql`
      mutation UDPATE_ENTITY_INFO(
        $id: Int!
        $short: String!
        $long: String!
        $short_header: String!
        $level: Int!
      ) {
        update_entity(
          where: { id: { _eq: $id } }
          _set: {
            short: $short
            long: $long
            level: $level
            short_header: $short_header
          }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: UDPATE_ENTITY_INFO,
        variables: entity,
      })
      .subscribe((data) => {
        this.notification.open('Mis à Jour Enregistré');
      });
  }

  updateEntityLabels(entity: Entity) {
    const UPDATE_ENTITY_LABELS_MUTATION = gql`
      mutation update_entity_labels($id: Int!, $labels: String!) {
        update_entity(where: { id: { _eq: $id } }, _set: { labels: $labels }) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: UPDATE_ENTITY_LABELS_MUTATION,
        variables: entity,
      })
      .subscribe((data) => console.log(data));
  }

  desactivateEntity(entity_id: number) {
    const DESACTIVATE_ENTITY_MUTATION = gql`
      mutation desactivate_entity($entity_id: Int!) {
        update_entity(
          where: { id: { _eq: $entity_id } }
          _set: { active: false }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;
    this.apollo
      .mutate({
        mutation: DESACTIVATE_ENTITY_MUTATION,
        variables: { entity_id: entity_id },
      })
      .subscribe((data) => this.notification.open('Entité desactivé'));
  }

  activateEntity(entity_id: number) {
    const ACTIVATE_ENTITY_MUTATION = gql`
      mutation activate_entity($entity_id: Int!) {
        update_entity(
          where: { id: { _eq: $entity_id } }
          _set: { active: true }
        ) {
          affected_rows
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: ACTIVATE_ENTITY_MUTATION,
        variables: { entity_id: entity_id },
      })
      .subscribe((data) => console.log(data));
  }

  incrementEntitySentCount() {
    const INC_SENT_COUNT = gql`
      mutation increment_sent_count($entity_id: Int!) {
        update_entity(
          where: { id: { _eq: $entity_id } }
          _inc: { sent_count: 1 }
        ) {
          returning {
            id
            short
            sent_count
          }
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: INC_SENT_COUNT,
        variables: {
          entity_id: this.active_entity.value.id,
        },
      })
      .pipe()
      .subscribe((data) => console.log(data));

    const activeEntity = this.active_entity.value;
    activeEntity.sent_count += 1;
    this.active_entity.next(activeEntity);
  }

  relativeEntityPipe = (entity: Entity[]) => {
    console.log(entity);
  };

  addNewEntity(variables: any) {
    const add_new_entity_mutation = gql`
      ${Entity.core_entity_fields}
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
      mutation: add_new_entity_mutation,
      variables: variables,
    });
  }
}
