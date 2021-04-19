import { Injectable } from '@angular/core';
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
  constructor(private apollo: Apollo, private userService: UserService, private notification: NotificationService) {
    // const ets =
    //   localStorage.getItem('entities') === null
    //     ? this.getEntities().subscribe(this.updateEntities.bind(this))
    //     : JSON.parse(localStorage.getItem('entities') || '[]');

    // this.entities.next(ets);

    this.getEntities().subscribe(this.updateEntities.bind(this));

    this.userService.active_user.subscribe((user: User) => {
      this.active_entity.next(user.entity)
    });
  }

  updateEntitiesFromLocalStorage() { }

  updateEntities(entities: Entity[]) {
    this.entities.next(entities);
    localStorage.setItem('entities', JSON.stringify(entities));
  }

  // store in localstorage
  entities: BehaviorSubject<Entity[]> = new BehaviorSubject<Entity[]>([]);

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
    `

    return this.apollo.query({
      query: GET_ENTITIES_QUERY,
    }).pipe(
      map((val: any) => {
        return val.data.entity.map((val: any) => {
          return new Entity(val);
        });
      })
    )
  }

  getEntity(id: number) {
    const GET_ENTITY_QUERY = gql`
      query get_entity($id: Int!) {
        entity(where: { id: { _eq: $id } }) {
          ...CoreEntityFields
        }
      }
    `
    return this.apollo.query({
      query: GET_ENTITY_QUERY,
      variables: {
        id: id,
      },
    }).pipe(
      map((val: any) => {
        return val.data.entity.map((val: any) => {
          return new Entity(val);
        });
      })
    )
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
          }
        }
      }
    `
    return this.apollo.query({
      query: GET_ENTITY_QUERY_WITH_USERS,
      variables: {
        id: id,
      },
    }).pipe(
      map((val: any) => {
        return val.data.entity.map((val: any) => {
          return new Entity(val);
        });
      })
    )
  }

  updateEntityInfo(entity: any) {
    const UDPATE_ENTITY_INFO = gql`
      mutation UDPATE_ENTITY_INFO($id: Int!, $short: String!,$long: String!, $short_header: String!, $level: Int!) {
        update_entity(where: {id: {_eq: $id}}, _set: {
            short: $short
            long: $long
            level: $level
            short_header: $short_header
          }) {
          affected_rows
          returning{
            id
          }
        }
      }
    `

    this.apollo.mutate({
      mutation: UDPATE_ENTITY_INFO,
      variables: entity
    }).subscribe(data => {
      this.notification.open("Mis à Jour Enregistré")
    })
  }

  updateEntityLabels(entity: Entity) {

    const UPDATE_ENTITY_LABELS_MUTATION = gql`
      mutation update_entity_labels($id: Int!, $labels: String!) {
        update_entity(where: {id: {_eq: $id}}, _set: {labels: $labels}) {
          affected_rows
          returning{
            id
          }
        }
      }
    `

    this.apollo.mutate({
      mutation: UPDATE_ENTITY_LABELS_MUTATION,
      variables: entity
    }).subscribe(data => console.log(data))
  }

  desactivateEntity(entity_id: number) {
    const DESACTIVATE_ENTITY_MUTATION = gql`
      mutation desactivate_entity($entity_id: Int!) {
        update_entity(where: {id: {_eq: $entity_id}}, _set: {active: false}) {
          affected_rows
          returning{
            id
          }
        }
      }
    `
    this.apollo.mutate({
      mutation: DESACTIVATE_ENTITY_MUTATION,
      variables: { entity_id: entity_id }
    }).subscribe(data => this.notification.open("Entité desactivé"))
  }


  activateEntity(entity_id: number) {
    const ACTIVATE_ENTITY_MUTATION = gql`
      mutation activate_entity($entity_id: Int!) {
        update_entity(where: {id: {_eq: $entity_id}}, _set: {active: true}) {
          affected_rows
        }
      }
    `

    this.apollo.mutate({
      mutation: ACTIVATE_ENTITY_MUTATION,
      variables: { entity_id: entity_id }
    }).subscribe(data => console.log(data))
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
    `

    this.apollo.mutate({
      mutation: INC_SENT_COUNT,
      variables: {
        entity_id: this.active_entity.value.id
      }
    }).subscribe(data => console.log(data))

    const activeEntity = this.active_entity.value
    activeEntity.sent_count += 1

    this.active_entity.next(activeEntity)
  }

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
