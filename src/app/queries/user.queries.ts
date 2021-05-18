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
    ${User.user_item_fields}
    query get_users {
      user(where: { verified: { _eq: false } }) {
        ...CoreUserFields
      }
    }
  `,

  INACTIVE: gql`
    ${User.user_item_fields}
    query get_users {
      user(where: { active: { _eq: false } }) {
        ...CoreUserFields
      }
    }
  `,

  USERS: gql`
    ${User.user_item_fields}
    query get_users {
      user {
        ...CoreUserFields
      }
    }
  `,
};

export default UserQueries;
