import gql from 'graphql-tag';
import { Entity } from '../classes/entity';
import { User } from '../classes/user';

const EntityQueries = {
  ADD: gql`
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
  `,

  UPDATE: gql`
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
  `,

  ENTITY: gql`
    ${Entity.CORE_ENTITY_FIELDS}
    query get_entity($id: Int!) {
      entity(where: { id: { _eq: $id } }) {
        ...CoreEntityFields
      }
    }
  `,

  ALL_ENTITIES: gql`
    ${Entity.CORE_ENTITY_FIELDS}
    query get_entities {
      entity(order_by: { id: asc }) {
        ...CoreEntityFields
      }
    }
  `,

  INFO: gql`
    query get_entity($entity_id: Int!) {
      entity(where: { id: { _eq: $entity_id } }) {
        labels
        observations
        letter_texts
        type_texts
      }
    }
  `,

  USER_ENTITY: gql`
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
  `,

  WITH_USERS: gql`
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
  `,
};

export default EntityQueries;
