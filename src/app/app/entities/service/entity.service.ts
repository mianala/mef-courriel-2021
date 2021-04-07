import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor() {}

  static get_entity_query = gql`
    query get_entity($if) {
      entity(where: { id: { _eq: $id }) {
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
        sub_entities_count
      }
    }
  `;

  static get_entities_query = gql`
    query get_entities {
      entity {
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
        sub_entities_count
      }
    }
  `;

  getEntity() {}
}
