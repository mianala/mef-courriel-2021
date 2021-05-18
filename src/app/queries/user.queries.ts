import gql from 'graphql-tag';
import { Entity } from '../classes/entity';
import { User } from '../classes/user';

const UserQueries = {
  SAVE_NEW: gql`
    mutation new_user(
      $im: Int!
      $lastname: String!
      $phone: String!
      $title: String!
      $username: String!
      $hashed: String!
      $email: String!
      $firstname: String!
      $entity_id: Int!
    ) {
      insert_user(
        objects: {
          im: $im
          lastname: $lastname
          phone: $phone
          title: $title
          username: $username
          hashed: $hashed
          email: $email
          firstname: $firstname
          entity_id: $entity_id
        }
      ) {
        returning {
          id
        }
      }
    }
  `,

  UPDATE: gql`
    mutation update_user_mutation(
      $user_id: Int!
      $_set: user_set_input = {}
      $_inc: user_inc_input = {}
    ) {
      update_user(where: { id: { _eq: $user_id } }, _set: $_set, _inc: $_inc) {
        affected_rows
        returning {
          id
        }
      }
    }
  `,

  UNVERIFIED: gql`
    ${User.core_user_fields}
    ${Entity.CORE_ENTITY_FIELDS}
    query get_users {
      user {
        ...CoreUserFields
        verified
        action_counter
        entity {
          ...CoreEntityFields
        }
      }
    }
  `,

  USERS: gql`
    ${User.core_user_fields}
    ${Entity.CORE_ENTITY_FIELDS}
    query get_users {
      user {
        ...CoreUserFields
        verified
        action_counter
        entity {
          ...CoreEntityFields
        }
      }
    }
  `,
};

export default UserQueries;
