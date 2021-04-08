import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private apollo: Apollo) {}

  get_entity_query = gql`
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

  get_entities_query = gql`
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
      query: this.get_entities_query,
    });
  }

  getEntity(id:number) {
    return this.apollo.query({
      query: this.get_entity_query,
      variables: {
        id: id
      }
    });
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

  addNewEntity(variables:any){
    return this.apollo
    .mutate({
      mutation: this.add_new_entity_mutation,
      variables: variables,
    })
  }
}
