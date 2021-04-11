import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject, Subject } from 'rxjs';
import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';
import { UserService } from '../../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private apollo: Apollo, private userService: UserService) {
    // const ets =
    //   localStorage.getItem('entities') === null
    //     ? this.getEntities().subscribe(this.updateEntities.bind(this))
    //     : JSON.parse(localStorage.getItem('entities') || '[]');

    // this.entities.next(ets);

    this.getEntities().subscribe(this.updateEntities.bind(this));

    this.userService.active_user.subscribe((user:User) => {
    this.getActiveUserEntity(user.entity)
    });
  }

  updateEntitiesFromLocalStorage() {}

  updateEntities(data: any) {
    this.entities.next(data.data.entity);
    localStorage.setItem('entities', JSON.stringify(data.data.entity));
  }

  // store in localstorage
  entities: BehaviorSubject<Entity[]> = new BehaviorSubject<Entity[]>([]);

  // store in cookie
  active_entity: BehaviorSubject<Entity> = new BehaviorSubject(new Entity());

  GET_ENTITY_QUERY = gql`
    query get_entity($id: Int!) {
      entity(where: { id: { _eq: $id } }) {
        id
        id_text
        long
        short
        numero
        sent_count
        received_count
        active
        short_header
        long_header
        labels
        level
        parent_entity_id
        sub_entities_count
      }
    }
  `;

  GET_ENTITIES_QUERY = gql`
    query get_entities {
      entity(order_by: { id: asc }) {
        id
        id_text
        long
        short
        numero
        sent_count
        received_count
        active
        level
        parent_entity_id
        short_header
        long_header
        labels
        sub_entities_count
      }
    }
  `;

  getEntities() {
    return this.apollo.query({
      query: this.GET_ENTITIES_QUERY,
    });
  }

  getEntity(id: number) {
    return this.apollo.query({
      query: this.GET_ENTITY_QUERY,
      variables: {
        id: id,
      },
    })
  }

  getActiveUserEntity(entity: Entity) {
    this.active_entity.next(entity);
  }

  add_new_entity_mutation = gql`
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
          id
          short
          long
          short_header
          id_text
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

  addNewEntity(variables: any) {
    return this.apollo.mutate({
      mutation: this.add_new_entity_mutation,
      variables: variables,
    });
  }
}
